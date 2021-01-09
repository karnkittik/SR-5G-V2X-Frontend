import React, { useState } from "react";
import { Layout } from "antd";
import Sider from "../../components/common/Sider";
import AccidentMap from "./AccidentMap";
import AccidentHeatMap from "./AccidentHeatMap";
import AccidentStatistics from "./AccidentStatistics";
import {
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
  const Logo = () => <div className="sider-weblogo">5G-V2X</div>;
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
