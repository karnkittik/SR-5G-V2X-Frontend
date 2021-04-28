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
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import Drawer from "../../components/common/Drawer";

const { Content, Header } = Layout;
const General = (props) => {
  const pageListGroup = [
    {
      name: "Accident",
      pageList: [
        {
          title: "Accident Map",
          short: "Map",
          component: <AccidentMap location={props.location} />,
          icon: <ExclamationCircleOutlined />,
        },
        {
          title: "Accident Statistics",
          short: "Statistics",
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
          short: "HeatMap",
          component: <DrowsinessHeatMap location={props.location} />,
          icon: <EyeOutlined />,
        },
        {
          title: "Drowsiness Statistics",
          short: "Statistics",
          component: <DrowsinessStatistics />,
          icon: <BarChartOutlined />,
        },
      ],
    },
  ];
  const pageIndex = pageListGroup.map((group) => group.pageList.length);
  const Logo = () => (
    <>
      {/* <Badge.Ribbon text="public" placement="end"></Badge.Ribbon> */}
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
      Go to Admin
    </Button>
  );
  const [render, updateRender] = useState(0);
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(true);
  const [visible, setVisible] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
    showDrawer();
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
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
  useEffect(() => {
    document.title = "5G-V2X";
  }, []);
  return (
    <div className="App">
      <Layout className="full">
        <Header
          style={{
            padding: 0,
            paddingRight: "5px",
            backgroundColor: "white",
            height: "48px",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
          }}
        >
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
                style: { width: "60px", fontSize: "18px" },
              }
            )}
            <div className="header-title">
              {pageListGroup[firstIndex].pageList[secondIndex].title}
            </div>
          </div>
          <Logo />
        </Header>
        <Layout className="full ">
          <Drawer
            pageIndex={render}
            placement="left"
            closable={false}
            onClose={onClose}
            visible={visible}
            handleClick={handleMenuClick}
            logo={<Logo />}
            pageListGroup={pageListGroup}
            className="hideOnDesktop sider"
          />
          <Sider
            pageIndex={render}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            onClose={onClose}
            handleClick={handleMenuClick}
            pageListGroup={pageListGroup}
            logo={<Logo />}
            bottom={<SignIn />}
          />
          <Content className="content">
            {pageListGroup[firstIndex].pageList[secondIndex].component}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default General;
