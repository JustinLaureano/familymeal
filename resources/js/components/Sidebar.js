import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class Sidebar extends React.Component {
	render() {
		return (
			<aside className="sidebar">
    		</aside>
		);
	};
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
