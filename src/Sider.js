import React from "react";
import { Menu, Layout } from "antd";
import {
  HeatMapOutlined,
  EnvironmentOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
const Logo = () => <div className="sider-weblogo">5G-V2X</div>;
const Sider = (props) => {
  const { handleClick } = props;

  return (
    <Layout.Sider
      theme="light"
      //collapsible
      breakpoint="md"
      collapsedWidth="0"
      className="sider"
    >
      <Logo />
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        //defaultOpenKeys={['sub1']}
        className="sider-menu"
      >
        <Menu.Item
          key="1"
          className="sider-menu-item"
          onClick={handleClick}
          icon={<EnvironmentOutlined />}
        >
          Accident Map
        </Menu.Item>
        <Menu.Item
          key="2"
          className="sider-menu-item"
          onClick={handleClick}
          icon={<HeatMapOutlined />}
        >
          Accident Heatmap
        </Menu.Item>
        <Menu.Item
          key="3"
          className="sider-menu-item"
          onClick={handleClick}
          icon={<BarChartOutlined />}
        >
          Accident Statistics
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default Sider;
