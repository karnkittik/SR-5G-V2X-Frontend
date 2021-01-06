import { React } from "react";
import { Layout, Row, Col } from "antd";
import PageHeader from "../components/common/PageHeader";
import MyResponsiveLine from "../components/TimeLineChart";
import DashbordCard from "../components/common/DashbordCard";
import MyResponsiveCalendar from "../components/HeatMapCalendar";
const { Content } = Layout;

const AccidentStatistics = () => {
  return (
    <Layout>
      <PageHeader title={"Accident Statistics"} />
      <Content style={{ height: "100%" }}>
        <Row>
          <Col xs={24} lg={12}>
            <DashbordCard className="accident-stat-calendar">
              <MyResponsiveCalendar />
            </DashbordCard>
          </Col>
          <Col xs={24} lg={12}>
            <DashbordCard className="accident-stat-timechart">
              <MyResponsiveLine />
            </DashbordCard>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default AccidentStatistics;
