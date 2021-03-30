import React, { useState, useEffect } from "react";
import { Layout, Badge, Button } from "antd";
import Sider from "../../components/common/Sider";
import {
  LogoutOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
  TeamOutlined,
  CarOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import AccidentMap from "./AccidentMap";
import DrowsinessMap from "./DrowsinessMap";
import Driver from "./Driver";
import Car from "./Car";
import { AuthService } from "../../utils/api";
import Drawer from "../../components/common/Drawer";

const { Content, Header } = Layout;
const Admin = () => {
  const pageListGroup = [
    {
      name: "Overview",
      pageList: [
        {
          title: "Accident Map",
          short: "Accident Map",
          component: <AccidentMap />,
          icon: <ExclamationCircleOutlined />,
        },
        {
          title: "Drowsiness Map",
          short: "Drowsiness Map",
          component: <DrowsinessMap />,
          icon: <EyeOutlined />,
        },
      ],
    },
    {
      name: "Driver",
      pageList: [
        // {
        //   title: "Driver Statistics",
        //   component: <DriverStatistics />,
        //   icon: <BarChartOutlined />,
        // },
        {
          title: "Drivers",
          short: "Drivers",
          component: <Driver />,
          icon: <TeamOutlined />,
        },
      ],
    },
    {
      name: "Car",
      pageList: [
        {
          title: "Cars",
          short: "Cars",
          component: <Car />,
          icon: <CarOutlined />,
        },
      ],
    },
  ];
  const pageIndex = pageListGroup.map((group) => group.pageList.length);
  const Logo = () => (
    <>
      {/* <Badge.Ribbon text="admin" placement="end" color="gold"></Badge.Ribbon> */}
      <div className="sider-weblogo admin">5G-V2X</div>
    </>
  );
  const SignOutButton = () => {
    const signOut = () => {
      AuthService.logout(
        ({ data }) => {
          console.log(data);
          window.location.reload();
        },
        (response) => {
          console.log(response.message);
        }
      );
    };
    return (
      <Button
        type="link"
        size="large"
        icon={<LogoutOutlined />}
        className="sider-bottom-button"
        onClick={signOut}
      >
        Sign Out
      </Button>
    );
  };
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
        "@primary-color": "#5272cc",
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
        <Header
          style={{
            padding: 0,
            backgroundColor: "white",
            paddingRight: "5px",
            height: "48px",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
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
            bottom={<SignOutButton />}
          />
          <Content className="content">
            {pageListGroup[firstIndex].pageList[secondIndex].component}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default Admin;
