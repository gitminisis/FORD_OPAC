import React from "react";
import PageLayout from "../../components/Layout";
import Car from "../../assets/images/ford_car.jpeg";
import {
  Row,
  Col,
  List,
  Layout,
  Card,
  PageHeader,
  Button,
  Icon,
  Radio
} from "antd";
const { Content } = Layout;
import { FaTh, FaList, FaTree } from "react-icons/fa";
import Tree from "../../components/Tree";
import GridView from "./GridView";
import ListView from "./ListView";
const { Meta } = Card;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: true
    };
    this.tree = React.createRef();
  }
  openTree = _ => {
    this.tree.current.showDrawer();
  };
  render() {
    let searchLink = document.getElementById("search-link");
    if (searchLink) {
      searchLink = searchLink.innerText;
    }

    return (
      <PageLayout>
        <Row>
          <Col lg={{ span: 18, offset: 3 }} md={24}>
            <Row>
              <Col span={24}>
                {" "}
                <Tree ref={this.tree}></Tree>
                <PageHeader
                  ghost={false}
                  title="FEATURE COLLECTION"
                  extra={[
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
                  ]}
                ></PageHeader>
              </Col>
              <Col span={24}>
                <Row>{this.state.grid ? <GridView /> : <ListView />}</Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </PageLayout>
    );
  }
}

export default Home;
