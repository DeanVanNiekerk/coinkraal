import React from 'react';
import { Line } from 'react-chartjs-2';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class PortfolioChart extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            data: this.formatData(props.chart.data),
            options: this.formatOptions(props.chart.options),
            isLoading: true,

            //selectedFiat: props.filters.selectedFiat,
            fiatDropDownOpen: false,

            //selectedCoin: props.filters.selectedCoin,
            coinDropDownOpen: false,

            selectedTimeRange: props.filters.selectedTimeRange,
            timeRangeDropDownOpen: false,
        }

        this.toggleTimeRangeDropDown = this.toggleTimeRangeDropDown.bind(this);
        this.selectTimeRange = this.selectTimeRange.bind(this);

        this.onFiltersChanged = this.onFiltersChanged.bind(this);

        this.getTimeRangeText = this.getTimeRangeText.bind(this);
    }

    //Remove observables (some reason chart js doesnt like them)
    formatData(data) {

        if (!data.labels)
            return {};

        return {
            labels: data.labels.map(l => l),
            datasets: data.datasets.map(ds => {
                return {
                    borderColor: ds.borderColor,
                    borderWidth: ds.borderWidth,
                    data: ds.data.map(d => d),
                    fill: ds.fill,
                    label: ds.label,
                    lineTension: ds.lineTension,
                    pointRadius: ds.pointRadius,
                    pointStyle: ds.pointStyle,
                    yAxisID: ds.yAxisID
                };
            })
        }
    }

    //Remove observables (some reason chart js doesnt like them)
    formatOptions(options) {

        options.scales.xAxes = options.scales.xAxes.map(x => x);
        options.scales.yAxes = options.scales.yAxes.map(y => y);

        return options;
    }

    componentWillReceiveProps(nextProps) {

        if (!nextProps.data)
            return;

        this.setState({
            data: this.formatData(nextProps.chart.data),
            options: this.formatData(nextProps.chart.options)
        });
    }

    toggleTimeRangeDropDown() {
        this.setState({
            timeRangeDropDownOpen: !this.state.timeRangeDropDownOpen
        });
    }

    selectTimeRange(timeRange) {
        this.setState({
            selectedTimeRange: timeRange
        }, this.onFiltersChanged);
    }

    onFiltersChanged() {

        if (!this.props.onFiltersChanged)
            return;

        this.props.onFiltersChanged({
            // selectedFiat: this.state.selectedFiat,
            //   selectedCoin: this.state.selectedCoin,
            selectedTimeRange: this.state.selectedTimeRange
        });
    }

    getTimeRangeText() {

        switch (this.state.selectedTimeRange) {
            case 7:
                return 'Last 7 Days';
            case 30:
                return 'Last Month';
            case 90:
                return 'Last 3 Months';
            case 180:
                return 'Last 6 Months';
            case 365:
                return 'Last Year';
        }
    }

    render() {

        return (

            <div>

                <div className="row justify-content-end">

                    <div className="col-auto">

                        <ButtonDropdown isOpen={this.state.timeRangeDropDownOpen} toggle={this.toggleTimeRangeDropDown}>
                            <DropdownToggle caret>
                                {this.getTimeRangeText()}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.selectTimeRange.bind(null, 7)}>Last 7 Days</DropdownItem>
                                <DropdownItem onClick={this.selectTimeRange.bind(null, 30)}>Last Month</DropdownItem>
                                <DropdownItem onClick={this.selectTimeRange.bind(null, 90)}>Last 3 Months</DropdownItem>
                                <DropdownItem onClick={this.selectTimeRange.bind(null, 180)}>Last 6 Months</DropdownItem>
                                <DropdownItem onClick={this.selectTimeRange.bind(null, 365)}>Last Year</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>

                    </div>

                </div>

                <div className="row">

                    <div className="col">

                        <Line
                            data={this.state.data}
                            options={this.state.options} />
                    </div>

                </div>

            </div>
        );
    }
}
export default PortfolioChart;