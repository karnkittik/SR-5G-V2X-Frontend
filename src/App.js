import React, { useState } from "react";
import { Layout } from "antd";
import Sider from "./Sider";
import "./App.css";
import AccidentMap from "./pages/AccidentMap";
import AccidentHeatMap from "./pages/AccidentHeatMap";
import AccidentStatistics from "./pages/AccidentStatistics";

const { Content } = Layout;
const App = () => {
  const pageList = {
    1: <AccidentMap />,
    2: <AccidentHeatMap />,
    3: <AccidentStatistics />,
  };

  const [render, updateRender] = useState(1);

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
      <Layout style={{ height: "100vh" }}>
        <Sider handleClick={handleMenuClick} />
        <Layout>
          <Content className="content">{pageList[render]}</Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default App;
