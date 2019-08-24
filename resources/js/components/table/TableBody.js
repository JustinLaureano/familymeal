import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../routers/AppRouter';
import { Link } from 'react-router-dom';
import TableCell from './TableCell';
import TableOption from '../../components/table/TableOption';
import TableCascadeOption from '../../components/table/TableCascadeOption';
import { deleteRecipe, favoriteRecipe } from '../../actions/recipes';
import { addNewShoppingListItem } from '../../actions/shoppingList';
import { deleteIngredient } from '../../actions/ingredients';
import { getShoppingListOptions } from '../../services/Table';

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

    updateShoppingList = (params) => {
        this.props.addNewShoppingListItem({ shopping_list_id: params.option_id, ingredient_id: params.row_id });
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

                                            <div id={ "options_" + item.id } className="table__options-modal">
                                                { this.props.options.map((option) => {
                                                    let onClick = () => true;
                                                    switch(option.onClick) {
                                                        case 'favoriteRecipe':
                                                            onClick = this.startFavoriteRecipe;
                                                            return (
                                                                <div
                                                                    key={"option_" + option.label + "_" + item.id}
                                                                    onClick={ onClick }
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
                                                            onClick = this.updateRecipe;
                                                            break;
                                                        case 'deleteRecipe':
                                                            onClick = this.startDeleteRecipe;
                                                            break;
                                                        case 'updateShoppingList':
                                                            return (
                                                                <TableCascadeOption
                                                                    key={"option_" + option.label + "_" + item.id}
                                                                    id={ item.id }
                                                                    option={ option }
                                                                    onOptionSelect={ this.updateShoppingList }
                                                                    dropdownOptions={ this.props.shopping_lists } />
                                                            )
                                                            break;
                                                        case 'updateIngredient':
                                                            if (item.created_user_id) {
                                                                return (
                                                                    <TableOption
                                                                        key={"option_" + option.label + "_" + item.id}
                                                                        id={ item.id }
                                                                        option={ option }
                                                                        onClick={ this.updateIngredient } />
                                                                )
                                                            }
                                                            else {return '';}
                                                        case 'deleteIngredient':
                                                            if (item.created_user_id) {
                                                                return (
                                                                    <TableOption
                                                                        key={"option_" + option.label + "_" + item.id}
                                                                        id={ item.id }
                                                                        option={ option }
                                                                        onClick={ this.startDeleteIngredient } />
                                                                )
                                                            }
                                                            else {return '';}
                                                    }
                                                    return (
                                                        <TableOption
                                                            key={"option_" + option.label + "_" + item.id}
                                                            id={ item.id }
                                                            option={ option }
                                                            onClick={ onClick } />
                                                    )

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

const mapStateToProps = (state) => ({
	shopping_lists: getShoppingListOptions(state.shopping_lists)
});

const mapDispatchToProps = (dispatch, props) => ({
	favoriteRecipe: (id, favorite) => dispatch(favoriteRecipe(id, favorite)),
	deleteRecipe: (id) => dispatch(deleteRecipe(id)),
	deleteIngredient: (id) => dispatch(deleteIngredient(id)),
	addNewShoppingListItem: (params) => dispatch(addNewShoppingListItem(params))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(TableBody);