import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import PageHeader from '../components/PageHeader';
import PageLoad from '../components/PageLoad';
import { createNewShoppingList } from '../actions/shoppingList';
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
			// nothing has loaded yet
			this.setState({ loading: true });
		}
		else if (this.state.loading && this.props.shopping_lists.length > 0) {
			// shopping lists have loaded, can now set loading to false
			this.setState({
				lists: this.props.shopping_lists,
				loading: false 
			});
		}
		else if (! this.state.loading && this.props.shopping_lists.length > 0) {

			if (this.state.lists.length !== this.props.shopping_lists.length) {
				// new list added or deleted
				this.setState(() => ({ lists: this.props.shopping_lists }));
			}
			else {
				// check for new shopping list items
				for(let i = 0; i < this.props.shopping_lists.length; i++) {
					if (this.state.lists[i].items.length != this.props.shopping_lists[i].items.length) {
						this.setState(() => ({ lists: this.props.shopping_lists }));
						break;
					}
				}
			}
		}
	}

	onAddShoppingList = () => {
		console.log('add');
		this.props.createNewShoppingList();
	}

	render() {
		const pageHeaderProps = {
			title: 'Shopping List',
			subtitle: {
				className: 'page-header__record-count',
				text: this.state.lists.length + ' Lists'
			}
		}
		return this.state.loading ?
			( <PageLoad /> ) :
			(
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

const mapStateToProps = (state) => ({
	shopping_lists: state.shopping_lists,
	shopping_list_limit: state.user_settings.shopping_list_limit
});
  
const mapDispatchToProps = (dispatch, props) => ({
	createNewShoppingList: () => dispatch(createNewShoppingList())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListPage);