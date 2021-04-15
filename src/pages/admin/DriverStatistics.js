import React from "react";
import { Layout } from "antd";
const { Content, Header } = Layout;

const DriverStatistics = () => {
  return (
    <Layout style={{ height: "100%" }}>
      <Header className="header">
        <div className="header-title">Driver Statistics</div>
      </Header>
      <Content className="children-page-content"></Content>
    </Layout>
  );
};
export default DriverStatistics;
