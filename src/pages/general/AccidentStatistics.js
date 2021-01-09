import { React } from "react";
import { Layout, Row, Col } from "antd";
import MyResponsiveLine from "../../components/TimeLineChart";
import DashbordCard from "../../components/common/DashbordCard";
import MyResponsiveCalendar from "../../components/HeatMapCalendar";
import MyResponsivePie from "../../components/PieChart";
const { Content } = Layout;
const AccidentStatistics = () => {
  return (
    <Layout>
      <Content className="real-content">
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
        <Row>
          <Col xs={24} lg={12}>
            <DashbordCard className="accident-stat-pie">
              <MyResponsivePie />
            </DashbordCard>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default AccidentStatistics;
