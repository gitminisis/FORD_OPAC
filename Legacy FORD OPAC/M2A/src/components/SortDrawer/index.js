import React from "react";
import {
  Menu,
  Layout,
  Icon,
  Drawer,
  Button,
  Card,
  Checkbox,
  Row,
  Col
} from "antd";
const { Sider, Content } = Layout;
const { SubMenu } = Menu;
class SortDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    let { data } = this.props;

    let current = data.current;
    return (
      <>
        {" "}
        <Drawer
          id="leftDrawer"
          placement={this.props.dir}
          width={"100vw"}
          zIndex={9001}
          title="SORT"
          closable
          onClose={this.onClose}
          visible={this.state.visible}
          draggable={true}
        >
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
          </Row>
        </Drawer>
      </>
    );
  }
}

export default SortDrawer;
