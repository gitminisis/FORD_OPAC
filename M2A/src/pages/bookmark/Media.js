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

import Image from "./Image";
import Video from "./Video";
import Audio from "./Audio";
import Text from "./Text";
import { FaImage, FaVolumeUp, FaPlayCircle, FaFileAlt } from "react-icons/fa";
import { deleteItem, getAll, removeAll } from "../../services/savedBag";
class Media extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: getAll("Image"),
      audio: getAll("Audio"),
      video: getAll("Moving Image"),
      text: getAll("Textual")
    };
  }
  remove = (url, type) => {
    deleteItem(url, type);
    this.setState({
      image: getAll("Image"),
      audio: getAll("Audio"),
      video: getAll("Moving Image"),
      text: getAll("Textual")
    });
  };
  copy = _ => {};
  render() {
    let image = getAll("Image");

    let audio = getAll("Audio");

    let video = getAll("Moving Image");

    let text = getAll("Textual");
    return (
      <div id="mediaTabs">
        <h3>Additional Clearance</h3>
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
              <Image
                item={this.state.image}
                remove={this.remove}
                copy={this.copy}
              ></Image>
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
              <Video
                item={this.state.video}
                remove={this.remove}
                copy={this.copy}
              />
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
              <Audio
                item={this.state.audio}
                remove={this.remove}
                copy={this.copy}
              />
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
              <Text
                item={this.state.text}
                remove={this.remove}
                copy={this.copy}
              />
            </Row>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Media;
