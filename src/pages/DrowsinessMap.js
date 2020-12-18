import { React } from "react";
import { Layout } from "antd";
import PageHeader from "../components/common/PageHeader";
import MyMapComponent from "../components/common/Map";
import { Drowsiness } from "../mock/Coordinate";
const { Content } = Layout;

const DrowsinessMap = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <PageHeader title={"Drowsiness Heatmap"} />
      <Content className="fullmap-content" style={{ height: "100%" }}>
        <MyMapComponent zoom={16} isShownHere heatMapData={Drowsiness} />
      </Content>
    </Layout>
  );
};
export default DrowsinessMap;
