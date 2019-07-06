import React from 'react';
import { Link } from 'react-router-dom';
import { getBreadcrumbs } from '../../helpers/Breadcrumbs';

export class Breadcrumbs extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
			breadcrumbs: []
        };
    };
    
	componentDidMount() {
		this.setState(() => ({
			breadcrumbs: getBreadcrumbs(),
		}));
	};

    render() {
		return (
            <section className="breadcrumbs">
            {
                this.state.breadcrumbs.map((breadcrumb, index) => {
                    return breadcrumb == 'home' ?
                    (
                        <Link to="/home" key={index} className="breadcrumb">
                            <i className="material-icons breadcrumb__home">home</i>
                        </Link>
                    ) :
                    (
                        <Link to={breadcrumb} key={index} className="breadcrumb">
                            <i className="material-icons breadcrumb__chain">more_horiz</i>
                            <span className="breadcrumb__link">{breadcrumb.replace('-', ' ')}</span>
                        </Link>
                    );
                })
            }
            </section>
		);
	};
};

export default Breadcrumbs;