import React, { useState, useEffect } from "react";
import { Layout, Badge, Button } from "antd";
import Sider from "../../components/common/Sider";
import {
  LogoutOutlined,
  BellOutlined,
  ExclamationCircleOutlined,
  TeamOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import AccidentMap from "./AccidentMap";
import DrowsinessMap from "./DrowsinessMap";
import EmployeeList from "./EmployeeList";

const { Content, Header } = Layout;
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
          icon: <BellOutlined />,
        },
      ],
    },
    {
      name: "Employee",
      pageList: [
        {
          title: "Employee List",
          component: <EmployeeList />,
          icon: <TeamOutlined />,
        },
        {
          title: "Employee Statistic",
          component: <div></div>,
          icon: <LineChartOutlined />,
        },
      ],
    },
  ];
  const Logo = () => (
    <>
      <Badge.Ribbon text="admin" placement="end"></Badge.Ribbon>
      <div className="sider-weblogo admin">5G-V2X</div>
    </>
  );
  const SignOutButton = () => {
    let history = useHistory();
    const signOut = () => {
      console.log("sign out");
      cookie.remove("5G-V2X");
      history.push("/");
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
  const [firstLength, setFirstLength] = useState(
    pageListGroup[0].pageList.length
  );
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
  useEffect(() => {
    var a = render >= firstLength ? 1 : 0;
    var b = a ? render - a - 1 : render;
    setFirstIndex(a);
    setSecondIndex(b);
  }, [render, firstLength, firstIndex, secondIndex]);

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
          <Header className="header">
            <div className="header-title">
              {pageListGroup[firstIndex].pageList[secondIndex].title}
            </div>
          </Header>
          <Content className="content">
            {pageListGroup[firstIndex].pageList[secondIndex].component}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default Admin;
