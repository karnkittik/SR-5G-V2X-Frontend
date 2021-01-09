import React, { useState } from "react";
import { Layout, Badge, Button } from "antd";
import Sider from "../../components/common/Sider";
import {
  LogoutOutlined,
  HeatMapOutlined,
  EnvironmentOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
const { Content, Header } = Layout;
const Admin = () => {
  const pageList = [
    {
      title: "Employee List",
      component: <div></div>,
      icon: <EnvironmentOutlined />,
    },
    {
      title: "Test 2",
      component: <div></div>,
      icon: <HeatMapOutlined />,
    },
    {
      title: "Test 3",
      component: <div></div>,
      icon: <BarChartOutlined />,
    },
    {
      title: "Test 4",
      component: <div></div>,
      icon: <BarChartOutlined />,
    },
  ];
  const Logo = () => (
    <>
      <Badge.Ribbon text="admin" placement="end"></Badge.Ribbon>
      <div className="sider-weblogo admin">5G-V2X</div>
    </>
  );
  const SignOut = () => (
    <Button
      type="link"
      size="large"
      icon={<LogoutOutlined />}
      className="sider-bottom-button"
      href="/"
    >
      Sign Out
    </Button>
  );
  const [render, updateRender] = useState(0);

  const handleMenuClick = (menu) => {
    updateRender(menu.key);
  };
  const setTheme = () => {
    window.less
      .modifyVars({
        "@primary-color": "#38c49a",
      })
      .then(() => {
        //do other stuff here
      })
      .catch((error) => {
        console.error(error);
      });
  };
  setTheme();
  return (
    <div className="App">
      <Layout className="full">
        <Sider
          handleClick={handleMenuClick}
          pageList={pageList}
          logo={<Logo />}
          bottom={<SignOut />}
        />
        <Layout className="full real-layout">
          <Header className="header">
            <div className="header-title">{pageList[render].title}</div>
          </Header>
          <Content className="content">{pageList[render].component}</Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default Admin;
