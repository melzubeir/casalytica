import React from "react";
import {
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { Progress } from "react-sweet-progress";
import CountUp from "react-countup";



export default function AppCard(props) {
  const { title, logo, featured, description, viewsTotal, viewsShare, ...rest } = props;

  return (
    <Card className="card-shadow-primary profile-responsive card-border mb-3">
    <div className="dropdown-menu-header">
      <div className="dropdown-menu-header-inner bg-focus">
        <div className="menu-header-image opacity-3"
          style={{
            backgroundImage: "url(" + featured + ")",
          }} />
        <div className="menu-header-content btn-pane-right">
          <div className="avatar-icon-wrapper me-2 avatar-icon-xl">
            <div className="avatar-icon rounded">
              <img src={logo} alt={title} />
            </div>
          </div>
          <div>
            <h5 className="menu-header-title">{title}</h5>
            <h6 className="menu-header-subtitle">
              {description}
            </h6>
          </div>
          <div className="menu-header-btn-pane">
          </div>
        </div>
      </div>
    </div>
    <ListGroup flush>
      <ListGroupItem className="bg-warm-flame">
        <div className="widget-content p-0">
          <div className="widget-content-wrapper">
            <div className="widget-content-left me-3">
              <div className="icon-wrapper m-0">
                <b className="text-primary">
                  <CountUp start={0} end={viewsTotal} separator="" decimals={0}
                    decimal="." prefix="" duration="5" />
                </b>
              </div>
            </div>
            <div className="widget-content-left">
              <div className="widget-heading text-dark opacity-7">
                Unique Views
              </div>
              <div className="widget-subheading opacity-10">
                <span className="pe-2">
                  <b className="text-dark">Total reported this week</b>
                </span>
              </div>
            </div>
            <div className="widget-content-right">
              <div className="icon-wrapper m-0">
                <div className="progress-circle-wrapper">
                  <Progress type="circle" percent={viewsShare} width="100%"
                    theme={{
                      active: {
                        trailColor: "rgba(255,255,255,.3)",
                        color: "#ffffff",
                      },
                    }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ListGroupItem>
      <ListGroupItem className="p-0">
        <div className="grid-menu grid-menu-2col">
          <Row className="g-0">
            <Col sm="6">
              <Button className="btn-icon-vertical btn-square btn-transition" outline color="link" >
                <i className="lnr-license btn-icon-wrapper btn-icon-lg mb-3">
                  {" "}
                </i>
                Report Card
              </Button>
            </Col>
            <Col sm="6">
              <Button className="btn-icon-vertical btn-square btn-transition" outline color="link">
                <i className="lnr-heart btn-icon-wrapper btn-icon-lg mb-3">
                  {" "}
                </i>
                Claim App
              </Button>
            </Col>
          </Row>
        </div>
      </ListGroupItem>
    </ListGroup>
  </Card>
);
}
