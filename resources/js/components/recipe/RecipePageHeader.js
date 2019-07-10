import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setEditMode } from '../../actions/filters';

export class RecipePageHeader extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: this.props.title
        };
    };

    toggleEditMode = () => {
        const editMode = this.props.filters.editMode ? false : true;
        this.props.setEditMode(editMode);
        if (editMode) {
            this.startSave();
        }
    }
    
    setTitle = (e) => {
        const title = e.target.value;
        this.setState(() => ({ title }));
    }


    startSave = () => {
        console.log(this.state);
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
                                name="title"
                                className="page-header__title--input"
                                onChange={ this.setTitle }
                                value={ this.state.title } />
                        ) :
                        (
                            <h1 className="page-header__title">{ this.props.title }</h1>
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
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setEditMode: (editMode) => dispatch(setEditMode(editMode))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipePageHeader);
