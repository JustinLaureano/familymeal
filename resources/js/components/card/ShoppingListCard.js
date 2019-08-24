import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class ShoppingListCard extends React.Component {
	constructor(props) {
		super(props);
        
        this.state = {
			loading: true
        };
    };
    
    componentDidMount() {
		if (this.state.loading && this.props.hasOwnProperty('items') && this.props.items.length > 0) {
			this.setState({ loading: false });
		}
    }
    
    componentDidUpdate() {
        if (this.state.loading && this.props.hasOwnProperty('items') && this.props.items.length > 0) {
			this.setState({ loading: false });
		}
    }

    componentWillMount() {
        // console.log(this);
    }

	render() {
        return this.state.loading ? (
            <section className="list__area">
                <div id={ "shopping-list_" + this.props.id } className="list">
                    <div className="list__body">
                        <div className="loading__circle"></div>
                    </div>
                </div>
            </section>
            ) : (
            <section className="list__area">
                <div id={ "shopping-list_" + this.props.id } className="list">
                    <div className="list__header">
                        <h4>{ this.props.name }</h4>
                    </div>
                    <div className="list__body">
                    {
                        this.props.items.map((item, index) => {
                            return (
                                <div
                                    key={ "shopping_list_" + this.props.id + "_item_" + item.id }
                                    id={ "shopping_list_" + this.props.id + "_item_" + item.id } >
                                    { item.ingredient_name }
                                </div>
                            )
                        })
                    }
                    </div>
                    <div className="list__footer"></div>
                </div>
            </section>
        )
	}
}

export default ShoppingListCard;