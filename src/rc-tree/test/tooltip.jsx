/* eslint-disable no-alert, no-console, react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from 'rc-tooltip';
import "rc-tree/assets/index.css";
import Tree from 'rc-tree';

const treeData = [
  {
    key: '0-0',
    title: 'parent 1',
    children: [
      { key: '0-0-0', title: 'parent 1-1', children: [{ key: '0-0-0-0', title: 'parent 1-1-0' }] },
      {
        key: '0-0-1',
        title: 'parent 1-2',
        children: [
          { key: '0-0-1-0', title: 'parent 1-2-0' },
          { key: '0-0-1-1', title: 'parent 1-2-1' },
          { key: '0-0-1-2', title: 'parent 1-2-2' },
          { key: '0-0-1-3', title: 'parent 1-2-3' },
          { key: '0-0-1-4', title: 'parent 1-2-4' },
          { key: '0-0-1-5', title: 'parent 1-2-5' },
          { key: '0-0-1-6', title: 'parent 1-2-6' },
          { key: '0-0-1-7', title: 'parent 1-2-7' },
          { key: '0-0-1-8', title: 'parent 1-2-8' },
          { key: '0-0-1-9', title: 'parent 1-2-9' },
          { key: 1128, title: 1128 },
        ],
      },
    ],
  },
];

function contains(root, n) {
  let node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

class Demo extends React.Component {
  static defaultProps = {
    keys: ['0-0-0-0'],
  };

  constructor(props) {
    super(props);
    const { keys } = props;
    this.state = {
      defaultExpandedKeys: keys,
      defaultSelectedKeys: keys,
      defaultCheckedKeys: keys,
    };

    this.treeRef = React.createRef();
  }

  componentDidMount() {
    this.getContainer();
    // console.log(ReactDOM.findDOMNode(this), this.cmContainer);
    console.log(contains(ReactDOM.findDOMNode(this), this.cmContainer));
  }

  componentWillUnmount() {
    if (this.cmContainer) {
      ReactDOM.unmountComponentAtNode(this.cmContainer);
      document.body.removeChild(this.cmContainer);
      this.cmContainer = null;
    }
  }

  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
  };

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    this.selKey = info.node.props.eventKey;
  };

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  onEdit = () => {
    setTimeout(() => {
      console.log('current key: ', this.selKey);
    }, 0);
  };

  onDel = e => {
    if (!window.confirm('sure to delete?')) {
      return;
    }
    e.stopPropagation();
  };

  onSelect = selectedKeys => {
    this.setState({ selectedKeys });
  };

  onRightClick = info => {
    console.log('right click', info);
    this.setState({ selectedKeys: [info.node.props.eventKey] });
    this.renderCm(info);
  };

  onMouseEnter = info => {
    console.log('enter', info);
    this.renderCm(info);
  };

  onMouseLeave = info => {
    console.log('leave', info);
  };

  getContainer() {
    if (!this.cmContainer) {
      this.cmContainer = document.createElement('div');
      document.body.appendChild(this.cmContainer);
    }
    return this.cmContainer;
  }

  renderCm(info) {
    if (this.toolTip) {
      ReactDOM.unmountComponentAtNode(this.cmContainer);
      this.toolTip = null;
    }
    this.toolTip = (
      <Tooltip
        trigger="click"
        placement="bottomRight"
        prefixCls="rc-tree-contextmenu"
        defaultVisible
        overlay={<h4>{info.node.props.title}</h4>}
      >
        <span />
      </Tooltip>
    );

    const container = this.getContainer();
    Object.assign(this.cmContainer.style, {
      position: 'absolute',
      left: `${info.event.pageX}px`,
      top: `${info.event.pageY}px`,
    });

    ReactDOM.render(this.toolTip, container);
  }

  setTreeRef = tree => {
    this.tree = tree;
  };

  render() {
    return (
        <Tree
          className="myCls"
          showLine
          checkable
          selectable={false}
          defaultExpandAll
          onExpand={this.onExpand}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          defaultSelectedKeys={this.state.defaultSelectedKeys}
          defaultCheckedKeys={this.state.defaultCheckedKeys}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
          treeData={treeData}
        />
    );
  }
}

export default Demo;
