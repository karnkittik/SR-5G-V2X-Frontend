import React, { useState } from "react";
import { Layout } from "antd";
import Sider from "./Sider";
import "./App.less";

const { Content } = Layout;
const App = () => {
  const style = {
    fontSize: "30px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px 0",
  };

  const components = {
    1: <div style={style}>อุบัติเหตุทั้งหมด</div>,
    2: <div style={style}>อาการง่วงนอนทั้งหมด</div>,
    3: <div style={style}>ภาพรวมอุบัติเหตุ</div>,
    4: <div style={style}>ภาพรวมอุบัติเหตุรายวัน</div>,
  };

  const [render, updateRender] = useState(1);

  const handleMenuClick = (menu) => {
    updateRender(menu.key);
  };

  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider handleClick={handleMenuClick} />
        <Layout>
          <Content>{components[render]}</Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default App;
