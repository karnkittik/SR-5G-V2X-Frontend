import React, { useState } from "react";
import { Layout, Button, Badge } from "antd";
import Sider from "../../components/common/Sider";
import AccidentMap from "./AccidentMap";
import AccidentHeatMap from "./AccidentHeatMap";
import AccidentStatistics from "./AccidentStatistics";
import {
  LoginOutlined,
  HeatMapOutlined,
  EnvironmentOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const { Content, Header } = Layout;
const General = () => {
  const pageList = [
    {
      title: "Accident Map",
      component: <AccidentMap />,
      icon: <EnvironmentOutlined />,
    },
    {
      title: "Accident HeatMap",
      component: <AccidentHeatMap />,
      icon: <HeatMapOutlined />,
    },
    {
      title: "Accident Statistics",
      component: <AccidentStatistics />,
      icon: <BarChartOutlined />,
    },
  ];
  const Logo = () => (
    <>
      <Badge.Ribbon text="public" placement="end"></Badge.Ribbon>
      <div className="sider-weblogo">5G-V2X</div>
    </>
  );
  const SignIn = () => (
    <Button
      type="link"
      size="large"
      icon={<LoginOutlined />}
      className="sider-bottom-button"
      href="/admin"
    >
      Sign In
    </Button>
  );
  const [render, updateRender] = useState(0);

  const handleMenuClick = (menu) => {
    updateRender(menu.key);
  };
  const eiei = () => {
    window.less
      .modifyVars({
        "@primary-color": "#529bc2",
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
      <Layout className="full">
        <Sider
          handleClick={handleMenuClick}
          pageList={pageList}
          logo={<Logo />}
          bottom={<SignIn />}
        />
        <Layout className="full">
          <Header className="header">
            <div className="header-title">{pageList[render].title}</div>
          </Header>
          <Content className="content">{pageList[render].component}</Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default General;
