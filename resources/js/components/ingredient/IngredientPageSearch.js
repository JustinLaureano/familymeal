import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../routers/AppRouter';
import Autosuggest from 'react-autosuggest';

export class IngredientPageSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: []
        };
    }

    getSuggestionValue = suggestion => suggestion.name;

    onChange = (e, { newValue }) => {
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

    onSuggestionSelected = (event, { suggestion }) => {
        history.push({
            pathname: '/ingredients/' + suggestion.id,
            state: { id: suggestion.id }
          });
    }

    renderInputComponent = (inputProps) => (
        <div className="react-autosuggest__input-container">
          <input {...inputProps} />
          <i className="material-icons react-autosuggest__input-icon">search</i>
        </div>
    );

    getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
       
        return inputLength === 0 ? [] : this.props.ingredients.filter(ingredient =>
            ingredient.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    renderSuggestion = (suggestion) => {
        return (
            <Link
                to={{
                    pathname: '/ingredients/' + suggestion.id,
                    state: {
                      id: suggestion.id
                    }
                }}
                id={ "option_" + suggestion.id } 
                className="react-autosuggest__suggestion-option">
                { suggestion.name }
            </Link>
        )
    };

	render() {

        const inputProps = {
            placeholder: 'Search',
            value: this.state.value,
            onChange: this.onChange
        };

		return (
            <Autosuggest
                id="ingredient_autosuggest"
                suggestions={ this.state.suggestions }
                onSuggestionsFetchRequested={ this.onSuggestionsFetchRequested }
                onSuggestionsClearRequested={ this.onSuggestionsClearRequested }
                getSuggestionValue={ this.getSuggestionValue }
                onSuggestionSelected={ this.onSuggestionSelected }
                renderInputComponent={ this.renderInputComponent }
                renderSuggestion={ this.renderSuggestion }
                inputProps={ inputProps } />
		);
	};
};

const mapStateToProps = (state) => ({
    ingredients: state.ingredients
});

export default connect(mapStateToProps)(IngredientPageSearch);