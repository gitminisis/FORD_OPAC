import React from "react";
import { Tabs, Icon, Col, Row, Card, Tooltip, message, Empty } from "antd";
import { save } from "../../services/savedBag";
import audio from "../../assets/audio/audio.mp3";
class Audio extends React.Component {
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
            <Tooltip title="Download">
            <Button
               disabled={item.rights !== "Yes"}
              onClick={_ => {
                downloadMedia(item.low_res);
              }}
            >
              <Icon type="download" /> Low
            </Button>
          </Tooltip>,
          <Tooltip title="Download">
            <Button
              disabled={item.rights !== "Yes"}
              onClick={_ => {
                downloadMedia(item.high_res);
              }}
            >
              <Icon type="download" /> High
            </Button>
          </Tooltip>,
          <Tooltip title="Additional Clearance">
            <Button
              disabled={!item.rights === "Additional Clearance"}
              onClick={_ => {
                let res = save(item.low_res, item.type);
                if (res) {
                  message.success("This asset was succesfully saved !");
                } else {
                  message.warning("This asset has already been saved");
                }
              }}
            >
              <Icon type="save" /> Save
            </Button>
          </Tooltip>
          ]}
        >
          <div className="detailVideoContainer">
            {" "}
            <Icon
              type="file-text"
              style={{
                fontSize: "6rem",
                marginBottom: "20px",
                marginTop: "20px"
              }}
            />
          </div>
        </Card>
      </Col>
    ));
  }
}

export default Audio;
