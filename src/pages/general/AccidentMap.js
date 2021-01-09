import { React } from "react";
import { Layout } from "antd";
import MyMapComponent from "../../components/common/Map";
import { Accident } from "../../mock/Coordinate";
const { Content } = Layout;

const AccidentMap = () => {
  return (
    <Layout style={{ height: "100%" }}>
      <Content>
        <MyMapComponent markers={Accident} isShownHere />
      </Content>
    </Layout>
  );
};
export default AccidentMap;
