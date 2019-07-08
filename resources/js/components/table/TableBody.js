import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteRecipe } from '../../actions/recipes';

export class TableBody extends React.Component {
    startDeleteRecipe = (e) => {
		const id = e.currentTarget.parentNode.id.replace(/\D/g, '');
		this.props.deleteRecipe(id);
    }
    
	render() {
		return (
            <section className="table__body">
            {
                this.props.data.map((item, index) => {
                    return (
                        <div
                            key={item.id}
                            className={this.props.className}>
                        {
                            this.props.headers.map((header, index) => {
                                if (header.label == 'More') {
                                    return (
                                        <div key={index} className="table__more-options">
                                            <i className="material-icons table__more-icon">{header.data}</i>
                                            <div
                                                id={"options_" + item.id}
                                                className="table__options-modal">
                                                {this.props.options.map((option) => {
                                                    if (typeof option.route != 'undefined') {
                                                        return (
                                                            <Link
                                                                key={"option_" + option.label + "_" + item.id}
                                                                to={option.route + item.id + option.action}
                                                                className="table__more-option">
                                                                <i className="material-icons table__more-option-icon">{option.icon}</i>
                                                                {option.label}
                                                            </Link>
                                                        )
                                                    }
                                                    else {
                                                        switch(option.onClick) {
                                                            case 'deleteRecipe':
                                                                return (
                                                                    <div
                                                                        key={"option_" + option.label + "_" + item.id}
                                                                        onClick={this.startDeleteRecipe}
                                                                        className="table__more-option">
                                                                        <i className="material-icons table__more-option-icon">{option.icon}</i>
                                                                        {option.label}
                                                                    </div>
                                                                )
                                                        }
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        );
                                    }
                                else {
                                    if (this.props.headers[index].type == 'link') {
                                        return (
                                            <Link
                                                to={this.props.headers[index].route + item.id}
                                                key={index}
                                                className={this.props.headers[index].class}>
                                                {item[header.column]}
                                            </Link>
                                        );
                                    }
                                    else if (this.props.headers[index].type == 'date') {
                                        return (
                                            <p
                                                key={index}
                                                className={this.props.headers[index].class}>
                                                {item[header.column].replace(/\s?\d{2}:\d{2}:\d{2}/, '')}
                                            </p>
                                        );
                                    }
                                    else {
                                        return (
                                            <p
                                                key={index}
                                                className={this.props.headers[index].class}>
                                                {item[header.column]}
                                            </p>
                                        );
                                    }
                                }
                            })
                        }
                        </div>
                    );
                })
            }
            </section>
        )
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	deleteRecipe: (id) => dispatch(deleteRecipe(id))
});
  
export default connect(undefined, mapDispatchToProps)(TableBody);