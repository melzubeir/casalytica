import React, { Fragment } from "react";

import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";


class FormDateRangePicker extends React.Component {
  state = {
    date: [new Date(), new Date()],
  };

  onChange = (date) => this.setState({ date });

  render() {
    return (
      <Fragment>
        <div>
          <DateTimeRangePicker onChange={this.onChange} value={this.state.date}/>
        </div>
      </Fragment>
    );
  }
}

export default FormDateRangePicker;
