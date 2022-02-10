import React from "react";
import { Layout, Row, Col } from "antd";
const { Header } = Layout;
import logo from "../assets/images/logo.png";

class PageHeader extends React.Component {
  render() {
    return (
      <Layout>
        {" "}
        <Header
          style={{
            paddingTop: "0",
            paddingBottom: "0",
            background: "#1B394E"
          }}
        >
          <Row gutter={0}>
            <Col
              lg={3}
              md={24}
              id="banner"
              style={{
                cursor: "pointer",
                textAlign: "center"
              }}
              onClick={_ => (window.location = "/")}
            >
              <img
                src={logo}
                style={{ width: "100%", maxWidth: "150px", minWidth: "120px" }}
              ></img>
            </Col>
            <Col lg={2} md={0} sm={0} xs={0} className="headerNavigation">
              HOME
            </Col>
            <Col
              lg={6}
              xxl={3}
              md={0}
              sm={0}
              xs={0}
              className="headerNavigation"
            >
              ONLINE EXHIBITION
            </Col>
          </Row>
        </Header>
      </Layout>
    );
  }
}

export default PageHeader;
