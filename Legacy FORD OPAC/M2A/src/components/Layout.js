import React from "react";
import Footer from "./Footer";
import Header from "./Header";

import { Layout, Row, Col, Card, Button, Menu, Icon } from "antd";
const { Sider } = Layout;
import { BackTop } from "antd";
import SearchBar from "./SearchBar";
import PageDrawer from "./PageDrawer";

class PageLayout extends React.Component {
  render() {
    return (
      <Layout>
        <Layout>
          <Header />
          <PageDrawer />
          <Row id="layoutMainRow">
            <Col span={24}>
              {" "}
              <Row justify="center" align="middle">
                <Col
                  lg={{ offset: 6, span: 12 }}
                  md={24}
                  style={{
                    paddingTop: "30px",

                    paddingBottom: "30px"
                  }}
                >
                  {" "}
                  <SearchBar />
                </Col>
              </Row>{" "}
              <Row justify="center" align="middle">
                <Col span={24}>{this.props.children}</Col>
              </Row>
              <BackTop className="backTop">
                <Icon type="caret-up" />
              </BackTop>
            </Col>
          </Row>

          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default PageLayout;
