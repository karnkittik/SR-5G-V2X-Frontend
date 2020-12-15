import { React } from "react";
import { Layout } from "antd";
import PageHeader from "../components/common/PageHeader";
const { Content } = Layout;

const AccidentDay = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <PageHeader title="ภาพรวมอุบัติเหตุรายวัน" />
      <Content className="content"></Content>
    </Layout>
  );
};
export default AccidentDay;
