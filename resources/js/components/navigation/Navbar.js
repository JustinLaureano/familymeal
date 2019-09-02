import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSidebarOpen } from '../../actions/ui'; 

export class Navbar extends React.Component {
    toggleSidebarOpen = () => this.props.toggleSidebarOpen(!this.props.sidebarOpen);

    render() {
        const sidebarItems = [
            {label: 'My Recipes', icon: 'library_books', route: '/home'},
            {label: 'My Favorites', icon: 'favorite', route: '/favorites'},
            {label: 'Categories', icon: 'category', route: '/categories'},
            {label: 'Ingredients', icon: 'kitchen', route: '/ingredients'},
            {label: 'Cuisines', icon: 'restaurant', route: '/cuisines'},
            {label: 'Shopping List', icon: 'shopping_basket', route: '/shopping-list'},
            {label: 'Meal Planner', icon: 'bookmarks', route: '/meal-planner'},
            {label: 'Recipe Book', icon: 'book', route: '/recipe-book'},
            {label: 'Import/Export', icon: 'import_export', route: '/import-export'},
            {label: 'Settings', icon: 'settings', route: '/settings'},
        ];
		return (
            <aside className={ this.props.sidebarOpen ? "navbar--open" : "navbar" }>
                <div className="navbar__toggle" onClick={ this.toggleSidebarOpen }>
                    <i className="material-icons navbar__toggle-icon">
                        { this.props.sidebarOpen ? 'arrow_left' : 'arrow_right' }
                    </i>
                </div>
                { sidebarItems.map((item, index) => {
                    return (
                        <Link 
                            key={index}
                            to={item.route} 
                            className="navbar__link">
                            
                            <i className="material-icons navbar__icon">{item.icon}</i>
                            <h3 className="navbar__label">{item.label}</h3>

                        </Link>
                )}) }
            </aside>
		);
	};
};

const mapStateToProps = (state) => ({
    sidebarOpen: state.ui.sidebarOpen
});

const mapDispatchToProps = (dispatch) => ({
    toggleSidebarOpen: (sidebarOpen) => dispatch(toggleSidebarOpen(sidebarOpen))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);