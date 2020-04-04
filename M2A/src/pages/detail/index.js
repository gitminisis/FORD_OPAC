import React from "react";
import PageLayout from "../../components/Layout";
import { xmlToJson } from "../../services";
import { Row, Col, Descriptions, Card, Button, Icon, Tooltip } from "antd";
import { extractData } from "../../services/m2a";
import Data from "./Data";
import Carousel from "./Carousel";
import Media from "./Media";
import { DETAIL_JSON_ARRAY_FIELD } from "../../services/index";
import { FaTree, FaTh } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Tree from "../../components/Tree";
import {
  AiOutlineRollback,
  AiFillCaretRight,
  AiFillCaretLeft
} from "react-icons/ai";
class Detail extends React.Component {
  constructor(props) {
    super(props);
    let xml = document.querySelector("#detail_xml");

    let json = xmlToJson(xml, DETAIL_JSON_ARRAY_FIELD);

    this.state = {
      data: json.report
    };
    this.tree = React.createRef();
  }
  openTree = _ => {
    this.tree.current.showDrawer();
  };
  render() {
    let rawData = this.state.data;
    console.log(rawData);
    return (
      <PageLayout>
        <Row>
          <Tree ref={this.tree}></Tree>
          <Col lg={{ span: 18, offset: 3 }} md={24}>
            <Card
              className="summaryHeader"
              title={<h4>Detail Page</h4>}
              style={{ width: "100%" }}
              extra={
                <Button.Group id="summaryButtonGroup">
                  <Tooltip title={rawData.prev_page ? "Previous Record" : null}>
                    <Button
                      disabled={!rawData.prev_page}
                      onClick={_ =>
                        (window.location = rawData.prev_page
                          ? rawData.prev_page.a._href
                          : "#")
                      }
                    >
                      <AiFillCaretLeft />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Return to Summary">
                    {" "}
                    <Button
                      onClick={_ =>
                        (window.location = rawData.return_summary
                          ? rawData.return_summary.a._href
                          : "/")
                      }
                    >
                      <AiOutlineRollback />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Subject Tree">
                    {" "}
                    <Button onClick={this.openTree}>
                      <FaTree />
                    </Button>
                  </Tooltip>
                  <Tooltip title={rawData.next_page ? "Next Record" : null}>
                    {" "}
                    <Button
                      disabled={!rawData.next_page}
                      onClick={_ =>
                        (window.location = rawData.next_page
                          ? rawData.next_page.a._href
                          : "#")
                      }
                    >
                      <AiFillCaretRight />
                    </Button>
                  </Tooltip>
                </Button.Group>
              }
            >
              <Row gutter={16}>
                <Col
                  md={{ span: 24, order: 1 }}
                  lg={14}
                  id="detailDescriptions"
                >
                  <Data data={rawData} />
                </Col>
                <Col md={{ span: 24, order: 0 }} lg={10}>
                  <Carousel data={rawData} />
                </Col>
                <Col span={24}>
                  <Media data={rawData} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col sm={24} md={0} lg={0} id="mobileNavBar">
            <Button
              sm={6}
              className="mobileNavBarButton"
              disabled={!rawData.prev_page}
              onClick={_ =>
                (window.location = rawData.prev_page
                  ? rawData.prev_page.a._href
                  : "#")
              }
            >
              <AiFillCaretLeft />
            </Button>
            <Button
              sm={6}
              className="mobileNavBarButton"
              onClick={_ =>
                (window.location = rawData.return_summary
                  ? rawData.return_summary.a._href
                  : "/")
              }
            >
              <AiOutlineRollback />
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
              disabled={!rawData.next_page}
              onClick={_ =>
                (window.location = rawData.next_page
                  ? rawData.next_page.a._href
                  : "#")
              }
            >
              <AiFillCaretRight />
            </Button>
          </Col>
        </Row>
      </PageLayout>
    );
  }
}

export default Detail;
