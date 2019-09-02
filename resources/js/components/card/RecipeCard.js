import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { history } from '../../routers/AppRouter';
import TableOption from '../../components/table/TableOption';
import { deleteRecipe, favoriteRecipe } from '../../actions/recipes';

export class RecipeCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            footerOptionsOpen: false
        }
    }

    toggleMoreFooterOptions = () => this.setState({ footerOptionsOpen: !this.state.footerOptionsOpen });

    startDeleteRecipe = (e) => this.props.deleteRecipe(this.props.id);

    startFavoriteRecipe = (e) => {
        if (this.props.model == 'favorite-recipes') {
            this.props.favoriteRecipe(this.props.id, 'true');
            this.props.refreshFavorites();
        }
        else {
            this.props.favoriteRecipe(this.props.id, this.props.favorite);
        }
    }

    updateRecipe = (e) => {
        history.push({
            pathname: '/recipes/' + this.props.id,
            state: { id: this.props.id, editMode: true }
        });
    }

	render() {
        const imgSrc = this.props.photo ? 
            '/recipe/photo/' + this.props.photo : 
            '/images/recipe-categories/' + this.props.recipe_category + '.jpg'

        return (
            <section className="card__area">
                <div id={ "recipe_" + this.props.id } className="card">
                    <div className="card__header">
                        <Link
                            to={{
                                pathname: '/recipes/' + this.props.id,
                                state: {
                                    id: this.props.id
                                }
                            }}>
                            <h4>{ this.props.name }</h4>
                        </Link>
                    </div>
                    <div>
                        <img
                            src={ imgSrc } 
                            className="card__photo"
                            alt={ this.props.name } />
                    </div>
                    <div className="card__footer--recipe">
                        <section className="card__footer-details">
                            <p>
                                <span>Category</span> { this.props.recipe_category }
                            </p>
                            <p>
                                <span>Cuisine</span> { this.props.cuisine_type }
                            </p>
                        </section>
                        <section onClick={ this.toggleMoreFooterOptions }>
                            <i className="material-icons card__footer-more-icon">more_vert</i>
                        </section>

                        <section className={ "card__footer-dropdown" + (this.state.footerOptionsOpen ? '--open' : '') }>
                        { this.props.options.map(option => {
                            switch(option.onClick) {
                                case 'favoriteRecipe':
                                    return (
                                        <div
                                            key={"option_" + option.label + "_" + this.props.id}
                                            onClick={ this.startFavoriteRecipe }
                                            className="table__more-option">
                                            <i className="material-icons table__more-option-icon ">
                                                { option.icon }
                                            </i>
                                            { 
                                                this.props.model == 'favorite-recipes' ||
                                                this.props.favorite == 'true' ? 
                                                    'Remove Favorite' : 'Make Favorite'
                                            }
                                        </div>
                                    )
                                case 'updateRecipe':
                                    return (
                                        <TableOption
                                            key={"option_" + option.label + "_" + this.props.id}
                                            id={ this.props.id }
                                            option={ option }
                                            onClick={ this.updateRecipe } />
                                    )
                                case 'deleteRecipe':
                                    return (
                                        <TableOption
                                            key={"option_" + option.label + "_" + this.props.id}
                                            id={ this.props.id }
                                            option={ option }
                                            confirmation={ true }
                                            confirmationMessage={ "Remove Recipe?" }
                                            onClick={ this.startDeleteRecipe } />
                                    )
                            }
                        }) }
                        </section>
                    </div>
                </div>
            </section>
        )
	}
}

const mapDispatchToProps = (dispatch) => ({
	favoriteRecipe: (id, favorite) => dispatch(favoriteRecipe(id, favorite)),
	deleteRecipe: (id) => dispatch(deleteRecipe(id))
});
  
export default connect(undefined, mapDispatchToProps)(RecipeCard);