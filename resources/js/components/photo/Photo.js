import React from 'react';

export class Photo extends React.Component {
	render() {
		return (
            <img
			id={ this.props.id ? this.props.id : '' }
                className={this.props.className}
                src={this.props.src} />
		);
	};
};
  
export default Photo;
