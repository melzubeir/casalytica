import React, { Fragment, Component } from "react";

import { Card, CardBody } from "reactstrap";

import BigCalendar from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import events from "./Events";

const propTypes = {};

class CalendarCreateEvents extends Component {
  constructor(...args) {
    super(...args);

    this.state = { events };
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      });
  };
  render() {
    const { localizer } = this.props;
    return (
      <Fragment>
        <Card>
          <CardBody>
            <BigCalendar selectable localizer={localizer} events={this.state.events} defaultView={BigCalendar.Views.WEEK}
              scrollToTime={new Date(1970, 1, 1, 6)} defaultDate={new Date(2015, 3, 12)}
              onSelectEvent={(event) => alert(event.title)} onSelectSlot={this.handleSelect} />
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}

CalendarCreateEvents.propTypes = propTypes;

export default CalendarCreateEvents;
