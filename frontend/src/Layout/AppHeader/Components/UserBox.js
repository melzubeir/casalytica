import React, { Fragment } from "react";

import PerfectScrollbar from "react-perfect-scrollbar";

import {
  DropdownToggle,
  DropdownMenu,
  Nav,
  Col,
  Row,
  Button,
  NavItem,
  NavLink,
  UncontrolledButtonDropdown,
} from "reactstrap";

import { toast, Bounce } from "react-toastify";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import 'react-toastify/dist/ReactToastify.css';

import city3 from "../../../assets/utils/images/dropdown-header/city3.jpg";
import avatar1 from "../../../assets/utils/images/avatars/cloutpunk.gif";

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

const UserBox = (props) => {

  const [active, setActive] = React.useState(false);

  const notify2 = () =>
  (this.toastId = toast(
    "You don't have any new items in your calendar for today! Go out and play!",
    {
      transition: Bounce,
      closeButton: true,
      autoClose: 5000,
      position: "bottom-center",
      type: "success",
    }
  ));

  return (
    <Fragment>
      <div className="header-btn-lg pe-0">
        <div className="widget-content p-0">
          <div className="widget-content-wrapper">
            <div className="widget-content-left">
              <UncontrolledButtonDropdown>
                <DropdownToggle color="link" className="p-0">
                  <img width={42} className="rounded-circle" src={props.avatar} alt="" />
                  <FontAwesomeIcon
                    className="ms-2 opacity-8"
                    icon={faAngleDown}
                  />
                </DropdownToggle>
                <DropdownMenu end className="rm-pointers dropdown-menu-lg">
                  <div className="dropdown-menu-header">
                    <div className="dropdown-menu-header-inner bg-info">
                      <div className="menu-header-image opacity-2"
                        style={{
                          backgroundImage: "url(" + city3 + ")",
                        }} />
                      <div className="menu-header-content text-start">
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left me-3">
                              <img width={42} className="rounded-circle" src={props.avatar} alt="" />
                            </div>
                            <div className="widget-content-left">
                              <div className="widget-heading">
                                {props.username}
                              </div>
                              <div className="widget-subheading opacity-8">
                                {props.description ? truncateString(props.description, 20) : "" }
                              </div>
                            </div>
                            <div className="widget-content-right me-2">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="scroll-area-xs"
                    style={{
                      height: "150px",
                    }}>
                    <PerfectScrollbar>
                      <Nav vertical>
                        <NavItem className="nav-item-header">
                          My Account
                        </NavItem>
                        <NavItem>
                          <NavLink href="#">
                            Settings
                            <div className="ms-auto badge bg-success">
                              New
                            </div>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="#">
                            Messages
                            <div className="ms-auto badge bg-warning">
                              512
                            </div>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </PerfectScrollbar>
                  </div>
                  <Nav vertical>
                    <NavItem className="nav-item-divider mb-0" />
                  </Nav>
                  <div className="grid-menu grid-menu-2col">
                    <Row className="g-0">
                      <Col sm="6">
                        <Button className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2"
                          outline color="warning">
                          <i className="pe-7s-chat icon-gradient bg-amy-crisp btn-icon-wrapper mb-2"> {" "} </i>
                          DM
                        </Button>
                      </Col>
                      <Col sm="6">
                        <Button className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2"
                          outline color="danger">
                          <i className="pe-7s-ticket icon-gradient bg-love-kiss btn-icon-wrapper mb-2"> {" "} </i>
                          <b>Support</b>
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  <Nav vertical>
                    <NavItem className="nav-item-divider" />
                    <NavItem className="nav-item-btn text-center">
                      <Button size="sm" className="btn-wide" color="primary">
                        Open Messages
                      </Button>
                    </NavItem>
                  </Nav>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
            <div className="widget-content-left  ms-3 header-user-info">
              <div className="widget-heading">{props.username}</div>
              <div className="widget-subheading">{ props.description ? truncateString(props.description, 8) : ""}</div>
            </div>
            <div className="widget-content-right header-user-info ms-3">

            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}


export default UserBox;
