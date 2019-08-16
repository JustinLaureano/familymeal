import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeTablePage, addCuisineTypeFilter, removeCuisineTypeFilter } from '../../actions/filters';

export class CuisineTypeFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false,
            cuisine_types: this.props.cuisine_types,
            filteredCuisines: this.props.filteredCuisines
        }
    }

    componentDidUpdate() {
        if (this.state.cuisine_types.length !== this.props.cuisine_types.length) {
            this.setState({ cuisine_types: this.props.cuisine_types });
        }
        
        if (this.state.filteredCuisines.length !== this.props.filteredCuisines.length) {
            this.setState({ filteredCuisines: this.props.filteredCuisines });
        }
        
        if (this.state.menuOpen) {
            document.addEventListener('click', this.clickEvent);
        }
        else {
            document.removeEventListener('click', this.clickEvent);
        }
    }

    clickEvent = (e) => {
        if (!e.target.id.includes('cuisine_') && this.state.menuOpen) {
            // mouse click was outside the cuisine menu, so close the menu
            this.setState({ menuOpen: false });
        }
    }

    toggleCuisineFilterMenu = () => this.setState({ menuOpen: !this.state.menuOpen });

    toggleCuisineOption = (e) => {
        const cuisine_type_id = e.target.id.replace(/\D/g, '');

        e.target.className.includes('filter__suggestion--selected') ?
            this.props.removeCuisineTypeFilter( parseInt(cuisine_type_id) ) :
            this.props.addCuisineTypeFilter( parseInt(cuisine_type_id) );

        this.props.changeTablePage(1, 'recipe');
    }

	render() {
		return (
            <div className="filter">
                <button className="filter__btn" onClick={ this.toggleCuisineFilterMenu }>
                Cuisine
                <i className="material-icons dropdown-icon">arrow_drop_down</i>
                </button>
                <div className={ "filter__suggestions" + (this.state.menuOpen ? '' : ' display--none') }>
                    {
                        this.state.cuisine_types.map((cuisine) => {
                            return (
                                <div
                                    key={ "cuisine_" + cuisine.id }
                                    id={ "cuisine_" + cuisine.id }
                                    onClick={ this.toggleCuisineOption }
                                    className={ this.state.filteredCuisines.includes(cuisine.id) ? ' filter__suggestion--selected' : 'filter__suggestion' }>
                                    { cuisine.name }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
		);
	};
};

const mapStateToProps = (state) => ({
    cuisine_types: state.cuisine_types,
    filteredCuisines: state.filters.cuisine_type
});

const mapDispatchToProps = (dispatch) => ({
    changeTablePage: (pageNumber, model) => dispatch(changeTablePage(pageNumber, model)),
    addCuisineTypeFilter: (cuisine_type_id) => dispatch(addCuisineTypeFilter(cuisine_type_id)),
    removeCuisineTypeFilter: (cuisine_type_id) => dispatch(removeCuisineTypeFilter(cuisine_type_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CuisineTypeFilter);
