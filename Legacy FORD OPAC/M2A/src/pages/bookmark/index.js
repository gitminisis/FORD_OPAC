import React from "react";
import PageLayout from "../../components/Layout";
import { Row, Col, Card } from "antd";
import Media from "./Media";
class Bookmark extends React.Component {
  render() {
    return (
      <PageLayout>
        <Row>
          {" "}
          <Col lg={{ span: 18, offset: 3 }} md={24}>
            <Card style={{ width: "100%" }}>
              <Row gutter={16}>
                <Col span={24}>
                  <Media />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </PageLayout>
    );
  }
}

export default Bookmark;
