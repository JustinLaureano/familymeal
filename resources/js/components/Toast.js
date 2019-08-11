import React from 'react';
import { connect } from 'react-redux';
import { clearToastMessages } from '../actions/toast';

export class Toast extends React.Component {
    componentDidMount() {
        this.hideToast();
    }

    componentDidUpdate() {
        if (this.props.messages) {
            this.hideToast();
        }
    }

    hideToast = () => {
        setTimeout(() => {
            if (document.getElementById('toast-container')) {
                document.getElementById('toast-container').className = 'toast--hidden';
            }
        }, 3000);

        if (this.props.messages.length > 0) {
            setTimeout(() => {
                this.props.clearToastMessages();
            }, 3250);
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
        else if (this.props.messages.length > 0) {
            return (
                <div id="toast-container" className="toast">
                    {
                    this.props.messages.map((msg, index) => {
                        return (
                            <p key={ "toast_" + index } className="toast__message">{ msg }</p>
                        )
                    })
                    }
                </div>
            )
        }
        else { return ''; }
	};
};

const mapStateToProps = (state) => ({
    messages: state.toast.messages
});

const mapDispatchToProps = (dispatch, props) => ({
	updateRecipeSummary: (summary) => dispatch(updateRecipeSummary(summary)),
	clearToastMessages: () => dispatch(clearToastMessages())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Toast);