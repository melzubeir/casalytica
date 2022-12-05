import React, { Fragment } from "react";
import {
  Row,
  Col,
  Container,
} from "reactstrap";


import { useSelector } from 'react-redux';

import AppCard from '../../Layout/AppCard';

import bg from "../../assets/images/logos/bg.jpg";
import desoLogo from "../../assets/images/logos/deso.svg"

import videsoLogo from "../../assets/images/logos/videso.jpg";
import videsoBg from "../../assets/images/logos/videso_featured.jpg";
import desofyLogo from "../../assets/images/logos/desofy.jpg";
import desofyBg from "../../assets/images/logos/desofy_featured.jpg";
import squadzLogo from "../../assets/images/logos/squadz.png";
import circleitLogo from "../../assets/images/logos/circleit.svg";
import tijnclubLogo from "../../assets/images/logos/tijnclub.png";

export default function AppDashboard() {

  const desoPosts = useSelector(state => state.deso.desoPosts);
  const avatar = useSelector(state => state.auth.largeProfilePicURL);


  console.log('DeSo Posts: ', desoPosts);

  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col md="6" lg="4">
            <AppCard
              title="Videso"
              logo={videsoLogo}
              featured={videsoBg}
              description="Videso is a decentralized video-sharing social media platform built with DeSo."
              viewsTotal={400}
              viewsShare={12}
            />
          </Col>
          <Col md="6" lg="4">
            <AppCard
              title="Desofy"
              logo={desofyLogo}
              featured={desofyBg}
              description="The first decentralized social network mobile app powered by DeSo"
              viewsTotal={3400}
              viewsShare={42}
            />
          </Col>
          <Col md="6" lg="4">
            <AppCard
              title="Circleit"
              logo={circleitLogo}
              featured={bg}
              description="Your Community on your terms. A new place for building community."
              viewsTotal={92}
              viewsShare={2}
            />
          </Col>
          <Col md="6" lg="4">
            <AppCard
              title="tijn club"
              logo={tijnclubLogo}
              featured={bg}
              description="A diamond frontend fork run on a node operated by tijn."
              viewsTotal={42}
              viewsShare={1}
            />
          </Col>

          <Col md="6" lg="4">
            <AppCard
              title="Squadz"
              logo={squadzLogo}
              featured={bg}
              description="Build an engaged community by rewarding micro-actions all in one platform"
              viewsTotal={42}
              viewsShare={1}
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
