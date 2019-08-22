import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../routers/AppRouter';
import { Link } from 'react-router-dom';
import TableCell from './TableCell';
import TableOption from '../../components/table/TableOption';
import { deleteRecipe, favoriteRecipe } from '../../actions/recipes';
import { deleteIngredient } from '../../actions/ingredients';

export class TableBody extends React.Component {
    startDeleteRecipe = (e) => {
		const id = e.currentTarget.parentNode.id.replace(/\D/g, '');
		this.props.deleteRecipe(id);
    }

    startDeleteIngredient = (e) => {
		const id = e.currentTarget.parentNode.id.replace(/\D/g, '');
		this.props.deleteIngredient(id);
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
            state: { id, editMode: true }
        });
    }

    updateIngredient = (e) => {
        const id = e.currentTarget.parentNode.id.replace(/\D/g, '');

        history.push({
            pathname: '/ingredients/' + id,
            state: { id: id, editMode: true }
        });
    }

    updateShoppingList = (e) => {
        const ingredient_id = e.currentTarget.parentNode.id.replace(/\D/g, '');
        console.log(ingredient_id);
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
                                                                <TableOption
                                                                    key={"option_" + option.label + "_" + item.id}
                                                                    id={ item.id }
                                                                    option={ option }
                                                                    onClick={ this.updateRecipe } />
                                                            )
                                                        case 'deleteRecipe':
                                                            return (
                                                                <TableOption
                                                                    key={"option_" + option.label + "_" + item.id}
                                                                    id={ item.id }
                                                                    option={ option }
                                                                    onClick={ this.startDeleteRecipe } />
                                                            )
                                                        case 'updateShoppingList':
                                                            return (
                                                                <TableOption
                                                                    key={"option_" + option.label + "_" + item.id}
                                                                    id={ item.id }
                                                                    option={ option }
                                                                    onClick={ this.updateShoppingList } />
                                                            )
                                                        case 'updateIngredient':
                                                            if (item.created_user_id != null) {
                                                                return (
                                                                    <TableOption
                                                                        key={"option_" + option.label + "_" + item.id}
                                                                        id={ item.id }
                                                                        option={ option }
                                                                        onClick={ this.updateIngredient } />
                                                                )
                                                            }
                                                            break;
                                                        case 'deleteIngredient':
                                                            if (item.created_user_id != null) {
                                                                return (
                                                                    <TableOption
                                                                        key={"option_" + option.label + "_" + item.id}
                                                                        id={ item.id }
                                                                        option={ option }
                                                                        onClick={ this.startDeleteIngredient } />
                                                                )
                                                            }
                                                            break;
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
                                    else {
                                        const data = this.props.headers[index].type == 'date' ?
                                            item[header.column].replace(/\s?\d{2}:\d{2}:\d{2}/, '') :
                                            item[header.column];

                                        return (
                                            <TableCell 
                                                key={ index } 
                                                class={ this.props.headers[index].class }
                                                data={ data } />
                                        )
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
	deleteRecipe: (id) => dispatch(deleteRecipe(id)),
	deleteIngredient: (id) => dispatch(deleteIngredient(id))
});
  
export default connect(undefined, mapDispatchToProps)(TableBody);