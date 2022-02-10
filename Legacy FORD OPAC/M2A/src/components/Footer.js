import React from "react";
import { List, Layout } from "antd";
const { Footer } = Layout;
import logo from "../assets/images/logo.png";

class PageFooter extends React.Component {
  render() {
    return (
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#242424",
          color: "white"
        }}
      >
        <img
          src={logo}
          style={{
            width: "200px",
            height: "auto",
            marginTop: "20xp",
            marginBottom: "20px"
          }}
        />
        <p>&copy; 2020 The Ford Motor Company. All Rights Reserved.</p>
      </Footer>
    );
  }
}

export default PageFooter;
