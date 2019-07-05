import React from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends React.Component {
    render() {
        const sidebarItems = [
            {label: 'Categories', icon: 'category',},
            {label: 'My Favorites', icon: 'favorite',},
            {label: 'My Recipes', icon: 'library_books',},
            {label: 'Cuisines', icon: 'explore',},
            {label: 'Shopping List', icon: 'shopping_basket',},
            {label: 'Meal Planner', icon: 'bookmarks',},
            {label: 'Recipe Book', icon: 'book',},
            {label: 'Import/Export', icon: 'import_export',},
            {label: 'Settings', icon: 'settings',},
        ];
		return (
            <aside className="navbar">
                { sidebarItems.map((item) => {
                    return (
                        <Link to="/" className="navbar__link">
                            <i className="material-icons navbar__icon">{item.icon}</i>
                            <h3 className="navbar__label">{item.label}</h3>
                        </Link>
                )}) }
            </aside>
		);
	};
};

export default Navbar;