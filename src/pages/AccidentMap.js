import { React } from "react";
import { Layout } from "antd";
import PageHeader from "../components/common/PageHeader";
const { Content } = Layout;

const AccidentMap = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <PageHeader title="อุบัติเหตุทั้งหมด" />
      <Content className="content"></Content>
    </Layout>
  );
};
export default AccidentMap;
