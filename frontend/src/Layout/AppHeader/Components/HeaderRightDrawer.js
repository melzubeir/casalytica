import React, { Fragment } from "react";

import { Elastic } from "react-burgers";


class HeaderRightDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      openLeft: false,
      openRight: false,
      relativeWidth: false,
      // width: 450,
      noTouchOpen: false,
      noTouchClose: false,
    };
  }

  render() {
    const { openRight } = this.state;

    return (
      <Fragment>
        <div className="header-btn-lg">
          <Elastic width={26} lineHeight={2} lineSpacing={5} color="#6c757d" padding="5px" active={this.state.active}
            onClick={() =>
              this.setState({
                openRight: !openRight,
                openLeft: false,
                active: !this.state.active,
              })
            }/>
        </div>
      </Fragment>
    );
  }
}

export default HeaderRightDrawer;
