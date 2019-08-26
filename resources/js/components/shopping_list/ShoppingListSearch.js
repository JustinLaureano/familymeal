import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../routers/AppRouter';
import Autosuggest from 'react-autosuggest';
import { getIngredientSearchResults } from '../../actions/filters';

export class ShoppingListSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: []
        };

        this.timer;
    }

    getSuggestionValue = suggestion => suggestion.name;

    onChange = (e, { newValue }) => this.setState({ value: newValue });

    onSuggestionsFetchRequested = ({ value }) => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.startSuggestionFetch(value);
        }, 400);
    };

    onSuggestionsClearRequested = () => this.setState({ suggestions: [] });

    onSuggestionSelected = (event, { suggestion }) => {
        console.log(event, suggestion);
    }

    renderInputComponent = (inputProps) => (
        <div className="react-autosuggest__input-container">
          <input {...inputProps} />
          <i className="material-icons react-autosuggest__input-icon">search</i>
        </div>
    );

    renderSuggestion = (suggestion) => {
        return (
            <div
                id={ "option_" + suggestion.id } 
                className="react-autosuggest__suggestion-option">
                { suggestion.name }
            </div>
        )
    };

    startSuggestionFetch = (value) => {
        const searchParams = {
            token: this.props.token,
            csrf_token: this.props.csrf_token,
            user_id: this.props.user_id,
            value
        }

        getIngredientSearchResults(searchParams)
            .then((data) => {
                this.setState({
                    suggestions: data.ingredients
                });
            })
            .catch(err => console.log(err));
    }

	render() {
        const inputProps = {
            placeholder: 'Search',
            value: this.state.value,
            onChange: this.onChange
        };

		return (
            <Autosuggest
                id={ "shopping-list_autosuggest_" + this.props.shoppingListId }
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
    token: state.auth.token,
    csrf_token: state.auth.csrf_token,
    user_id: state.user.id
});

export default connect(mapStateToProps)(ShoppingListSearch);