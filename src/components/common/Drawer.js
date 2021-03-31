import React from "react";
import { Menu, Drawer as AntDrawer } from "antd";

const Drawer = (props) => {
  const {
    handleClick,
    pageListGroup,
    onClose,
    visible,
    logo,
    pageIndex,
  } = props;
  var pageKey = -1;
  return (
    <AntDrawer
      placement="left"
      closable={false}
      onClose={onClose}
      visible={visible}
      logo={logo}
      className="hideOnDesktop sider"
      bodyStyle={{ padding: "10vh 0" }}
    >
      <div style={{ width: "100%", textAlign: "center" }}>{logo}</div>
      <div style={{ height: "80px" }}></div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["0"]}
        selectedKeys={[pageIndex.toString()]}
      >
        {pageListGroup?.map(({ name, pageList }, pageListIndex) => {
          return (
            <Menu.ItemGroup key={"g" + pageListIndex} title={name}>
              {pageList.map((page, index) => {
                pageKey = pageKey + 1;
                return (
                  <Menu.Item
                    key={pageKey}
                    className="sider-menu-item"
                    onClick={handleClick}
                    icon={page.icon}
                  >
                    {page.title}
                  </Menu.Item>
                );
              })}
            </Menu.ItemGroup>
          );
        })}
      </Menu>
    </AntDrawer>
  );
};

export default Drawer;
