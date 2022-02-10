import React from "react";
import { Row, Col, Card, List, Avatar, Icon, Button } from "antd";
const { Meta } = Card;
import noImage from "../../assets/images/no-image.png";
import FordCar from "../../assets/images/fordCar.jpg";
import { FiCameraOff } from "react-icons/fi";
import { FaImage, FaVolumeUp, FaPlayCircle, FaFileAlt } from "react-icons/fa";
import { extractData, getFirstImage } from "../../services/m2a";
const gridStyle = {
  width: "50%",
  textAlign: "center"
};
class ListView extends React.Component {
  render() {
    let { data } = this.props;
    let dataJson = data.item.map(item => extractData(item));
    return (
      <List
        itemLayout="vertical"
        size="large"
        dataSource={dataJson}
        footer={
          <div id="listViewFooter" style={{ textAlign: "center" }}>
            <Button.Group>
              <Button
                type="primary"
                disabled={!data.prev_page}
                href={data.prev_page ? data.prev_page.a._href : "#"}
              >
                <Icon type="left" />
                Prev.
              </Button>
              <Button
                type="primary"
                disabled={!data.next_page}
                href={data.next_page ? data.next_page.a._href : "#"}
              >
                Next
                <Icon type="right" />
              </Button>
            </Button.Group>
          </div>
        }
        renderItem={(item, index) => (
          <Row className="listRow" gutter={8}>
            <Col lg={5} md={10} className="listRowMediaCol">
              <Row>
                <Col span={24} className="summaryListImageContainer">
                  <img
                    src={getFirstImage(item) ? getFirstImage(item) : noImage}
                  />
                </Col>
                <Col span={24} className="summaryMedia">
                  <Card
                    className="summaryMediaCard"
                    actions={[
                      <span className={getFirstImage(item) ? "hasMedia" : ""}>
                        <FaImage />
                      </span>,
                      <span>
                        <FaVolumeUp />
                      </span>,
                      <span>
                        <FaPlayCircle />
                      </span>,
                      <span>
                        <FaFileAlt />
                      </span>
                    ]}
                  ></Card>
                </Col>
              </Row>
            </Col>
            <Col lg={19} md={14}>
              {" "}
              <Row>
                <Col lg={16} md={24}>
                  {" "}
                  <List.Item key={item.data.item_sisn.value}>
                    <List.Item.Meta
                      title={
                        <a href={item.item_link}>
                          <strong>{item.data.item_title.value}</strong>
                        </a>
                      }
                      description={`Level: ${item.data.item_level_desc.value}`}
                    />
                    <p> {`Reference Code: ${item.data.item_refd.value}`}</p>
                    {item.data.item_location.value.map((e, i) => {
                      if (i === 0) {
                        return <p>{`Location: ${e}`}</p>;
                      }
                      return <p>{e}</p>;
                    })}
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
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export default ListView;
