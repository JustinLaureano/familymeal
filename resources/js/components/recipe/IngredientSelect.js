import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';

export class IngredientSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: [],
            amount: '',
            measurement_unit: ''
        };
    }

    setNewIngredientAmount = (e) => {
        const amount = e.target.value;
        this.setState(() => ({ amount }));
    }

    setNewMeasurementUnit = (e) => {
        const measurement_unit = e.target.value;
        this.setState(() => ({ measurement_unit }));
    }

    getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
       
        return inputLength === 0 ? [] : this.props.ingredients.filter(ingredient =>
            ingredient.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    getSuggestionValue = suggestion => suggestion.name;

    renderSuggestion = (suggestion) => (
        <div className="react-autosuggest__suggestion-option">
          {suggestion.name}
        </div>
      );

    onChange = (event, { newValue }) => {
        this.setState({ value: newValue });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] });
    };

	render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Ingredient',
            value,
            onChange: this.onChange
        };

		return (
            <section className="recipe-grid__ingredient-add select__wrapper--auto">
                <input
                    type="number"
                    className="recipe-grid__ingredient-input--amount"
                    name="amount"
                    value={ this.state.amount }
                    placeholder="Amount"
                    onChange={ this.setNewIngredientAmount } />
                <input
                    type="text"
                    className="recipe-grid__ingredient-input--measurement-unit"
                    name="measurement_unit"
                    value={ this.state.measurement_unit }
                    placeholder="Unit"
                    onChange={ this.setNewMeasurementUnit } />
                <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestionSelected}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps} />
                <i className="material-icons add-icon">add</i>
            </section>
		);
	};
};

const mapStateToProps = (state) => ({
    ingredients: state.ingredients
});
  
export default connect(mapStateToProps)(IngredientSelect);
