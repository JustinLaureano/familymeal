import React from 'react';

export class Photo extends React.Component {
	render() {
		return (
            <img
                className={this.props.className}
                src={this.props.src} />
		);
	};
};
  
export default Photo;
