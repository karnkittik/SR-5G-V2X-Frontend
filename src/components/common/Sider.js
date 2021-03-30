import React from "react";
import { Menu, Layout } from "antd";

const Sider = (props) => {
  const {
    collapsed,
    handleClick,
    pageListGroup,
    logo,
    bottom,
    onClose,
    setCollapsed,
    pageIndex,
  } = props;
  var pageKey = -1;
  return (
    <Layout.Sider
      trigger={null}
      collapsible
      theme="light"
      breakpoint="md"
      collapsed={collapsed}
      className="sider hideOnMobile"
      onBreakpoint={() => {
        setCollapsed(true);
        onClose();
      }}
    >
      {/* {logo} */}
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["0"]}
        selectedKeys={[pageIndex.toString()]}
        className="sider-menu"
      >
        {pageListGroup?.map(({ name, pageList }, pageListIndex) => {
          return collapsed ? (
            <React.Fragment key={"g" + pageListIndex}>
              {pageListIndex && <Menu.Divider />}
              {pageList.map((page, index) => {
                pageKey = pageKey + 1;
                return (
                  <Menu.Item
                    key={pageKey}
                    // key={pageListIndex + index + (pageListIndex !== 0 ? 1 : 0)}
                    className="sider-menu-item"
                    onClick={handleClick}
                    icon={page.icon}
                  >
                    {page.title}
                  </Menu.Item>
                );
              })}
            </React.Fragment>
          ) : (
            <Menu.ItemGroup key={"g" + pageListIndex} title={name}>
              {pageList.map((page, index) => {
                pageKey = pageKey + 1;
                return (
                  <Menu.Item
                    key={pageKey}
                    // key={pageListIndex + index + (pageListIndex !== 0 ? 1 : 0)}
                    className="sider-menu-item"
                    onClick={handleClick}
                    icon={page.icon}
                  >
                    {collapsed ? page.title : page.short}
                  </Menu.Item>
                );
              })}
            </Menu.ItemGroup>
          );
        })}
      </Menu>
      {/* <div className="sider-bottom">{bottom}</div> */}
    </Layout.Sider>
  );
};

export default Sider;
