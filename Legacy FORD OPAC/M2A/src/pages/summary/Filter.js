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
class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filterIndex: -1, filterItem: null, open: false };
  }
  toggleFilter = index => {
    let { data } = this.props;
    let curIndex = this.state.filterIndex;

    this.setState({
      filterIndex: index,
      filterItem: data[index],
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
    console.log(data);
    return (
      <Collapse
        className="summaryFilter"
        expandIconPosition={"right"}
        expandIcon={({ isActive }) =>
          isActive ? <Icon type="minus" /> : <Icon type="plus" />
        }
      >
        <Panel header={<h5>FILTER</h5>} key="1">
          <Row gutter={12}>
            {data.map((item_group, index) => (
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
                <Col xl={0} lg={0} md={0} sm={0} xs={0}>
                  <Card
                    onClick={_ => this.toggleFilter(index)}
                    title={item_group._title}
                    extra={<Icon type="caret-right" />}
                    bodyStyle={{ display: "none" }}
                  ></Card>

                  <Drawer
                    title={item_group._title}
                    placement={"right"}
                    onClose={this.onClose}
                    visible={this.state.open}
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
                  </Drawer>
                </Col>
              </>
            ))}
          </Row>
        </Panel>
      </Collapse>
    );
  }
}

export default Filter;
