import React, { Fragment } from "react";
import {
  Row,
  Col,
  Container,
} from "reactstrap";
import CountUp from "react-countup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";


import { useSelector } from 'react-redux';

export default function ContentDashboard() {

  const desoPosts = useSelector(state => state.deso.desoPosts);


  console.log('DeSo Posts: ', desoPosts);

  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col sm="12" md="6" xl="4">
            <div className="card mb-3 widget-chart">
              <div className="widget-chart-content">
                <div className="icon-wrapper rounded">
                  <div className="icon-wrapper-bg bg-warning" />
                  <i className="lnr-users text-warning" />
                </div>
                <div className="widget-numbers">
                  <CountUp start={0} end={4} separator=" " decimals={0} decimal="."
                    prefix="" useEasing={false} suffix="" duration="1" />
                </div>
                <div className="widget-subheading fsize-1 pt-2 opacity-10 text-warning fw-bold">
                  Backers
                </div>
                <div className="widget-description opacity-8">
                  <span className="text-success pe-1">
                    <FontAwesomeIcon icon={faAngleUp} />
                    <span className="ps-1">14.1%</span>
                  </span>
                  up last 30 days
                </div>
              </div>
            </div>
          </Col>
          <Col sm="12" md="6" xl="4">
            <div className="card mb-3 widget-chart">
              <div className="widget-chart-content">
                <div className="icon-wrapper rounded">
                  <div className="icon-wrapper-bg bg-warning" />

                  <i className="lnr-rocket text-warning" />
                </div>
                <div className="widget-numbers">
                  <CountUp start={0} end={5} separator=" " decimals={0} decimal="."
                    prefix="$" useEasing={false} suffix="" duration="1" />
                </div>
                <div className="widget-subheading fsize-1 pt-2 opacity-10 text-warning fw-bold">
                  Coin Price
                </div>
                <div className="widget-description opacity-8">
                  <span className="text-success pe-1">
                    <FontAwesomeIcon icon={faAngleUp} />
                    <span className="ps-1">3.6%</span>
                  </span>
                  up last 30 days
                </div>
              </div>
            </div>

          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
