import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('utilityService')
class Currency extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: this.props.utilityService.formatCurrency(props.amount)
        }
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.amount == this.props.amount)
            return;

        this.setState({
            amount: this.props.utilityService.formatCurrency(nextProps.amount)
        });
    }

    render() {
        return (
            <span>
                { this.state.amount }
            </span>
        )
    }
}
export default Currency;