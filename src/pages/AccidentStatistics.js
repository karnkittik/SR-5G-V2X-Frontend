import { React } from "react";
import { Layout } from "antd";
import PageHeader from "../components/common/PageHeader";

const { Content } = Layout;

const AccidentStatistics = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <PageHeader title={"Accident Statistics"} />
      <Content className="content"></Content>
    </Layout>
  );
};
export default AccidentStatistics;
