import React, { useState, useEffect } from "react";
import { Layout, Button, Badge } from "antd";
import Sider from "../../components/common/Sider";
import AccidentMap from "./AccidentMap";
import AccidentStatistics from "./AccidentStatistics";
import DrowsinessHeatMap from "./DrowsinessHeatMap";
import DrowsinessStatistics from "./DrowsinessStatistics";
import {
  LoginOutlined,
  ExclamationCircleOutlined,
  BarChartOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const General = () => {
  const pageListGroup = [
    {
      name: "Accident",
      pageList: [
        {
          title: "Accident Map",
          component: <AccidentMap />,
          icon: <ExclamationCircleOutlined />,
        },
        {
          title: "Accident Statistics",
          component: <AccidentStatistics />,
          icon: <BarChartOutlined />,
        },
      ],
    },
    {
      name: "Drowsiness",
      pageList: [
        {
          title: "Drowsiness HeatMap",
          component: <DrowsinessHeatMap />,
          icon: <EyeOutlined />,
        },
        {
          title: "Drowsiness Statistics",
          component: <DrowsinessStatistics />,
          icon: <BarChartOutlined />,
        },
      ],
    },
  ];
  const pageIndex = pageListGroup.map((group) => group.pageList.length);
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
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(0);
  useEffect(() => {
    var a = 0;
    var b = parseInt(render) + 1;
    for (var i = 0; i < pageIndex.length; i++) {
      if (b - pageIndex[i] > 0) {
        b -= pageIndex[i];
        a += 1;
      } else {
        break;
      }
    }
    setFirstIndex(a);
    setSecondIndex(b - 1);
  }, [render, pageIndex]);
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
          pageListGroup={pageListGroup}
          logo={<Logo />}
          bottom={<SignIn />}
        />
        <Layout className="full real-layout">
          <Content className="content">
            {pageListGroup[firstIndex].pageList[secondIndex].component}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default General;
