import React, { Component } from "react";
import Chart from "react-apexcharts";

class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ["Products Rating"],
      },
      series: this.props.series,
    };
  }

  render() {
    return (
      <div className="donut">
        <Chart
          options={this.state.options}
          series={this.state.series}
          labels={this.state.labels}
          type="donut"
          width={this.props.width}
        />
      </div>
    );
  }
}

export default Donut;
