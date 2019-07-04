import React from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends React.Component {	
	render() {
		return (
            <aside className="navbar-container">
                <section className="navbar-icon-list">
                    <Link to="/" className="navbar-icon-item">
                        <i className="material-icons navbar-icon">person</i>
                    </Link>
                </section>
                <section className="navbar-label-list">
                    <Link to="/" className="navbar-label">Person</Link>
                    <Link to="/" className="navbar-label">Person</Link>
                </section>
            </aside>
		);
	};
};