import React, { useState, useEffect } from "react";
import { Layout, Button, Badge } from "antd";
import Sider from "../../components/common/Sider";
import AccidentHeatMap from "./AccidentHeatMap";
import AccidentStatistics from "./AccidentStatistics";
import {
  LoginOutlined,
  EnvironmentOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const { Content, Header } = Layout;
const General = () => {
  const pageList = [
    {
      title: "Accident Map",
      component: <AccidentHeatMap />,
      icon: <EnvironmentOutlined />,
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
  const setTheme = () => {
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
  useEffect(() => {
    setTheme();
  }, []);

  return (
    <div className="App">
      <Layout className="full">
        <Sider
          handleClick={handleMenuClick}
          pageList={pageList}
          logo={<Logo />}
          bottom={<SignIn />}
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
export default General;
