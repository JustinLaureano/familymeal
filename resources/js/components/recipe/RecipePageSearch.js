import React from 'react';

export class RecipePageSearch extends React.Component {
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] });
    };


	render() {

        const inputProps = {
            placeholder: 'Search',
            value,
            onChange: this.onChange
        };

		return (
            <Autosuggest
                id="ingredient_autosuggest"
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps} />
		);
	};
};
  
export default PageSearch;
