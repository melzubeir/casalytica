import React, { Fragment } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";


const UtilitiesAnimations = (props) => {
  return (
    <Fragment>
      <TransitionGroup>
        <CSSTransition component="div" classNames="TabsAnimation" appear={true}
          timeout={0} enter={false} exit={false}>
          <Row>
            <Col lg="12">
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>React Anime</CardTitle>
                  <Anime easing="easeOutElastic" duration={1000} direction="alternate" loop={true}
                    delay={(el, index) => index * 240} translateX="26rem" scale={[0.75, 0.9]}>
                    <div className="swatch-holder bg-primary text-white text-center">
                      1
                    </div>
                    <div className="swatch-holder bg-success text-white text-center">
                      2
                    </div>
                    <div className="swatch-holder bg-danger text-white text-center">
                      3
                    </div>
                  </Anime>
                  <div className="divider" />
                  <Anime opacity={[0, 1]} translateY={"1.5em"} delay={(e, i) => i * 1000} loop={true}>
                    <p>
                      Upon this, Daggoo, with either hand upon the gunwale to
                      steady his way, swiftly slid aft, and then erecting himself
                      volunteered his lofty shoulders for a pedestal.
                    </p>
                    <p>"Good a mast-head as any, sir. Will you mount?"</p>
                    <p>
                      "That I will, and thank ye very much, my fine fellow; only I
                      wish you fifty feet taller."
                    </p>
                  </Anime>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  );
};

export default UtilitiesAnimations;
