import React from "react";
import {
  Collapse,
  Select,
  Row,
  Col,
  Menu,
  Switch,
  Card,
  Checkbox,
  Button,
  Drawer,
  Icon
} from "antd";
const { SubMenu } = Menu;
const { Panel } = Collapse;
class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  toggleFilter = index => {
    this.setState({
      open: true
    });
  };
  onClose = () => {
    this.setState({
      open: false
    });
  };
  render() {
    let { data } = this.props;

    let current = data.current;
    return (
      <Collapse
        className="summarySort"
        style={{ marginTop: "20px" }}
        expandIconPosition={"right"}
        expandIcon={({ isActive }) =>
          isActive ? <Icon type="minus" /> : <Icon type="plus" />
        }
      >
        <Panel header={<h5>SORT</h5>} key="1">
          <Row gutter={12}>
            <Col span={24}>
              {" "}
              <Checkbox
                checked={current === "title_sort"}
                onClick={_ => {
                  window.location = data.title_sort;
                }}
              >
                Title
              </Checkbox>
            </Col>{" "}
            <Col span={24}>
              {" "}
              <Checkbox
                checked={current === "date_asc_sort"}
                onClick={_ => {
                  window.location = data.date_asc_sort;
                }}
              >
                Year Ascending
              </Checkbox>
            </Col>
            <Col span={24}>
              {" "}
              <Checkbox
                checked={current === "date_desc_sort"}
                onClick={_ => {
                  window.location = data.date_desc_sort;
                }}
              >
                Year Descending
              </Checkbox>
            </Col>
            <Col span={24}>
              {" "}
              <Checkbox
                checked={current === "refd_sort"}
                onClick={_ => {
                  window.location = data.refd_sort;
                }}
              >
                Reference Code
              </Checkbox>
            </Col>
            <Col span={24}>
              {" "}
              <Checkbox
                checked={current === "box_sort"}
                onClick={_ => {
                  window.location = data.box_sort;
                }}
              >
                Box
              </Checkbox>
            </Col>
            <Col span={24}>
              {" "}
              <Checkbox
                checked={current === "folder_sort"}
                onClick={_ => {
                  window.location = data.folder_sort;
                }}
              >
                Folder
              </Checkbox>
            </Col>
            <Col span={24}>
              {" "}
              <Checkbox
                checked={current === "item_sort"}
                onClick={_ => {
                  window.location = data.item_sort;
                }}
              >
                Item
              </Checkbox>
            </Col>
            <Col span={24}>
              {" "}
              <Checkbox
                checked={current === "location_asc_sort"}
                onClick={_ => {
                  window.location = data.location_asc_sort;
                }}
              >
                Location Ascending
              </Checkbox>
            </Col>
            <Col span={24}>
              {" "}
              <Checkbox
                checked={current === "location_desc_sort"}
                onClick={_ => {
                  window.location = data.location_desc_sort;
                }}
              >
                Location Descending
              </Checkbox>
            </Col>
            <Col span={24}>
              {" "}
              <Checkbox
                checked={current === "default_sort"}
                onClick={_ => {
                  window.location = data.default_sort;
                }}
              >
                Default
              </Checkbox>
            </Col>
            {/* {data.map((item_group, index) => (
              <>
                {" "}
                <Col xl={6} lg={12} md={0} sm={0} xs={0}>
                  {" "}
                  <Collapse expandIconPosition={"right"}>
                    <Panel
                      header={item_group._title}
                      key={index}
                      onClick={_ => {
                        console.log(12);
                      }}
                    >
                      <Row gutter={4}>
                        {" "}
                        {item_group.item_group.map(item => (
                          <Col span={24}>
                            {" "}
                            <Checkbox
                              checked={item.item_selected !== "N"}
                              onClick={_ => {
                                window.location = `${item.item_link}&DATABASE=DESCRIPTION_OPAC`;
                              }}
                            >
                              {item.item_value} ({item.item_frequency})
                            </Checkbox>
                          </Col>
                        ))}
                      </Row>
                    </Panel>
                  </Collapse>
                </Col>
              </>
            ))} */}
          </Row>
        </Panel>
      </Collapse>
    );
  }
}

export default Sort;
