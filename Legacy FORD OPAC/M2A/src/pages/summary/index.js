import React from "react";
import PageLayout from "../../components/Layout";
import { MdTune, MdSort } from "react-icons/md";

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
  Collapse,
  Select,
  Pagination
} from "antd";
const { Content } = Layout;
import { FaTh, FaList, FaTree } from "react-icons/fa";
import Tree from "../../components/Tree";
import FilterDrawer from "../../components/FilterDrawer";
import { JSON_ARRAY_FIELD } from "../../services/index";
import GridView from "./GridView";
import ListView from "./ListView";
const { Meta } = Card;
const { Option } = Select;
import Filter from "./Filter";
import Sort from "./Sort";
import SortDrawer from "../../components/SortDrawer";
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
    this.filter = React.createRef();
    this.sort = React.createRef();
  }
  openTree = _ => {
    this.tree.current.showDrawer();
  };
  openFilter = _ => {
    this.filter.current.showDrawer();
  };
  openSort = _ => {
    this.sort.current.showDrawer();
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
                    className="summaryHeader"
                    title={
                      <h4>
                        {data.record_count} results for "{data.search_statement}
                        "
                      </h4>
                    }
                    extra={
                      <Button.Group id="summaryButtonGroup">
                        {" "}
                        <Button onClick={this.openTree}>
                          <FaTree />
                        </Button>
                        <Button
                          type={this.state.grid ? "primary" : ""}
                          onClick={_ => this.setState({ grid: true })}
                          value="grid"
                        >
                          {" "}
                          <FaTh />
                        </Button>
                        <Button
                          type={!this.state.grid ? "primary" : ""}
                          onClick={_ => this.setState({ grid: false })}
                          value="list"
                        >
                          {" "}
                          <FaList />
                        </Button>
                      </Button.Group>
                    }
                  >
                    {" "}
                    <Filter
                      data={data.filters.div.xml.filter}
                    
                    />
                    <Sort data={data.sorts} />
                    <Row>
                      {" "}
                      <Col lg={{ span: 8, offset: 16 }} md={{ span: 24 }}>
                        {" "}
                        <div style={{ float: "right", maxWidth: "420px" }}>
                          <Tree ref={this.tree}></Tree>
                          <FilterDrawer
                            dir="right"
                            data={data.filters.div.xml.filter}
                            ref={this.filter}
                          ></FilterDrawer>
                          <SortDrawer
                            dir="right"
                            data={data.sorts}
                            ref={this.sort}
                          ></SortDrawer>
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
                      <Col sm={24} md={0} lg={0} id="mobileNavBar">
                        <Button
                          sm={6}
                          className="mobileNavBarButton"
                          onClick={this.openFilter}
                        >
                          <MdTune />
                        </Button>
                        <Button
                          sm={6}
                          className="mobileNavBarButton"
                          onClick={this.openSort}
                        >
                          <MdSort />
                        </Button>
                        <Button
                          sm={6}
                          className="mobileNavBarButton"
                          onClick={this.openTree}
                        >
                          <FaTree />
                        </Button>
                        <Button
                          sm={6}
                          className="mobileNavBarButton"
                          onClick={_ =>
                            this.setState({ grid: !this.state.grid })
                          }
                        >
                          {!this.state.grid ? <FaTh /> : <FaList />}
                        </Button>
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
