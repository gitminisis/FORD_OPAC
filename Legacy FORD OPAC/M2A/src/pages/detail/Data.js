import React from "react";
import { extractData, DETAIL_DATA_FIELD } from "../../services/m2a";

import { Descriptions } from "antd";

class Data extends React.Component {
  render() {
    let rawData = this.props.data;
    let data = extractData(rawData.item);
    console.log(data);
    return (
      <Descriptions
        id="dataDescriptions"
        title={data.data.item_title.value}
        bordered
        column={1}
      >
        {DETAIL_DATA_FIELD.map(field => {
          let item = data.data[field];
          if (item.value) {
            if (item.type === "string") {
              return (
                <Descriptions.Item label={item.title}>
                  {item.value}
                </Descriptions.Item>
              );
            } else if ((item.type = "array") && item.value.length > 0) {
              return (
                <Descriptions.Item label={item.title}>
                  {item.value.map(e => (
                    <>
                      {e}
                      <br />
                    </>
                  ))}
                </Descriptions.Item>
              );
            }
          }
          return null;
        })}
      </Descriptions>
    );
  }
}
class ItemData extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let item = this.props.item;
    console.log(this.props);
    if (item.value) {
      if (item.type === "string") {
        return (
          <Descriptions.Item label={item.title}>{item.value}</Descriptions.Item>
        );
      } else if ((item.type = "array")) {
        return (
          <Descriptions.Item label={item.title}>
            {item.value.map(e => (
              <>
                {e}
                <br />
              </>
            ))}
          </Descriptions.Item>
        );
      }
    }
    return null;
  }
}
export default Data;
