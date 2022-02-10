import React from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";

let listGroupStyle = {
  paddingLeft: "15px",
  maxHeight: "250px",
  overflowY: "auto"
  // overflow: "hidden"
};
class ClusterModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyvalue: "",
      option: ""
    };
  }
  handleKeyvalueChange = event => {
    this.setState({
      keyvalue: event.target.value
    });
  };
  handleClose = _ => {
    this.props.close();
    this.setState({
      keyvalue: "",
      option: ""
    });
  };
  listSelect = val => {
  
    this.setState({
      option: val
    });
  };
  submit = () => {
    this.props.submit(
      this.state.option,
      this.props.data.cluster.keyname.toLowerCase()
    );
    this.props.close();
    this.setState({
      keyvalue: "",
      option: ""
    });
  };
  render() {
    let { open, close, data } = this.props;

    return (
      <Modal
        show={open}
        onHide={_ => this.handleClose()}
        centered
        aria-labelledby="cluster-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="cluster-title">Browse</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {data !== null ? (
            <>
              <Row className="cluster-page-button">
                <Col xs={12} className="text-center">
                  <ButtonGroup aria-label="button">
                    <Button
                      variant="secondary"
                      onClick={_ =>
                        this.props.pageAction(data.cluster.first_page)
                      }
                    >
                      First
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={_ =>
                        this.props.pageAction(data.cluster.prev_page)
                      }
                    >
                      Previous
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={_ =>
                        this.props.pageAction(data.cluster.next_page)
                      }
                    >
                      Next
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={_ =>
                        this.props.pageAction(data.cluster.last_page)
                      }
                    >
                      Last
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>

              <Row className="cluster-search-bar">
                <Form as={Col} xs={12}>
                  <InputGroup>
                    <Form.Control
                      placeholder="Browse Cluster"
                      aria-label="Cluster"
                      name="KEYVALUE"
                      onChange={event => this.handleKeyvalueChange(event)}
                    />
                    <InputGroup.Append>
                      <Button
                        onClick={_ =>
                          this.props.getCluster(
                            this.state.keyvalue,
                            data.cluster.keyname,
                            data.cluster.find
                          )
                        }
                      >
                        Search
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form>
              </Row>

              <Row>
                <ListGroup
                  defaultActiveKey="#0"
                  as={Col}
                  xs={12}
                  style={listGroupStyle}
                >
                  {data.cluster.index_list.option.map((option, index) => {
                    return (
                      <ListGroup.Item
                        style={{
                          width: "100% !important",
                          height: "50px !important"
                        }}
                        action
                        href={`#cluster-${index}`}
                        key={index}
                        onClick={_ => this.listSelect(option)}
                        onDoubleClick={() => {
                          this.listSelect(option);
                          this.submit();
                        }}
                      >
                        {option}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Row>
            </>
          ) : (
            <h4>No Data Available For This Field</h4>
          )}
        </Modal.Body>
        <Modal.Footer>
          {data !== null ? (
            <Button variant="primary" onClick={_ => this.submit()}>
              Submit
            </Button>
          ) : (
            <Button variant="primary" onClick={_ => this.handleClose()}>
              Close
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ClusterModal;
