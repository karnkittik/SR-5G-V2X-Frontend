import { React } from "react";
import { Layout } from "antd";
import PageHeader from "../components/common/PageHeader";

const { Content } = Layout;

const Accident = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <PageHeader title={"ภาพรวมอุบัติเหตุ"} />
      <Content className="content"></Content>
    </Layout>
  );
};
export default Accident;
