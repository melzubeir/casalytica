import React, { Fragment } from "react";

import {
  IoIosGrid,
  IoIosAnalytics,
} from "react-icons/io";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Nav,
  Col,
  Row,
  Button,
  NavItem,
  DropdownItem,
} from "reactstrap";

import { AreaChart, Area, ResponsiveContainer } from "recharts";

import { faArrowLeft, faCog } from "@fortawesome/free-solid-svg-icons";

import CountUp from "react-countup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import bg4 from "../../../assets/utils/images/dropdown-header/abstract4.jpg";
import city2 from "../../../assets/utils/images/dropdown-header/city2.jpg";

import Flag from "react-flagkit";

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page C", uv: 2000, pv: 6800, amt: 2290 },
  { name: "Page D", uv: 4780, pv: 7908, amt: 2000 },
  { name: "Page E", uv: 2890, pv: 9800, amt: 2181 },
  { name: "Page F", uv: 1390, pv: 3800, amt: 1500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

class HeaderDots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  render() {
    return (
      <Fragment>
        <div className="header-dots">
          <UncontrolledDropdown>
            <DropdownToggle className="p-0 me-2" color="link">
              <div className="icon-wrapper icon-wrapper-alt rounded-circle">
                <div className="icon-wrapper-bg bg-primary" />
                <IoIosGrid color="#3f6ad8" fontSize="23px" />
              </div>
            </DropdownToggle>
            <DropdownMenu end className="dropdown-menu-xl rm-pointers">
              <div className="dropdown-menu-header">
                <div className="dropdown-menu-header-inner bg-plum-plate">
                  <div className="menu-header-image"
                    style={{
                      backgroundImage: "url(" + bg4 + ")",
                    }}/>
                  <div className="menu-header-content text-white">
                    <h5 className="menu-header-title">Grid Dashboard</h5>
                    <h6 className="menu-header-subtitle">
                      Easy grid navigation inside dropdowns
                    </h6>
                  </div>
                </div>
              </div>
              <div className="grid-menu grid-menu-xl grid-menu-3col">
                <Row className="g-0s">
                  <Col xl="4" sm="6">
                    <Button className="btn-icon-vertical btn-square btn-transition" outline color="link">
                      <i className="pe-7s-world icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3">  {" "} </i>
                      Automation
                    </Button>
                  </Col>
                  <Col xl="4" sm="6">
                    <Button className="btn-icon-vertical btn-square btn-transition" outline color="link">
                      <i className="pe-7s-piggy icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3">
                        {" "}
                      </i>
                      Reports
                    </Button>
                  </Col>
                  <Col xl="4" sm="6">
                    <Button className="btn-icon-vertical btn-square btn-transition" outline color="link">
                      <i className="pe-7s-config icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> {" "} </i>
                      Settings
                    </Button>
                  </Col>
                  <Col xl="4" sm="6">
                    <Button className="btn-icon-vertical btn-square btn-transition" outline color="link">
                      <i className="pe-7s-browser icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> {" "} </i>
                      Content
                    </Button>
                  </Col>
                  <Col xl="4" sm="6">
                    <Button className="btn-icon-vertical btn-square btn-transition" outline color="link">
                      <i className="pe-7s-hourglass icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> {" "} </i>
                      Activity
                    </Button>
                  </Col>
                  <Col xl="4" sm="6">
                    <Button className="btn-icon-vertical btn-square btn-transition" outline color="link">
                      <i className="pe-7s-world icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"> {" "} </i>
                      Contacts
                    </Button>
                  </Col>
                </Row>
              </div>
              <Nav vertical>
                <NavItem className="nav-item-divider" />
                <NavItem className="nav-item-btn text-center">
                  <Button size="sm" className="btn-shadow" color="primary">
                    Follow-ups
                  </Button>
                </NavItem>
              </Nav>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown>
            <DropdownToggle className="p-0 me-2" color="link">
              <div className="icon-wrapper icon-wrapper-alt rounded-circle">
                <div className="icon-wrapper-bg bg-focus" />
                <div className="language-icon">
                  <Flag className="me-3 opacity-8" country="DE" size="40" />
                </div>
              </div>
            </DropdownToggle>
            <DropdownMenu end className="rm-pointers">
              <div className="dropdown-menu-header">
                <div className="dropdown-menu-header-inner pt-4 pb-4 bg-focus">
                  <div className="menu-header-image opacity-05"
                    style={{
                      backgroundImage: "url(" + city2 + ")",
                    }}/>
                  <div className="menu-header-content text-center text-white">
                    <h6 className="menu-header-subtitle mt-0">
                      Choose Language
                    </h6>
                  </div>
                </div>
              </div>
              <DropdownItem header>Popular Languages</DropdownItem>
              <DropdownItem>
                <Flag className="me-3 opacity-8" country="US" />
                USA
              </DropdownItem>
              <DropdownItem>
                <Flag className="me-3 opacity-8" country="CH" />
                Switzerland
              </DropdownItem>
              <DropdownItem>
                <Flag className="me-3 opacity-8" country="FR" />
                France
              </DropdownItem>
              <DropdownItem>
                <Flag className="me-3 opacity-8" country="ES" />
                Spain
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem header>Others</DropdownItem>
              <DropdownItem active>
                <Flag className="me-3 opacity-8" country="DE" />
                Germany
              </DropdownItem>
              <DropdownItem>
                <Flag className="me-3 opacity-8" country="IT" />
                Italy
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown>
            <DropdownToggle className="p-0" color="link">
              <div className="icon-wrapper icon-wrapper-alt rounded-circle">
                <div className="icon-wrapper-bg bg-success" />
                <IoIosAnalytics color="#3ac47d" fontSize="23px" />
              </div>
            </DropdownToggle>
            <DropdownMenu end className="dropdown-menu-xl rm-pointers">
              <div className="dropdown-menu-header">
                <div className="dropdown-menu-header-inner bg-premium-dark">
                  <div className="menu-header-image"
                    style={{
                      backgroundImage: "url(" + bg4 + ")",
                    }}/>
                  <div className="menu-header-content text-white">
                    <h5 className="menu-header-title">Users Online</h5>
                    <h6 className="menu-header-subtitle">
                      Recent Account Activity Overview
                    </h6>
                  </div>
                </div>
              </div>
              <div className="widget-chart">
                <div className="widget-chart-content">
                  <div className="icon-wrapper rounded-circle">
                    <div className="icon-wrapper-bg opacity-9 bg-focus" />
                    <i className="lnr-users text-white" />
                  </div>
                  <div className="widget-numbers">
                    <CountUp start={0} end={344} separator="" decimals={0} decimal=","
                      prefix="" useEasing={false} suffix= "k" duration="15"/>
                  </div>
                  <div className="widget-subheading pt-2">
                    Profile views since last login
                  </div>
                  <div className="widget-description text-danger">
                    <span className="pe-1">
                      <CountUp start={0} end={176} separator="," delay={2} decimals={0} decimal=","
                        useEasing={false} prefix="" suffix="%" duration="10"/>
                    </span>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </div>
                </div>
                <div className="widget-chart-wrapper">
                  <ResponsiveContainer width="100%" aspect={3.0 / 1.0}>
                    <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <Area type="monotoneX" dataKey="uv" stroke="#f7b924" fill="#f7b924" fillOpacity=".5"/>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <Nav vertical>
                <NavItem className="nav-item-divider mt-0"> </NavItem>
                <NavItem className="nav-item-btn text-center">
                  <Button size="sm" className="btn-shine btn-wide btn-pill" color="warning">
                    <FontAwesomeIcon className="me-2" icon={faCog} spin fixedWidth={false}/>
                    Refresh List
                  </Button>
                </NavItem>
              </Nav>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </Fragment>
    );
  }
}

export default HeaderDots;
