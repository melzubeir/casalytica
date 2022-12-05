import React, { Component, Fragment } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import PageTitle from "../../Layout/AppMain/PageTitle";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";

// Examples
import CreatorDashboard from "./CreatorDashboard";
import ContentDashboard from "./ContentDashboard";
import AppDashboard from "./AppDashboard";

export default class AnalyticsDashboard extends Component {
  render() {
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition component="div" classNames="TabsAnimation" appear={true}
            timeout={1500} enter={false} exit={false}>
            <div>
              <PageTitle heading="Dashboard"
                subheading="This is your casalytica dashboard, proceed with curiosity."
                icon="pe-7s-car icon-gradient bg-mean-fruit"/>
              <Tabs defaultActiveKey="1" renderTabBar={() => <ScrollableInkTabBar />} renderTabContent={() => <TabContent />}>
                <TabPane tab="App" key="1">
                  <AppDashboard />
                </TabPane>
                <TabPane tab="Content" key="2">
                  <ContentDashboard />
                </TabPane>
                <TabPane tab="Creator" key="3">
                  <CreatorDashboard />
                </TabPane>
              </Tabs>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
