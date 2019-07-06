import React from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends React.Component {
    render() {
        const sidebarItems = [
            {label: 'My Recipes', icon: 'library_books', route: '/home'},
            {label: 'My Favorites', icon: 'favorite', route: '/favorites'},
            {label: 'Categories', icon: 'category', route: '/categories'},
            {label: 'Ingredients', icon: 'kitchen', route: '/ingredients'},
            {label: 'Cuisines', icon: 'explore', route: '/cuisines'},
            {label: 'Shopping List', icon: 'shopping_basket', route: 'shopping-list'},
            {label: 'Meal Planner', icon: 'bookmarks', route: 'meal-planner'},
            {label: 'Recipe Book', icon: 'book', route: 'recipe-book'},
            {label: 'Import/Export', icon: 'import_export', route: 'import-export'},
            {label: 'Settings', icon: 'settings', route: 'settings'},
        ];
		return (
            <aside className="navbar">
                { sidebarItems.map((item) => {
                    return (
                        <Link to={item.route} className="navbar__link">
                            <i className="material-icons navbar__icon">{item.icon}</i>
                            <h3 className="navbar__label">{item.label}</h3>
                        </Link>
                )}) }
            </aside>
		);
	};
};

export default Navbar;