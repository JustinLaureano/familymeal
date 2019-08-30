import React from 'react';
import { Link } from 'react-router-dom';
import { getBreadcrumbs } from '../../services/Breadcrumbs';

export class Breadcrumbs extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            breadcrumbs: this.props.breadcrumbs,
        };
    };

    render() {
		return (
            <section className="breadcrumbs">
            {
                this.state.breadcrumbs.map((breadcrumb, index) => {
                    return breadcrumb.slug == 'home' ?
                    (
                        <Link to="/home" key={index} className="breadcrumb">
                            <i className="material-icons breadcrumb__home">home</i>
                        </Link>
                    ) :
                    (
                        <Link to={ breadcrumb.path } key={ index } className="breadcrumb">
                            <i className="material-icons breadcrumb__chain">more_horiz</i>
                            <span className="breadcrumb__link">{ breadcrumb.slug.replace('-', ' ') }</span>
                        </Link>
                    );
                })
            }
            </section>
		);
	};
};

export default Breadcrumbs;