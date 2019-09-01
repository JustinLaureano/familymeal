import React from 'react';
import { connect } from 'react-redux';
import IngredientCategory from '../../components/ingredient/IngredientCategory';
import IngredientSubcategory from '../../components/ingredient/IngredientSubcategory';

export class IngredientInfo extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
			category: this.props.category,
			subcategory: this.props.subcategory
        };
	};
	
	componentDidUpdate() {
        if (this.props.cancelChanges && this.state.category !== this.props.category) {
            this.setState(() => ({ category: this.props.category }));
        }
	}
	
	filteredSubcategories = () => {
		return this.props.ingredient_subcategories.filter(subcategory => {
			return parseInt(subcategory.ingredient_category_id) === parseInt(this.state.category.id);
		});
	}

    setIngredientCategory = (e) => {
        const category = {
            id: e.target.value,
            name: document.querySelector("option[id='category_" + e.target.value + "']").innerHTML
        };
        this.setState({
			category,
			subcategory: {
				id: null,
				name: null 
			}
		});
	}
	
	setIngredientSubcategory = (e) => {
		console.log(e.target);
        const subcategory = {
            id: e.target.value,
            name: document.querySelector("option[id='subcategory_" + e.target.value + "']").innerHTML
        };
        this.setState(() => ({ subcategory }));
    }

	render() {
		const subcategories = this.filteredSubcategories();
		return (
            <section className="recipe-grid__info">
				<IngredientCategory 
					setIngredientCategory={ this.setIngredientCategory }
					category={ this.state.category }
					ingredientCategories={ this.props.ingredient_categories }/>
				<IngredientSubcategory 
					setIngredientSubcategory={ this.setIngredientSubcategory }
					subcategory={ this.state.subcategory }
					ingredientSubcategories={ subcategories }/>
            </section>
		);
	};
};

const mapStateToProps = (state) => ({
    editMode: state.filters.editMode,
    cancelChanges: state.filters.cancelChanges,
    category: {
        id: state.filters.currentIngredient.ingredient_category_id,
        name: state.filters.currentIngredient.ingredient_category_name
	},
	subcategory: {
        id: state.filters.currentIngredient.ingredient_subcategory_id,
        name: state.filters.currentIngredient.ingredient_subcategory_name
    },
    ingredient_categories: state.ingredient_categories,
    ingredient_subcategories: state.ingredient_subcategories
});

export default connect(mapStateToProps)(IngredientInfo);
