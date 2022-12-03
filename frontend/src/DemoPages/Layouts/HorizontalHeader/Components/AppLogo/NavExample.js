import React, { Component, Fragment } from "react";

import MetisMenu from "react-metismenu";

const content = [
  {
    label: "Generic Reports",
  },
  {
    label: "Overview",
    content: [
      { label: "Contacts" },
      { label: "Incidents" },
      { label: "Companies" },
      { label: "Dashboards" },
    ],
  },
  {
    label: "Favourites",
    content: [
      { label: "Reports Conversions" },
      { label: "Quick Start" },
      { label: "Users & Groups" },
      { label: "Proprieties" },
      { label: "Sales & Marketing" },
      {
        label: "Goal Metrics",
        content: [
          { label: "Settings" },
          { label: "Queues" },
          { label: "Accounts" },
        ],
      },
      { label: "Resource Groups" },
    ],
  },
  {
    label: "Knowledge Base",
    content: [
      { label: "Service Calendar" },
      { label: "Products" },
      {
        label: "Settings",
        content: [
          { label: "Graphic Design" },
          { label: "App Development" },
          { label: "Icon Design" },
          { label: "Miscellaneous" },
          { label: "Frontend Dev" },
        ],
      },
      { label: "Projects" },
      { label: "Overview" },
    ],
  },
];

class NavExample extends Component {
  render() {
    return (
      <Fragment>
        <MetisMenu content={content} />,
      </Fragment>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default NavExample;
