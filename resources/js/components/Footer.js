import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class Footer extends React.Component {
	render() {
		return (
			<footer className="footer">
				<section className="footer__content">
					<section className="footer__copyright">&copy; { new Date().getFullYear() } Recipe Confidential</section>
				</section>
    		</footer>
		);
	};
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
