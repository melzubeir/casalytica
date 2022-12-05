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

export default function CreatorDashboard() {

  const numBackers = useSelector(state => state.auth.numberOfHolders);
  const creatorCoinPrice = useSelector(state => state.auth.coinPriceDesoNanos) * 10e-9;


// "{\"isAuthenticated\":true,\"publicKey\":\"BC1YLgztkLMqTbLGEWycY5hTrCWxDU6QiY4AzjGZ5F3kR2SpSD23Zub\",\"accessLevel\":4,\"loginMethod\":\"DESO\",\"jwt\":\"eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzAxMzI0NTMsImV4cCI6MTY3MDEzMzA1M30.5vWhsjdFWcmjmI5cyuAScHnTycsapJr38BsUzs71ot3ZhNZE6eoY7Y7Wlc6OXrq0WNuYWscvADFPM9d4sjOsNQ\",\"username\":\"elzubeir\",\"largeProfilePicURL\":\"https://images.deso.org/e4e2675a20530a6a2ede4d78fb31560152468acfbd6229d2d42aabdd150887bd.webp\",\"isVerified\":false,\"isHidden\":false,\"isReserved\":false,\"description\":\"man in the arena\\n\\ndeso projects: @casalytica - analytics for on-chain content\\nblog: https://www.pandamistake.com\\ngithub: https://github.com/melzubeir\",\"DAOPublicKeysPurchased\":\"BC1YLhRTKsucF1tEkCoDJXzdAsATiDRtysNcQsMnCrcFzsHmTiVGFXH,BC1YLhZzLUK3bC59sguWuazQpaT4611cr12VXQig4rgiThRDT4Wiq8R,BC1YLj3zNA7hRAqBVkvsTeqw7oi4H6ogKiAFL1VXhZy6pYeZcZ6TDRY\",\"FeaturedImageURL\":\"https://images.deso.org/c93f18f42b904766e544004884a0a04a1a90193b486f8057de6dcb8c60dc8d11.webp\",\"blogSlugMap\":\"{\\\"social-apps-need-to-adopt-web3-yesterday\\\":\\\"873e8c356cc2927b791e86d59a86598ac98594ee9ce74d0ebc34be4202a9a345\\\",\\\"why-deso-will-never-solve-those-problems\\\":\\\"2273a44d49637b518f12475b013b00fa97e1310a118a0caaa09974f06efb434b\\\",\\\"how-do-i-get-started-with-casalytica\\\":\\\"563c53024377553fdc7c0a21dc6d8597472ace39d44319f39b40ef7f80cf7695\\\"}\",\"circleIt\":\"{\\\"Mods\\\":\\\"\\\",\\\"NFTRoyality\\\":\\\"\\\",\\\"VerifiedUsers\\\":\\\"\\\",\\\"bannedUsers\\\":\\\"\\\",\\\"isCircle\\\":\\\"true\\\",\\\"rules\\\":\\\"\\\"}\",\"NFTProfilePicturePostHashHex\":\"b562444f870580ade36a8be7114627265555424a465d35d6979fc7e5c3a1bd3f\",\"PinnedPostHashHex\":\"73672375c09076aa2ce90a9b9125a1953efad7aad004a11cbfd9726211c959df\",
// \"numberOfHolders\":4,\"coinsInCirculationNanos\":20014238391,\"daoCoinsInCirculationNanos\":\"0xb2d05e00\",\"desoBalanceNanos\":28749839282}"


  console.log('Creator price: ', creatorCoinPrice);

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
                  <CountUp start={0} end={numBackers} separator=" " decimals={0} decimal="."
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
                  <CountUp start={0} end={creatorCoinPrice} separator=" " decimals={0} decimal="."
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
