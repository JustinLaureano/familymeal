import React from 'react';

export class TableCascadeOption extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            dropdownOpen: false
        };
    };
    
    toggleDropdown = () => {
        this.setState(() => ({ dropdownOpen: !this.state.dropdownOpen }));
    }

	render() {
        const option = this.props.option;
        const id = this.props.id;
        return (
            <div
                key={"option_" + option.label + "_" + id}
                className="table__more-option--cascade">

                <div className={ "table__more-options-cascade-btn" + (this.state.dropdownOpen ? '--open' : '' )}>
                    <i className="material-icons table__more-option-icon">{ option.icon }</i>
                    
                    <span>{ option.label }</span>
                    <div className="table__more-option-icon-box" onClick={ this.toggleDropdown }>
                        <i className="material-icons table__more-option-icon">{ this.state.dropdownOpen ? "arrow_drop_up" : "arrow_drop_down" }</i>
                    </div>
                </div>

                <div className={ "table__more-option-dropdown" + (this.state.dropdownOpen ? '' : ' display--none' )}>
                    {
                        this.props.dropdownOptions.map(option => {
                            return (
                                <div 
                                    key={ "dropdown-option_" + id + '_' + option.id }
                                    id={ "dropdown-option_" + option.id }
                                    className="table__more-dropdown-option"
                                    onClick={ this.props.onClick } >
                                    { option.label }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
	}
}

export default TableCascadeOption;