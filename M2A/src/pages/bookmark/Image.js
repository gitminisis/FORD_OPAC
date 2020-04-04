import React from "react";
import {
  Tabs,
  Icon,
  Col,
  Row,
  Card,
  Tooltip,
  message,
  Empty,
  Button
} from "antd";
import { save } from "../../services/savedBag";

class Image extends React.Component {
  render() {
    let data = this.props.item;
    if (data.length === 0) {
      return <Empty className="noMedia" />;
    }
    return data.map(item => (
      <Col xl={8} lg={12} md={12} sm={24}>
        <Card
          bordered
          className="detailCard"
          hoverable
          style={{
            width: "100%",
            marginTop: "40px",

            textAlign: "center"
          }}
          actions={[
            <Tooltip title="Remove">
              <Button onClick={_ => this.props.remove(item,"Image")}>
                {" "}
                <Icon type="close-circle" /> Remove
              </Button>
              
            </Tooltip>,
            <Tooltip title="Copy URL">
              <Button onClick={_ => this.props.copy(item)}>
                <Icon type="link" /> Copy
              </Button>
            </Tooltip>
          ]}
        >
          <div
            className="detailImageContainer"
            style={{
              backgroundImage: `url(${item})`
            }}
          ></div>
        </Card>
      </Col>
    ));
  }
}

export default Image;
