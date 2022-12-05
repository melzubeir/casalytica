import React, { Fragment } from "react";
import {
  Row,
  Col,
  Button,
  Container,
} from "reactstrap";

import CountUp from "react-countup";

import { IoIosAnalytics } from "react-icons/io";

import {
  ResponsiveContainer,
} from "recharts";

import {
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CreatorDashboard() {

  const numBackers = 2;

  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col sm="12" md="6" xl="4">
            <div className="card mb-3 widget-chart">
              <div className="widget-chart-content">
                <div className="icon-wrapper rounded">
                  <div className="icon-wrapper-bg bg-warning" />
                  <i className="lnr-laptop-phone text-warning" />
                </div>
                <div className="widget-numbers">
                  <CountUp start={0} end={numBackers} separator="" decimals={0} decimal="."
                    prefix="" useEasing={false} suffix="" duration="10" />
                </div>
                <div className="widget-subheading fsize-1 pt-2 opacity-10 text-warning fw-bold">
                  Backers
                </div>
                <div className="widget-description opacity-8">
                  <span className="text-danger pe-1">
                    <FontAwesomeIcon icon={faAngleDown} />
                    <span className="ps-1">54.1%</span>
                  </span>
                  down last 30 days
                </div>
              </div>
              <div className="widget-chart-wrapper">
                <ResponsiveContainer width="100%" aspect={3.0 / 1.0}>
                </ResponsiveContainer>
              </div>
            </div>
          </Col>
        </Row>
        <div className="text-center mbg-3">
          <Button color="focus" className="btn-wide btn-pill btn-shadow fsize-1" size="lg">
            <span className="me-2 opacity-7">
              {/* <Ionicon color="#ffffff" icon="ios-analytics-outline" beat={true}/> */}
              <IoIosAnalytics color="#ffffff" />
            </span>
            View Complete Report
          </Button>
        </div>

      </Container>
    </Fragment>
  );

}


export default CreatorDashboard;
