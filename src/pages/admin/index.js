import React, { useState } from "react";
import { Layout, Badge } from "antd";
import Sider from "../../components/common/Sider";
import {
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
  ];
  const Logo = () => (
    <Badge.Ribbon text="Admin">
      <div className="sider-weblogo admin">5G-V2X</div>
    </Badge.Ribbon>
  );
  const [render, updateRender] = useState(1);

  const handleMenuClick = (menu) => {
    updateRender(menu.key);
  };
  const eiei = () => {
    window.less
      .modifyVars({
        "@primary-color": "#52c2a0",
      })
      .then(() => {
        //do other stuff here
      })
      .catch((error) => {
        console.error(error);
      });
  };
  eiei();
  return (
    <div className="App">
      <Layout style={{ height: "calc(var(--vh, 1vh) * 100)" }}>
        <Sider
          handleClick={handleMenuClick}
          pageList={pageList}
          logo={<Logo />}
        />
        <Layout>
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
