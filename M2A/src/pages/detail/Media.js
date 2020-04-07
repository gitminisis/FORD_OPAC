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
const { Meta } = Card;
const { TabPane } = Tabs;
import { save } from "../../services/savedBag";
import Image from "./Image";
import Video from "./Video";
import Audio from "./Audio";
import Text from "./Text";
import { extractData } from "../../services/m2a";
import noImage from "../../assets/images/no-image.png";
import { FaImage, FaVolumeUp, FaPlayCircle, FaFileAlt } from "react-icons/fa";
class Media extends React.Component {
  render() {
    let rawData = this.props.data;
    let data = extractData(rawData.item);

    let image = data.media.filter(e => e.type === "Image");

    let audio = data.media.filter(e => e.type === "Audio");

    let video = data.media.filter(e => e.type === "Moving Image");

    let text = data.media.filter(e => e.type === "Textual");
    return (
      <div id="mediaTabs">
        <hr />
        <h3>Media</h3>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <FaImage />
              </span>
            }
            key="1"
          >
            <Row gutter={16}>
              <Image item={image}></Image>
            </Row>
          </TabPane>
          <TabPane
            tab={
              <span>
                <FaPlayCircle />
              </span>
            }
            key="2"
          >
            <Row gutter={16}>
              <Video item={video} />
            </Row>
          </TabPane>
          <TabPane
            tab={
              <span>
                <FaVolumeUp />
              </span>
            }
            key="3"
          >
            {" "}
            <Row gutter={16}>
              <Audio item={audio} />
            </Row>
          </TabPane>
          <TabPane
            tab={
              <span>
                <FaFileAlt />
              </span>
            }
            key="4"
          >
            {" "}
            <Row gutter={16}>
              <Text item={text} />
            </Row>
          </TabPane>
        </Tabs>
        <Button
          type="primary"
          href="/bookmark.html"
          style={{ margin: "0 auto" }}
        >
          View Additional Clearance
        </Button>
      </div>
    );
  }
}

export default Media;
