import React from "react";
import PageLayout from "../../components/Layout";

import { xmlToJson } from "../../services";
import {
  Row,
  Col,
  List,
  Layout,
  Card,
  PageHeader,
  Button,
  Icon,
  Radio,
  Select
} from "antd";
const { Content } = Layout;
import { FaTh, FaList, FaTree } from "react-icons/fa";
import Tree from "../../components/Tree";
import { JSON_ARRAY_FIELD } from "../../services/index";
import GridView from "./GridView";
import ListView from "./ListView";
const { Meta } = Card;
const { Option } = Select;
class Summary extends React.Component {
  constructor(props) {
    super(props);
    let xml = document.querySelector("#summary_xml");

    let json = xmlToJson(xml, JSON_ARRAY_FIELD);
    this.state = {
      data: json.report,
      grid: false
    };
    this.tree = React.createRef();
  }
  openTree = _ => {
    this.tree.current.showDrawer();
  };
  render() {
    let searchLink = document.getElementById("search-link").innerText;
    let { data } = this.state;
    console.log(data);
    return (
      <PageLayout>
        <Row>
          <Row>
            <Col lg={{ span: 18, offset: 3 }} md={24}>
              <Row>
                <Col span={24}>
                  <Card
                    title={
                      <h4>
                        {data.record_count} results for "{data.search_statement}
                        "
                      </h4>
                    }
                  >
                    {" "}
                    <Card title={<h5>Filter By:</h5>}></Card>
                    <Row>
                      {" "}
                      <Col lg={{ span: 8, offset: 16 }} md={{ span: 24 }}>
                        {" "}
                        <div style={{ float: "right", maxWidth: "420px" }}>
                          {" "}
                          {/* <Select
                            defaultValue="default"
                            style={{ width: "200px" }}
                          >
                            <Option value="default">Relevance</Option>
                            <Option value="title">Title</Option>
                            <Option value="date-asc">Date Ascending</Option>
                            <Option value="date-desc">Date Descending</Option>
                          <Option value="location-asc">
                              Location Ascending
                            </Option>
                            <Option value="location-desc">
                              Location Descending
                            </Option>
                            <Option value="box">box</Option>
                            <Option value="folder">Folder</Option>
                          </Select> */}
                          <Radio.Group defaultValue="list" buttonStyle="solid">
                            <Radio.Button
                              onClick={_ => this.setState({ grid: true })}
                              value="grid"
                            >
                              {" "}
                              <FaTh />
                            </Radio.Button>
                            <Radio.Button
                              onClick={_ => this.setState({ grid: false })}
                              value="list"
                            >
                              {" "}
                              <FaList />
                            </Radio.Button>
                          </Radio.Group>
                        </div>
                      </Col>
                      <Col span={24}>
                        <Row>
                          {this.state.grid ? (
                            <GridView data={data} />
                          ) : (
                            <ListView data={data} />
                          )}
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
      </PageLayout>
    );
  }
}

export default Summary;
