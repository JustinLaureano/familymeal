import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../routers/AppRouter';
import { Link } from 'react-router-dom';
import { deleteRecipe, favoriteRecipe } from '../../actions/recipes';

export class TableBody extends React.Component {
    startDeleteRecipe = (e) => {
		const id = e.currentTarget.parentNode.id.replace(/\D/g, '');
		this.props.deleteRecipe(id);
    }

    startFavoriteRecipe = (e) => {
        const id = e.currentTarget.parentNode.id.replace(/\D/g, '');

        if (this.props.model == 'favorite-recipes') {
            this.props.favoriteRecipe(id, 'true');
            this.props.refreshFavorites();
        }
        else {
            const recipe = this.props.data.filter(item => item.id == id)[0];
            const favoriteStatus = recipe.favorite;
            this.props.favoriteRecipe(id, favoriteStatus);
        }
    }

    updateRecipe = (e) => {
        const id = e.currentTarget.parentNode.id.replace(/\D/g, '');

        history.push({
            pathname: '/recipes/' + id,
            state: { id: id, editMode: true }
        });
    }
    
	render() {
		return (
            <section className="table__body">
            {
                this.props.data.map((item, index) => {
                    return (
                        <div
                            key={item.id}
                            className={ this.props.className }>
                        {
                            this.props.headers.map((header, index) => {
                                if (header.label == 'More') {
                                    return (
                                        <div key={index} className="table__more-options">
                                            <i className="material-icons table__more-icon">{ header.data }</i>
                                            <div
                                                id={ "options_" + item.id }
                                                className="table__options-modal">

                                                { this.props.options.map((option) => {
                                                    if (typeof option.route != 'undefined') {
                                                        return (
                                                            <Link
                                                                key={ "option_" + option.label + "_" + item.id }
                                                                to={{
                                                                    pathname: option.route + item.id,
                                                                    state: {
                                                                      id: item.id
                                                                    }
                                                                }}
                                                                className="table__more-option">
                                                                <i className="material-icons table__more-option-icon">{ option.icon }</i>
                                                                { option.label }
                                                            </Link>
                                                        )
                                                    }
                                                    else {
                                                        switch(option.onClick) {
                                                            case 'favoriteRecipe':
                                                                return (
                                                                    <div
                                                                        key={"option_" + option.label + "_" + item.id}
                                                                        onClick={ this.startFavoriteRecipe }
                                                                        className="table__more-option">
                                                                        <i className="material-icons table__more-option-icon ">
                                                                            { option.icon }
                                                                        </i>
                                                                        { 
                                                                            this.props.model == 'favorite-recipes' ||
                                                                            item.favorite == 'true' ? 
                                                                                'Remove Favorite' : 'Make Favorite'
                                                                        }
                                                                    </div>
                                                                )
                                                            case 'updateRecipe':
                                                                return (
                                                                    <div
                                                                        key={"option_" + option.label + "_" + item.id}
                                                                        onClick={ this.updateRecipe }
                                                                        className="table__more-option">
                                                                        <i className="material-icons table__more-option-icon">{ option.icon }</i>
                                                                        { option.label }
                                                                    </div>
                                                                )
                                                            case 'deleteRecipe':
                                                                return (
                                                                    <div
                                                                        key={"option_" + option.label + "_" + item.id}
                                                                        onClick={ this.startDeleteRecipe }
                                                                        className="table__more-option">
                                                                        <i className="material-icons table__more-option-icon">{ option.icon }</i>
                                                                        { option.label }
                                                                    </div>
                                                                )
                                                        }
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        )
                                    }
                                else {
                                    if (this.props.headers[index].type == 'link') {
                                        return (
                                            <Link
                                                to={{
                                                    pathname: this.props.headers[index].route + item.id,
                                                    state: {
                                                      id: item.id
                                                    }
                                                }}
                                                key={ index }
                                                className={ this.props.headers[index].class }>
                                                { item[header.column] }
                                                { 
                                                    item.favorite && 
                                                    item.favorite == 'true' && 
                                                    <i className="material-icons table-favorite-icon">favorite</i> 
                                                }
                                            </Link>
                                        );
                                    }
                                    else if (this.props.headers[index].type == 'date') {
                                        return (
                                            <p
                                                key={ index }
                                                className={ this.props.headers[index].class }>
                                                { item[header.column].replace(/\s?\d{2}:\d{2}:\d{2}/, '') }
                                            </p>
                                        );
                                    }
                                    else {
                                        return (
                                            <p
                                                key={ index }
                                                className={ this.props.headers[index].class }>
                                                { item[header.column] }
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
	favoriteRecipe: (id, favorite) => dispatch(favoriteRecipe(id, favorite)),
	deleteRecipe: (id) => dispatch(deleteRecipe(id))
});
  
export default connect(undefined, mapDispatchToProps)(TableBody);