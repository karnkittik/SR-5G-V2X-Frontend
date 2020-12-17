import { React } from "react";
import { Layout } from "antd";
import PageHeader from "../components/common/PageHeader";
import MyMapComponent from "../components/common/Map";
import Coordinate from "../mock/Coordinate";
const { Content } = Layout;

const AccidentMap = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <PageHeader title={"อุบัติเหตุทั้งหมด"} />
      <Content className="accidentmap-content" style={{ height: "100%" }}>
        <MyMapComponent markers={Coordinate} />
      </Content>
    </Layout>
  );
};
export default AccidentMap;
