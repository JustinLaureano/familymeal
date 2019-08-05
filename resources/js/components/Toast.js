import React from 'react';

export class Toast extends React.Component {
    componentDidMount() {
        console.log(this.props);
        if (document.getElementById('toast-container')) {
            setTimeout(() => {
                document.getElementById('toast-container').className = 'toast--hidden';
            }, 3000);
        }
    }

	render() {
        if (this.props.location.state && this.props.location.state.toast) {
            return (
                <div id="toast-container" className="toast">
                    <p className="toast__message">{ this.props.location.state.toast.message }</p>
                </div>
            )
        }
        else {
            return '';
        }
	};
};

export default Toast;
