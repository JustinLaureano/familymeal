import React from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends React.Component {	
	render() {
		return (
            <aside className="navbar">
                <section className="navbar-icons">
                    <Link to="/" className="navbar-icons__item">
                        <i className="material-icons navbar-icons__icon">person</i>
                    </Link>
                    <Link to="/" className="navbar-icons__item">
                        <i className="material-icons navbar-icons__icon">person</i>
                    </Link>
                </section>
                <section className="navbar-labels">
                    <Link to="/" className="navbar-labels__label">Person</Link>
                    <Link to="/" className="navbar-labels__label">Person</Link>
                </section>
            </aside>
		);
	};
};

export default Navbar;