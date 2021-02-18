import React, { useState, useEffect } from "react";
import { Layout, Badge, Button } from "antd";
import Sider from "../../components/common/Sider";
import {
  LogoutOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
  TeamOutlined,
  CarOutlined,
} from "@ant-design/icons";
import AccidentMap from "./AccidentMap";
import DrowsinessMap from "./DrowsinessMap";
import Driver from "./Driver";
import Car from "./Car";
import { AuthService } from "../../utils/api";

const { Content } = Layout;
const Admin = () => {
  const pageListGroup = [
    {
      name: "Overview",
      pageList: [
        {
          title: "Accident Map",
          component: <AccidentMap />,
          icon: <ExclamationCircleOutlined />,
        },
        {
          title: "Drowsiness Map",
          component: <DrowsinessMap />,
          icon: <EyeOutlined />,
        },
      ],
    },
    {
      name: "Driver",
      pageList: [
        {
          title: "Driver",
          component: <Driver />,
          icon: <TeamOutlined />,
        },
      ],
    },
    {
      name: "Car",
      pageList: [
        {
          title: "Car List",
          component: <Car />,
          icon: <CarOutlined />,
        },
      ],
    },
  ];
  const pageIndex = pageListGroup.map((group) => group.pageList.length);
  const Logo = () => (
    <>
      <Badge.Ribbon text="admin" placement="end" color="gold"></Badge.Ribbon>
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
        "@primary-color": "#5272c2",
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
          bottom={<SignOutButton />}
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
export default Admin;
