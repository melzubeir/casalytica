import React, { Component, Fragment } from "react";

import {
  Row,
  Col,
  ListGroupItem,
  ListGroup,
  Button,
  CardTitle,
  Input,
} from "reactstrap";
import {
  Sparklines,
  SparklinesCurve,
  SparklinesReferenceLine,
  SparklinesSpots,
} from "react-sparklines";


import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import {
  faTrashAlt,
  faCheck,
  faFilePdf,
  faFileExcel,
  faFileArchive,
  faFileAlt,
  faCloudDownloadAlt,
} from "@fortawesome/free-solid-svg-icons";

import avatar1 from "../../../../assets/utils/images/avatars/1.jpg";
import avatar2 from "../../../../assets/utils/images/avatars/2.jpg";
import avatar3 from "../../../../assets/utils/images/avatars/3.jpg";
import avatar4 from "../../../../assets/utils/images/avatars/4.jpg";
import avatar5 from "../../../../assets/utils/images/avatars/5.jpg";
import avatar6 from "../../../../assets/utils/images/avatars/8.jpg";
import avatar7 from "../../../../assets/utils/images/avatars/9.jpg";
import avatar8 from "../../../../assets/utils/images/avatars/10.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function boxMullerRandom() {
  let phase = true,
    x1 = 0.0,
    x2 = 0.0,
    w = 0.0;

  return (function() {
    if (phase) {
      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w = x1 * x1 + x2 * x2;
      } while (w >= 1.0);

      w = Math.sqrt((-2.0 * Math.log(w)) / w);
      return x1 * w;
    } else {
      return x2 * w;
    }
  })();
}

function randomData(n = 30) {
  return Array.apply(0, Array(n)).map(boxMullerRandom);
}

const sampleData = randomData(30);

class DrawerBigExample extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  render() {
    return (
      <Fragment>
        <h3 className="drawer-heading">Servers Status</h3>
        <div className="drawer-section">
          <Row>
            <Col>
              <div className="progress-box">
                <h4>Server Load 1</h4>
              </div>
            </Col>
            <Col>
              <div className="progress-box">
                <h4>Server Load 2</h4>
              </div>
            </Col>
            <Col>
              <div className="progress-box">
                <h4>Server Load 3</h4>
              </div>
            </Col>
          </Row>
          <div className="divider" />
          <div className="mt-3">
            <CardTitle className="text-center">Live Statistics</CardTitle>
            <Sparklines data={sampleData} height={44} limit={20} margin={6}>
              <SparklinesCurve length={20}
                style={{
                  strokeWidth: 1,
                  stroke: "#545cd8",
                  fill: "#ffffff",
                }}/>
              <SparklinesSpots size={3}
                style={{
                  stroke: "#3ac47d",
                  strokeWidth: 2,
                  fill: "#ffffff",
                }}/>
              <SparklinesReferenceLine height={22} type="avg" />
            </Sparklines>
            <Row>
              <Col>
                <div className="widget-chart p-0">
                  <div className="widget-chart-content">
                    <div className="widget-numbers text-warning fsize-3">
                      43
                    </div>
                    <div className="widget-subheading pt-1">Packages</div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="widget-chart p-0">
                  <div className="widget-chart-content">
                    <div className="widget-numbers text-danger fsize-3">65</div>
                    <div className="widget-subheading pt-1">Dropped</div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="widget-chart p-0">
                  <div className="widget-chart-content">
                    <div className="widget-numbers text-success fsize-3">
                      18
                    </div>
                    <div className="widget-subheading pt-1">Invalid</div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="divider" />
            <div className="text-center mt-2 d-block">
              <Button outline className="me-2 border-0 btn-transition" color="danger">
                Escalate Issue
              </Button>
              <Button outline className="border-0 btn-transition" color="success">
                Support Center
              </Button>
            </div>
          </div>
        </div>
        <h3 className="drawer-heading">File Transfers</h3>
        <div className="drawer-section p-0">
          <div className="files-box">
            <ListGroup flush>
              <ListGroupItem className="pt-2 pb-2 pe-2">
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left opacity-6 fsize-2 me-3 text-primary center-elem">
                      <FontAwesomeIcon icon={faFileAlt} />
                    </div>
                    <div className="widget-content-left">
                      <div className="widget-heading fw-normal">
                        TPSReport.docx
                      </div>
                    </div>
                    <div className="widget-content-right widget-content-actions">
                      <Button size="sm" className="btn-icon btn-icon-only" color="link">
                        <FontAwesomeIcon icon={faCloudDownloadAlt} />
                      </Button>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem className="pt-2 pb-2 pe-2">
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left opacity-6 fsize-2 me-3 text-warning center-elem">
                      <FontAwesomeIcon icon={faFileArchive} />
                    </div>
                    <div className="widget-content-left">
                      <div className="widget-heading fw-normal">
                        Latest_photos.zip
                      </div>
                    </div>
                    <div className="widget-content-right widget-content-actions">
                      <Button size="sm" className="btn-icon btn-icon-only" color="link">
                        <FontAwesomeIcon icon={faCloudDownloadAlt} />
                      </Button>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem className="pt-2 pb-2 pe-2">
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left opacity-6 fsize-2 me-3 text-danger center-elem">
                      <FontAwesomeIcon icon={faFilePdf} />
                    </div>
                    <div className="widget-content-left">
                      <div className="widget-heading fw-normal">
                        Annual Revenue.pdf
                      </div>
                    </div>
                    <div className="widget-content-right widget-content-actions">
                      <Button size="sm" className="btn-icon btn-icon-only" color="link">
                        <FontAwesomeIcon icon={faCloudDownloadAlt} />
                      </Button>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem className="pt-2 pb-2 pe-2">
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left opacity-6 fsize-2 me-3 text-success center-elem">
                      <FontAwesomeIcon icon={faFileExcel} />
                    </div>
                    <div className="widget-content-left">
                      <div className="widget-heading fw-normal">
                        Analytics_GrowthReport.xls
                      </div>
                    </div>
                    <div className="widget-content-right widget-content-actions">
                      <Button size="sm" className="btn-icon btn-icon-only" color="link">
                        <FontAwesomeIcon icon={faCloudDownloadAlt} />
                      </Button>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
            </ListGroup>
          </div>
        </div>
        <h3 className="drawer-heading">Tasks in Progress</h3>
        <div className="drawer-section p-0">
          <div className="todo-box">
            <ListGroup className="todo-list-wrapper" flush>
              <ListGroupItem>
                <div className="todo-indicator bg-warning" />
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left me-2">
                      <Input type="checkbox" id="exampleCheckbox12" label="&nbsp;"/>
                    </div>
                    <div className="widget-content-left">
                      <div className="widget-heading">
                        Wash the car
                        <div className="badge bg-danger ms-2">Rejected</div>
                      </div>
                      <div className="widget-subheading">
                        <i>Written by Bob</i>
                      </div>
                    </div>
                    <div className="widget-content-right widget-content-actions">
                      <Button className="border-0 btn-transition" outline color="success">
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                      <Button className="border-0 btn-transition" outline color="danger">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div className="todo-indicator bg-danger" />
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left me-2">
                      <Input type="checkbox" id="exampleCheckbox1" label="&nbsp;"/>
                    </div>
                    <div className="widget-content-left">
                      <div className="widget-heading">
                        Build more components
                      </div>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div className="todo-indicator bg-primary" />
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left me-2">
                      <Input type="checkbox" id="exampleCheckbox4" label="&nbsp;"/>
                    </div>
                    <div className="widget-content-left flex2">
                      <div className="widget-heading">
                        Badge on the right task
                      </div>
                      <div className="widget-subheading">
                        This task has show on hover actions!
                      </div>
                    </div>
                    <div className="widget-content-right widget-content-actions">
                      <Button className="border-0 btn-transition" outline color="success">
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                    </div>
                    <div className="widget-content-right ms-3">
                      <div className="badge rounded-pill bg-success">
                        Latest Task
                      </div>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div className="todo-indicator bg-info" />
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left me-2">
                      <Input type="checkbox" id="exampleCheckbox2" label="&nbsp;"/>
                    </div>
                    <div className="widget-content-left">
                      <div className="widget-heading">Go grocery shopping</div>
                    </div>
                    <div className="widget-content-right widget-content-actions">
                      <Button className="border-0 btn-transition" outline color="success">
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                      <Button className="border-0 btn-transition" outline color="danger">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div className="todo-indicator bg-success" />
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left me-2">
                      <Input type="checkbox" id="exampleCheckbox3" label="&nbsp;"/>
                    </div>
                    <div className="widget-content-left flex2">
                      <div className="widget-heading">Development Task</div>
                      <div className="widget-subheading">
                        Finish React ToDo List App
                      </div>
                    </div>
                    <div className="widget-content-right">
                      <div className="badge bg-warning me-2">69</div>
                    </div>
                    <div className="widget-content-right">
                      <Button className="border-0 btn-transition" outline color="success">
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                      <Button className="border-0 btn-transition" outline color="danger">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
            </ListGroup>
          </div>
        </div>
        <h3 className="drawer-heading">Urgent Notifications</h3>
        <div className="drawer-section">
          <div className="notifications-box">
            <VerticalTimeline animate={false} layout="1-column" className="vertical-time-simple vertical-without-time">
              <VerticalTimelineElement className="vertical-timeline-item dot-danger">
                <h4 className="timeline-title">All Hands Meeting</h4>
              </VerticalTimelineElement>
              <VerticalTimelineElement className="vertical-timeline-item dot-warning">
                <p>
                  Yet another one, at{" "}
                  <span className="text-success">15:00 PM</span>
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement className="vertical-timeline-item dot-success">
                <h4 className="timeline-title">
                  Build the production release
                  <div className="badge bg-danger ms-2">NEW</div>
                </h4>
              </VerticalTimelineElement>
              <VerticalTimelineElement className="vertical-timeline-item dot-primary">
                <h4 className="timeline-title">
                  Something not important
                  <div className="avatar-wrapper mt-2 avatar-wrapper-overlap">
                    <div className="avatar-icon-wrapper avatar-icon-sm">
                      <div className="avatar-icon">
                        <img src={avatar1} alt="" />
                      </div>
                    </div>
                    <div className="avatar-icon-wrapper avatar-icon-sm">
                      <div className="avatar-icon">
                        <img src={avatar2} alt="" />
                      </div>
                    </div>
                    <div className="avatar-icon-wrapper avatar-icon-sm">
                      <div className="avatar-icon">
                        <img src={avatar3} alt="" />
                      </div>
                    </div>
                    <div className="avatar-icon-wrapper avatar-icon-sm">
                      <div className="avatar-icon">
                        <img src={avatar4} alt="" />
                      </div>
                    </div>
                    <div className="avatar-icon-wrapper avatar-icon-sm">
                      <div className="avatar-icon">
                        <img src={avatar5} alt="" />
                      </div>
                    </div>
                    <div className="avatar-icon-wrapper avatar-icon-sm">
                      <div className="avatar-icon">
                        <img src={avatar6} alt="" />
                      </div>
                    </div>
                    <div className="avatar-icon-wrapper avatar-icon-sm">
                      <div className="avatar-icon">
                        <img src={avatar7} alt="" />
                      </div>
                    </div>
                    <div className="avatar-icon-wrapper avatar-icon-sm">
                      <div className="avatar-icon">
                        <img src={avatar8} alt="" />
                      </div>
                    </div>
                    <div className="avatar-icon-wrapper avatar-icon-sm avatar-icon-add">
                      <div className="avatar-icon">
                        <i>+</i>
                      </div>
                    </div>
                  </div>
                </h4>
              </VerticalTimelineElement>
              <VerticalTimelineElement className="vertical-timeline-item dot-info">
                <h4 className="timeline-title">This dot has an info state</h4>
              </VerticalTimelineElement>
              <VerticalTimelineElement className="vertical-timeline-item dot-dark">
                <h4 className="timeline-title">This dot has a dark state</h4>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default DrawerBigExample;
