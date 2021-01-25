import { React } from "react";
import { Layout, Row, Col } from "antd";
import DashbordCard from "../../components/common/DashbordCard";
import MyResponsiveCalendar from "../../components/HeatMapCalendar";
import MyResponsivePie from "../../components/common/PieChart";
import { AccidentRoadPie, AccidentTimeBar } from "../../mock/Statistics";
import MyResponsiveBar from "../../components/common/TimeBarChart";
const { Content, Header } = Layout;
const AccidentStatistics = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="header-title">Accident Statistics</div>
      </Header>
      <Content className="real-content">
        <Row>
          <Col xs={24} lg={12}>
            <DashbordCard className="accident-stat-calendar">
              <MyResponsiveCalendar />
            </DashbordCard>
          </Col>
          <Col xs={24} lg={12}>
            <DashbordCard className="accident-stat-timechart">
              <MyResponsiveBar
                title="Accident on Hour"
                data={AccidentTimeBar}
              />
            </DashbordCard>
          </Col>
        </Row>
        <Row>
          <Col xs={24} lg={12}>
            <DashbordCard className="accident-stat-pie">
              <MyResponsivePie
                data={AccidentRoadPie}
                title="Accident On Road"
              />
            </DashbordCard>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default AccidentStatistics;
