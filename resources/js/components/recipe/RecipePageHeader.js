import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setEditMode } from '../../actions/filters';
import { updateRecipeName } from '../../actions/recipes';

export class RecipePageHeader extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: this.props.name
        };
    };

    componentDidUpdate() {
		if (!this.props.filters.editMode) {
			this.startSave();
		}
	}

    toggleEditMode = () => {
        const editMode = this.props.filters.editMode ? false : true;
        this.props.setEditMode(editMode);
    }
    
    setName = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    }


    startSave = () => {
        const name = this.state.name;

		if (name != this.props.name) {
			document.querySelector(".page-header__title").innerHTML = name;
			this.props.updateRecipeName(name);
		}
    }

	render() {
		return (
            <section className="page-header">
                <section className="page-header__info">
                    {
                        this.props.filters.editMode ? 
                        (
                            <input
                                type="text"
                                name="name"
                                className="page-header__title--input"
                                onChange={ this.setName }
                                value={ this.state.name } />
                        ) :
                        (
                            <h1 className="page-header__title">{ this.props.name }</h1>
                        )
                    }				
                </section>
                {
                    this.props.options ?
                    (
                        <section className="page-header__options">
                            {
                                this.props.options.buttons ?
                                (
                                    this.props.options.buttons.map((button, index) => {
                                        if (button.onClick) {
                                            switch(button.onClick) {
                                                case 'edit':
                                                    return (
                                                        <button
                                                                key={"button_" + index}
                                                                className={ button.className }
                                                                onClick={ this.toggleEditMode }>
                                                            <i className="material-icons btn__icon">{ button.icon }</i>
                                                            { this.props.filters.editMode ? button.label.edit : button.label.view }
                                                        </button>
                                                    )
                                            }
                                        }
                                        else {
                                            return (
                                                <Link key={"button_" + index} to={ button.link }>
                                                    <button className={ button.className }>
                                                        <i className="material-icons btn__icon">{ button.icon }</i>
                                                        { button.label }
                                                    </button>
                                                </Link>
                                            )
                                        }
                                    })
                                ) : ''
                            }
                        </section>
                    ) : ''
                }
            </section>
		);
	};
};
  
const mapStateToProps = (state) => ({
    name: state.filters.currentRecipe.info.name,
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setEditMode: (editMode) => dispatch(setEditMode(editMode)),
    updateRecipeName: (name) => dispatch(updateRecipeName(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipePageHeader);
