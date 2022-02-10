import React from "react";
import { Col, Card } from "antd";
const { Meta } = Card;
import noImage from "../../assets/images/no-image.png";
import FordCar from "../../assets/images/fordCar.jpg";
import { FiCameraOff } from "react-icons/fi";
import mustang from "../../assets/images/mustang.jpg";
class GridView extends React.Component {
  render() {
    return new Array(12).fill("").map((item, index) => (
      <Col lg={8} md={12} xs={24}>
        <Card
          bordered
          onClick={_ => {}}
          className="homeCard"
          hoverable
          style={{
            width: "100%",
            marginTop: "2px",
            height: "auto",
            textAlign: "center"
          }}
        >
          <div
            className="homeImageContainer"
            style={{
              backgroundImage: `url(${index % 2 === 0 ? mustang : mustang})`
            }}
          ></div>
          <Meta title="FORD Mustang" description="SEDAN COLLECTION" />
        </Card>
      </Col>
    ));
  }
}

export default GridView;
