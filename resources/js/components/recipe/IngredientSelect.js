import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { getIngredientSearchResults } from '../../actions/filters';

export class IngredientSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            'ingredient_id': 0,
            suggestions: [],
            mUnitSuggestions: this.props.measurement_units,
            amount: '',
            measurement_unit: '',
            measurement_unit_id: 0
        };
        this.baseState = this.state;

        this.timer;

        this.errorRed = 'rgb(222, 47, 4)';
        this.inputColor = '#151515';
    }

    setNewIngredientAmount = (e) => {
        const amount = e.target.value;
        this.setState(() => ({ amount }));
    }

    renderSuggestion = (suggestion) => {
        return (
            <div id={ "option_" + suggestion.id } className="react-autosuggest__suggestion-option">
                {suggestion.name}
            </div>
        )
    };
    onChange = (e, { newValue }) => {
        const ingredient_id = e.target.id.replace(/\D/g, '');
        this.setState({ value: newValue, ingredient_id });
    };
    onSuggestionsFetchRequested = ({ value }) => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.startSuggestionFetch(value);
        }, 400);
    };
    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] });
    };
        
    getSuggestionValue = suggestion => suggestion.name;

    getMUnitSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? this.props.measurement_units : this.props.measurement_units.filter(mUnit => {
            if (mUnit.name.toLowerCase().slice(0, inputLength) == inputValue) {
                return true;
            }
            // check measurement aliases for match
            const aliases = mUnit.aliases.split(',');
            for (let i = 0; i < aliases.length; i++) {
                if (aliases[i].toLowerCase().trim().slice(0, inputLength) == inputValue) {
                    return true;
                }
            }
        });
    };
    renderMUnitSuggestion = (suggestion) => {
        return (
            <div id={ "option_" + suggestion.id } className="react-autosuggest__suggestion-option">
                { suggestion.name }
            </div>
        )
    };
    mUnitOnChange = (e, { newValue }) => {
        const measurement_unit_id = e.target.id.replace(/\D/g, '');
        this.setState({ measurement_unit: newValue, measurement_unit_id });
    };
    mUnitOnFocus = (e) => {
        if (document.getElementById('measurement_unit_autosuggest').style.color == this.errorRed ) {
            document.getElementById('measurement_unit_autosuggest').style.color = this.inputColor;
            document.getElementById('measurement_unit_autosuggest').style.fontStyle = 'initial';
        }
    }
    mUnitOnBlur = (e) => {
        const inputValue = e.target.value.toLowerCase().trim();

        if (this.state.measurement_unit_id && 
            document.getElementById('measurement_unit_autosuggest').classList.contains('input-error'))
        {
            document.getElementById('measurement_unit_autosuggest').classList.remove('input-error');
        }

        let valid = false;
        // Try to find alias match for user input
        this.props.measurement_units.map((mUnit) => {
            if (inputValue === mUnit.name.toLowerCase()) {
                valid = true;

                this.setState({ 
                    measurement_unit: mUnit.name,
                    measurement_unit_id: mUnit.id
                });
            }
            else {
                const aliases = mUnit.aliases.split(",");
                aliases.map(alias => {
                    if (inputValue == alias.toLowerCase()) {
                        valid = true;

                        this.setState({ 
                            measurement_unit: mUnit.name,
                            measurement_unit_id: mUnit.id
                        });
                    }
                });
            }
        });

        if (!valid) {
            // User input is incorrect, alert to error
            document.getElementById('measurement_unit_autosuggest').style.color = this.errorRed;
            document.getElementById('measurement_unit_autosuggest').style.fontStyle = 'oblique';
        }
    }
    mUnitShouldRenderSuggestions = () => true;
    onMUnitSuggestionsFetchRequested = ({ value, reason }) => {
        this.setState({
            mUnitSuggestions: this.getMUnitSuggestions(value)
        });
    };
    onMUnitSuggestionsClearRequested = () => {
        this.setState({ mUnitSuggestions: [] });
    };
    onMUnitSuggestionSelected = (event, { suggestion, suggestionValue }) => {
        const measurement_unit_id = event.target.id.replace(/\D/g, '');
        this.setState({ measurement_unit: suggestionValue, measurement_unit_id });
    }

    startAddIngredient = () => {
        if (this.isValidIngredientEntry()) {
            this.props.addIngredient(this.state);
            this.setState(() => (this.baseState));
        }
        else {
            console.log('not valid');
            // TODO: message notifying of invalid entry
        }
    }

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
    
    isValidIngredientEntry = () => {
        return this.state.amount.trim() != '' &&
            this.state.measurement_unit_id != '' &&
            this.state.value.trim() != '';
    }

	render() {
        const { value, suggestions, measurement_unit } = this.state;

        const inputProps = {
            placeholder: 'Ingredient',
            value,
            onChange: this.onChange
        };

        const mUnitInputProps = {
            id: 'measurement_unit_autosuggest',
            placeholder: 'Unit',
            value: measurement_unit,
            onChange: this.mUnitOnChange,
            onBlur: this.mUnitOnBlur,
            onFocus: this.mUnitOnFocus
        };

		return (
            <section className="recipe-grid__ingredient-add select__wrapper--auto">
                <input
                    type="text"
                    className="recipe-grid__ingredient-input--amount"
                    name="amount"
                    value={ this.state.amount }
                    placeholder="Amount"
                    onChange={ this.setNewIngredientAmount } />

                <div className="recipe-grid__ingredient-input--measurement-unit">
                    <Autosuggest
                        id="measurement_unit_autosuggest"
                        suggestions={this.state.mUnitSuggestions}
                        shouldRenderSuggestions={this.mUnitShouldRenderSuggestions }
                        onSuggestionsFetchRequested={this.onMUnitSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onMUnitSuggestionsClearRequested}
                        onSuggestionSelected={this.onMUnitSuggestionSelected}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderMUnitSuggestion}
                        inputProps={mUnitInputProps} />
                </div>
                
                <Autosuggest
                    id="ingredient_autosuggest"
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestionSelected}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps} />
                <i
                    className="material-icons add-icon"
                    onClick={ this.startAddIngredient }>add_circle</i>
            </section>
		);
	};
};

const mapStateToProps = (state) => ({
    token: state.auth.token,
    csrf_token: state.auth.csrf_token,
    user_id: state.user.id,
    ingredients: state.ingredients,
    measurement_units: state.measurement_units
});
  
export default connect(mapStateToProps)(IngredientSelect);
