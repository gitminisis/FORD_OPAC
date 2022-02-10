import React from "react";
import { Row, Col, Card, List, Avatar, Icon } from "antd";
const { Meta } = Card;
import noImage from "../../assets/images/no-image.png";
import FordCar from "../../assets/images/fordCar.jpg";
import { FiCameraOff } from "react-icons/fi";
import mustang from "../../assets/images/mustang.jpg";
const gridStyle = {
  width: "50%",
  textAlign: "center"
};
class ListView extends React.Component {
  render() {
    return (
      <List
        itemLayout="vertical"
        size="large"
        dataSource={new Array(12).fill("")}
        renderItem={(item, index) => (
          <Row className="listRow" gutter={0}>
            <Col lg={5} md={10} className="listRowMediaCol">
              {" "}
              <Row>
                {" "}
                <Col span={24} className="summaryListImageContainer">
                  <img src={mustang} />
                </Col>
              </Row>
            </Col>
            <Col lg={19} md={14}>
              {" "}
              <Row>
                <Col lg={16} md={24}>
                  {" "}
                  <List.Item>
                    <List.Item.Meta
                      title="FORD Mustang"
                      description="SEDAN COLLECTION"
                    />
                    <p>
                      {" "}
                      The Ford Mustang is an American car manufactured by Ford.
                      It was originally conceived by Lee Iacocca. The Mustang
                      debuted in 1964 with a price of $2,368, ...
                    </p>
                  </List.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      />
    );
  }
}

export default ListView;
