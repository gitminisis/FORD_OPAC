import React from "react";
import { Col, Card } from "antd";
const { Meta } = Card;
import noImage from "../../assets/images/no-image.png";
import FordCar from "../../assets/images/fordCar.jpg";
import { FiCameraOff } from "react-icons/fi";
import { extractData, getFirstImage } from "../../services/m2a";
class GridView extends React.Component {
  render() {
    let { data } = this.props;
    let dataJson = data.item.map(item => extractData(item));
    console.log(dataJson);

    return dataJson.map((item, index) => (
      <Col lg={8} md={12} xs={24}>
        <Card
          bordered
          onClick={_ => (window.location = item.item_link)}
          className="summaryCard"
          hoverable
          style={{
            width: "100%",
            marginTop: "2px",
            height: "auto",
            textAlign: "center"
          }}
        >
          <div
            className="summaryImageContainer"
            style={{
              backgroundImage: `url(${
                getFirstImage(item) ? getFirstImage(item) : noImage
              })`
            }}
          ></div>
          <Meta
            title={item.data.item_title.value}
            description={item.data.item_level_desc.value}
          />
        </Card>
      </Col>
    ));
  }
}

export default GridView;
