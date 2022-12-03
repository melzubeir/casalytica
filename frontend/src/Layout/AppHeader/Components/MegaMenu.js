import React, { Fragment } from "react";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Popover,
  Nav,
  NavLink,
  Col,
  Row,
  NavItem,
  UncontrolledButtonDropdown,
  Button,
} from "reactstrap";

import PerfectScrollbar from "react-perfect-scrollbar";

import bg2 from "../../../assets/utils/images/dropdown-header/abstract2.jpg";
import bg3 from "../../../assets/utils/images/dropdown-header/abstract3.jpg";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MegaMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      popoverOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      popoverOpen: !this.state.popoverOpen,
    });
  }

  state = {};

  render() {
    return (
      <Fragment>
        <Nav className="header-megamenu">
          <NavItem>
            <NavLink href="#" onClick={this.toggle} id="PopoverMegaMenu">
              <i className="nav-link-icon pe-7s-gift"> </i>
              Mega Menu
              <FontAwesomeIcon className="ms-2 opacity-5" icon={faAngleDown} />
            </NavLink>
          </NavItem>
          <Popover className="rm-max-width" placement="bottom-start" fade={false} trigger="legacy"
            isOpen={this.state.popoverOpen} target="PopoverMegaMenu" toggle={this.toggle}>
            <div className="dropdown-mega-menu">
              <div className="grid-menu grid-menu-3col">
                <Row className="g-0">
                  <Col xl="4" sm="6">
                    <Nav vertical>
                      <NavItem className="nav-item-header">Overview</NavItem>
                      <NavItem>
                        <NavLink href="#">
                          <i className="nav-link-icon lnr-inbox"> </i>
                          <span>Contacts</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">
                          <i className="nav-link-icon lnr-book"> </i>
                          <span>Incidents</span>
                          <div className="ms-auto badge rounded-pill bg-danger">
                            5
                          </div>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">
                          <i className="nav-link-icon lnr-picture"> </i>
                          <span>Companies</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink disabled href="#">
                          <i className="nav-link-icon lnr-file-empty"> </i>
                          <span>Dashboards</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
                  <Col xl="4" sm="6">
                    <Nav vertical>
                      <NavItem className="nav-item-header">Favourites</NavItem>
                      <NavItem>
                        <NavLink href="#">Reports Conversions</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">
                          Quick Start
                          <div className="ms-auto badge bg-success">New</div>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">Users &amp; Groups</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">Proprieties</NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
                  <Col xl="4" sm="6">
                    <Nav vertical>
                      <NavItem className="nav-item-header">
                        Sales &amp; Marketing
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">Queues</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">Resource Groups</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">
                          Goal Metrics
                          <div className="ms-auto badge bg-warning">3</div>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#">Campaigns</NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
                </Row>
              </div>
            </div>
          </Popover>
          <UncontrolledButtonDropdown nav inNavbar>
            <DropdownToggle nav>
              <div className="badge rounded-pill bg-danger ms-0 me-2">4</div>
              Settings
              <FontAwesomeIcon className="ms-2 opacity-5" icon={faAngleDown} />
            </DropdownToggle>
            <DropdownMenu className="rm-pointers">
              <div className="dropdown-menu-header">
                <div className="dropdown-menu-header-inner bg-secondary">
                  <div className="menu-header-image opacity-5"
                    style={{
                      backgroundImage: "url(" + bg2 + ")",
                    }}>
                  </div>
                  <div className="menu-header-content">
                    <h5 className="menu-header-title">Overview</h5>
                    <h6 className="menu-header-subtitle">
                      Dropdown menus for everyone
                    </h6>
                  </div>
                </div>
              </div>
              <div className="scroll-area-xs"
                style={{
                  height: "150px",
                }}>
                <PerfectScrollbar>
                  <DropdownItem header>Key Figures</DropdownItem>
                  <DropdownItem>Service Calendar</DropdownItem>
                  <DropdownItem>Knowledge Base</DropdownItem>
                  <DropdownItem>Accounts</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Products</DropdownItem>
                  <DropdownItem>Rollup Queries</DropdownItem>
                </PerfectScrollbar>
              </div>
              <Nav vertical>
                <NavItem className="nav-item-divider" />
                <NavItem className="nav-item-btn">
                  <Button size="sm" className="btn-wide btn-shadow" color="danger">
                    Cancel
                  </Button>
                </NavItem>
              </Nav>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav>
              <i className="nav-link-icon pe-7s-settings"> </i>
              Projects
              <FontAwesomeIcon className="ms-2 opacity-5" icon={faAngleDown} />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-rounded dropdown-menu-lg rm-pointers">
              <div className="dropdown-menu-header">
                <div className="dropdown-menu-header-inner bg-success">
                  <div className="menu-header-image opacity-1"
                    style={{
                      backgroundImage: "url(" + bg3 + ")",
                    }}>
                  </div>
                  <div className="menu-header-content text-start">
                    <h5 className="menu-header-title">Overview</h5>
                    <h6 className="menu-header-subtitle">Unlimited options</h6>
                    <div className="menu-header-btn-pane">
                      <Button size="sm" color="dark" className="me-2"> Settings </Button>
                      <Button size="sm" className="btn-icon btn-icon-only" color="warning">
                        <i className="pe-7s-config btn-icon-wrapper"> </i>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <DropdownItem>
                <i className="dropdown-icon lnr-file-empty"> </i>
                Graphic Design
              </DropdownItem>
              <DropdownItem>
                <i className="dropdown-icon lnr-file-empty"> </i>
                App Development
              </DropdownItem>
              <DropdownItem>
                <i className="dropdown-icon lnr-file-empty"> </i>
                Icon Design
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <i className="dropdown-icon lnr-file-empty"> </i>
                Miscellaneous
              </DropdownItem>
              <DropdownItem>
                <i className="dropdown-icon lnr-file-empty"> </i>
                Frontend Dev
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Fragment>
    );
  }
}

export default MegaMenu;
