import { React } from "react";
import { Layout } from "antd";
import PageHeader from "../components/common/PageHeader";
const { Content } = Layout;

const Drowsiness = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <PageHeader title="อาการง่วงนอนทั้งหมด" />
      <Content className="content"></Content>
    </Layout>
  );
};
export default Drowsiness;
