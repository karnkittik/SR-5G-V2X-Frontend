import React, { useState } from "react";
import { Layout } from "antd";
import Sider from "./Sider";
import "./App.less";
import AccidentMap from "./pages/AccidentMap";
import DrowsinessMap from "./pages/DrowsinessMap";
import Accident from "./pages/Accident";
import AccidentDay from "./pages/AccidentDay";

const { Content } = Layout;
const App = () => {
  const pageList = {
    1: <AccidentMap />,
    2: <DrowsinessMap />,
    3: <Accident />,
    4: <AccidentDay />,
  };

  const [render, updateRender] = useState(1);

  const handleMenuClick = (menu) => {
    updateRender(menu.key);
  };

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
