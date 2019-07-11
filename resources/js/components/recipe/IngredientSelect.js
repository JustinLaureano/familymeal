import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';

export class IngredientSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          value: '',
          suggestions: []
        };
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
        <div className="input--suggestion">
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
            placeholder: 'Search for an Ingredient',
            value,
            onChange: this.onChange
        };

		return (
            <section className="select__wrapper--auto">
            <Autosuggest
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps} />
            </section>
		);
	};
};

const mapStateToProps = (state) => ({
    ingredients: state.ingredients
});
  
export default connect(mapStateToProps)(IngredientSelect);
