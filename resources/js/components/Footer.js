import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class Footer extends React.Component {
	render() {
		return (
			<footer className="footer">
    		</footer>
		);
	};
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
