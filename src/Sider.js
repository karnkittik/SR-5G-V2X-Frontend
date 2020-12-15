import React from "react";
import { Menu, Layout } from "antd";
import {
  PieChartOutlined,
  HeatMapOutlined,
  EnvironmentOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
const Logo = () => <div className="sider-weblogo">5G V2X</div>;
const Sider = (props) => {
  const { handleClick } = props;

  return (
    <Layout.Sider
      theme="light"
      //collapsible
      breakpoint="lg"
      collapsedWidth="80"
    >
      <Logo />
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        //defaultOpenKeys={['sub1']}
      >
        <Menu.Item key="1" onClick={handleClick} icon={<EnvironmentOutlined />}>
          Accident Map
        </Menu.Item>
        <Menu.Item key="2" onClick={handleClick} icon={<HeatMapOutlined />}>
          Drowsiness Overview
        </Menu.Item>
        <Menu.Item key="3" onClick={handleClick} icon={<PieChartOutlined />}>
          Accident Overview
        </Menu.Item>
        <Menu.Item key="4" onClick={handleClick} icon={<BarChartOutlined />}>
          Accident By Day
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default Sider;
