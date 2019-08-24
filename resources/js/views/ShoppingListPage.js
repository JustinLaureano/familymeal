import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import PageHeader from '../components/PageHeader';
import PageLoad from '../components/PageLoad';
import AddShoppingListCard from '../components/card/AddShoppingListCard.js';
import ShoppingListCard from '../components/card/ShoppingListCard.js';

export class ShoppingListPage extends React.Component {
	constructor(props) {
		super(props);
        
        this.state = {
			loading: true,
			lists: this.props.shopping_lists
        };
	};

	componentDidMount() {
		if (this.state.loading && this.props.shopping_lists.length > 0) {
			this.setState({ loading: false });
		}
	}

	componentDidUpdate() {
		if (this.props.shopping_lists.length == 0 && !this.state.loading) {
			this.setState({ loading: true });
		}
		else if (this.state.loading && this.props.shopping_lists.length > 0) {
			this.setState({
				lists: this.props.shopping_lists,
				loading: false 
			});
		}
	}

	onShoppingListChange = (list) => {
		console.log(list);
	}

	onAddShoppingList = () => {
		console.log('add');
	}

	render() {
		const pageHeaderProps = {
			title: 'Shopping List',
			subtitle: {
				className: 'page-header__record-count',
				text: this.state.lists.length + ' Lists'
			}
		}
		if (this.state.loading) {
			return (
				<PageLoad />
			)
		}
		else {
			return (
				<section className="table-grid--simple">
					<Breadcrumbs />
					<PageHeader { ...pageHeaderProps } />

					<section className="lists">
					{
						this.state.lists.map((list, index) => {
							return (
								<ShoppingListCard
									key={ "shopping-list_" + index }
									index={ index } 
									onChange={ this.onShoppingListChange }
									{ ...list }/>
							)
						})
					}
					{
						this.state.lists.length < this.props.shopping_list_limit &&
						<AddShoppingListCard onAddNewShoppingList={ this.onAddShoppingList } />
					}
					</section>
				</section>
			)
		}
	}
}

const mapStateToProps = (state) => ({
	shopping_lists: state.shopping_lists,
	shopping_list_limit: state.user_settings.shopping_list_limit
});
  
const mapDispatchToProps = (dispatch, props) => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListPage);