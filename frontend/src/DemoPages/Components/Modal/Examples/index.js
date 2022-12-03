import React, { Fragment } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";


import ModalExample from "./Modal";
import ModalBackdrop from "./ModalBackdrop";
import ModalCustomCloseButton from "./ModalCustomCloseButton";
import ModalCustomCloseIcon from "./ModalCustomCloseIcon";
import ModalCustomTimeout from "./ModalCustomTimeout";
import ModalExternal from "./ModalExternal";
import ModalFadeless from "./ModalFadeless";
import ModalNested from "./ModalNested";

class ModalsExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      animation: "zoom",
    };
  }

  show(animation) {
    this.setState({
      animation,
      visible: true,
    });
  }

  hide() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition component="div" classNames="TabsAnimation" appear={true}
            timeout={1500} enter={false} exit={false}>
            <Row className="text-center">
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Bootstrap 5 Modals</CardTitle>
                    <ModalExample />
                    <ModalCustomCloseButton />
                    <ModalCustomCloseIcon />
                    <ModalCustomTimeout />
                    <ModalExternal />
                    <ModalFadeless />
                    <ModalNested />
                    <div className="divider" />
                    <ModalBackdrop />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}

export default ModalsExample;
