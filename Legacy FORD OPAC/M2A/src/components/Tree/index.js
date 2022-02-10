import React from "react";
import { Tree, Drawer, Button, Input } from "antd";
const { TreeNode, DirectoryTree } = Tree;
import axios from "axios";
import { xmlToJson } from "../../services";
import { FaTree } from "react-icons/fa";
const { Search } = Input;
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
class TreeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      gData: [],
      visible: false,
      placement: "left",
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true
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

  onChange = e => {
    this.setState({
      placement: e.target.value
    });
  };

  loadNode = (exp, node) => {
    let session = document.getElementById("session-id").innerText;
    axios
      .get(
        `${session}/1/1?SEARCH&DATABASE=FORD_SUBJECT_OPAC&EXP=${exp}&ERRMSG=[FORD_OPAC]/no-record.html`
      )
      .then(res => {
        let dataXML = res.data;
        let newDocument = document
          .createRange()
          .createContextualFragment(dataXML);

        let xml = newDocument.querySelector("#subject_xml");

        let json = xmlToJson(xml, ["report.terms.lower", "report.terms.upper"]);
        let data = json.report.terms;
        if (!data.lower) {
          node.props.dataRef.isLeaf = true;
        }
        node.props.dataRef.children = data.lower
          ? data.lower.map(e => {
              return {
                title: e,
                isLeaf: false
              };
            })
          : null;

        this.setState({ data: [...this.state.data] });
      });
  };
  initTree = exp => {
    let session = document.getElementById("session-id").innerText;
    axios
      .get(
        `${session}/1/1?SEARCH&DATABASE=FORD_SUBJECT_OPAC&EXP=${exp}&ERRMSG=[FORD_OPAC]/no-record.html`
      )
      .then(res => {
        let dataXML = res.data;
        let newDocument = document
          .createRange()
          .createContextualFragment(dataXML);

        let xml = newDocument.querySelector("#subject_xml");

        let json = xmlToJson(xml, [
          "report.terms",
          "report.terms.lower",
          "report.terms.upper"
        ]);

        // let gData = this.state.gData;
        let data = json.report.terms
          .map(e => {
            let parent = {
              title: e.term,
              key: e.term,
              isLeaf: !e.lower,
              children: e.lower
                ? e.lower.map(c => {
                    let node = {
                      title: c,
                      key: c
                    };

                    return node;
                  })
                : null
            };

            // gData.push({
            //   title: e.term,
            //   key: e.term,
            //   isLeaf: !e.lower
            // });
            // let children = e.lower
            //   ? e.lower.map(c => {
            //       let node = {
            //         title: c,
            //         key: c
            //       };
            //       gData.push(node);
            //       return node;
            //     })
            //   : null;
            // parent.children = children;
            return parent;
          })
          .sort((a, b) =>
            a.title.toLowerCase() > b.title.toLowerCase()
              ? 1
              : b.title.toLowerCase() > a.title.toLowerCase()
              ? -1
              : 0
          );

        this.setState({ data: data });
      });
  };
  componentDidMount() {
    this.initTree("sisn present and eng_desc present and not eng_bt present");
  }
  componentWillUpdate() {
    window.addEventListener("touchmove", ontouchmove);
    function ontouchmove(e) {
      if (e.cancelable) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
  }
  onLoadData = treeNode =>
    new Promise(resolve => {
      if (treeNode.props.children) {
        resolve();
        return;
      }

      setTimeout(() => {
        this.loadNode(`eng_term "${treeNode.props.title}"`, treeNode);
        resolve();
      }, 1000);
    });

  renderTreeNodes = data => {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;

    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.title}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }

      return <TreeNode key={item.title} {...item} dataRef={item} />;
    });
  };

  onSearch = value => {
    if (value.trim() !== "") {
      let data = this.state.data;
      let gData = this.state.gData;

      const expandedKeys = gData
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, data);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      this.setState({
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      });
    } else {
      this.setState({
        expandedKeys: [],
        searchValue: "",
        autoExpandParent: true
      });
    }
  };
  render() {
    const { expandedKeys, autoExpandParent } = this.state;
    let home = document.getElementById("home");

    return (
      <div>
        <Drawer
          id="treeDrawer"
          width={"100vw"}
          zIndex={9001}
          title="SUBJECT SEARCH"
          placement={this.state.placement}
          closable
          onClose={this.onClose}
          visible={this.state.visible}
          draggable={true}
        >
          {" "}
          {/* <Search
            style={{ marginBottom: 8 }}
            placeholder="Search"
            enterButton
            onSearch={value => this.onSearch(value)}
          /> */}
          {this.state.data.length ? (
            <Tree
              className={home ? "homeTree" : "reportTree"}
              showLine
              showIcon={false}
              selectable={false}
              loadData={this.onLoadData}
            >
              {this.renderTreeNodes(this.state.data)}
            </Tree>
          ) : (
            <> loading tree</>
          )}
        </Drawer>
      </div>
    );
  }
}

export default TreeView;
