import React from "react";
import { Menu, Layout, Divider } from "antd";

const Sider = (props) => {
  const { handleClick, pageList, pageListGroup, logo, bottom } = props;
  return (
    <Layout.Sider
      theme="light"
      //collapsible
      breakpoint="md"
      collapsedWidth="0"
      className="sider"
    >
      {logo}
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["0"]}
        className="sider-menu"
      >
        {pageList?.map((page, index) => (
          <>
            <Menu.Item
              key={index}
              className="sider-menu-item"
              onClick={handleClick}
              icon={page.icon}
            >
              {page.title}
            </Menu.Item>
          </>
        ))}
        {pageListGroup?.map(({ name, pageList }, pageListIndex) => {
          return (
            <React.Fragment key={pageListIndex + "f"}>
              <div key={pageListIndex + "d"} className="sider-menu-group-name">
                {name}
              </div>
              <Menu.Divider key={pageListIndex + "g"} />
              {/* <Divider key={pageListIndex + "d"}>{name}</Divider> */}
              {pageList.map((page, index) => {
                return (
                  <Menu.Item
                    key={pageListIndex + index + (pageListIndex !== 0 ? 1 : 0)}
                    className="sider-menu-item"
                    onClick={handleClick}
                    icon={page.icon}
                  >
                    {page.title}
                  </Menu.Item>
                );
              })}
            </React.Fragment>
          );
        })}
      </Menu>
      <div className="sider-bottom">{bottom}</div>
    </Layout.Sider>
  );
};

export default Sider;
