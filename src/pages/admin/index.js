import React, { useState, useEffect } from "react";
import { Layout, Tag, Tooltip, Button, Badge } from "antd";
import Sider from "../../components/common/Sider";
import {
  LogoutOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
  TeamOutlined,
  CarOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BarChartOutlined,
  StarFilled,
} from "@ant-design/icons";
import AccidentMap from "./AccidentMap";
import DrowsinessMap from "./DrowsinessMap";
import AccidentStatistics from "../general/AccidentStatistics";
import DrowsinessStatistics from "../general/DrowsinessStatistics";
import Driver from "./Driver";
import Car from "./Car";
import { AuthService } from "../../utils/api";
import Drawer from "../../components/common/Drawer";

const { Content, Header } = Layout;
const Admin = (props) => {
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
          title: "Drowsiness Map",
          short: "Map",
          component: <DrowsinessMap location={props.location} />,
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
    {
      name: "Drivers",
      pageList: [
        {
          title: "Drivers",
          short: "Drivers",
          component: <Driver />,
          icon: <TeamOutlined />,
        },
      ],
    },
    {
      name: "Cars",
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
  const Logo = (props) => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.hideLogo && (
        <Badge
          count={<StarFilled style={{ color: "#faad14" }} />}
          className="hideOnDesktop"
        >
          <div className="sider-weblogo admin">5G-V2X</div>
        </Badge>
      )}
      <div
        className={
          "sider-weblogo admin" + (props.hideLogo ? " hideOnMobile" : "")
        }
      >
        5G-V2X
      </div>
      <Tag
        color="#faad14"
        style={{ margin: "0", fontWeight: "700" }}
        className={props.hideLogo ? " hideOnMobile" : ""}
      >
        admin
      </Tag>
    </div>
  );
  const SignOutButton = () => {
    const signOut = () => {
      AuthService.logout(
        ({ data }) => {
          //console.log(data);
          window.location.reload();
        },
        (response) => {
          //console.log(response.message);
        }
      );
    };
    return (
      <Tooltip placement="bottomLeft" title="Log Out">
        <Button
          type="link"
          size="large"
          icon={<LogoutOutlined />}
          onClick={signOut}
        />
      </Tooltip>
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
    document.title = "Admin 5G-V2X";
  }, []);
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
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
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
            <div className="header-title hideOnMobile">
              {pageListGroup[firstIndex].pageList[secondIndex].title}
            </div>
            <div className="header-title hideOnDesktop">
              {pageListGroup[firstIndex].name}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "auto",
            }}
          >
            <Logo hideLogo={true} />
            <div style={{ height: "100%", paddingTop: "2px" }}>
              <SignOutButton />
            </div>
          </div>
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
