import React from "react";
import { Drawer, Button, Radio, Icon } from "antd";
class PageDrawer extends React.Component {
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
    return (
      <>
        <Button
          onClick={_ => this.showDrawer()}
          className="drawerButton"
          style={{
            visibility: this.state.visible ? "hidden" : "visible"
          }}
        >
          <Icon type="menu" />
        </Button>
        <Drawer
          width={300}
          style={{ zIndex: "9999" }}
          title="Basic Drawer"
          placement={"left"}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </>
    );
  }
}

export default PageDrawer;
