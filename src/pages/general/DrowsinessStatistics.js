import { React } from "react";
import { Layout, Row, Col } from "antd";
import DashbordCard from "../../components/common/DashbordCard";
import HeatMapCalendar from "../../components/common/HeatMapCalendar";
import PieChart from "../../components/common/PieChart";
import {
  AccidentHeatMap,
  AccidentRoadPie,
  AccidentTimeBar,
} from "../../mock/Statistics";
import TimeBarChart from "../../components/common/TimeBarChart";
const { Content, Header } = Layout;
const DrowsinessStatistics = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="header-title">Drowsiness Statistics</div>
      </Header>
      <Content className="real-content">
        <Row>
          <Col xs={24} lg={12}>
            <DashbordCard className="accident-stat-calendar">
              <HeatMapCalendar
                title="Drowsiness Heatmap Calendar"
                data={AccidentHeatMap}
              />
            </DashbordCard>
          </Col>
          <Col xs={24} lg={12}>
            <DashbordCard className="accident-stat-timechart">
              <TimeBarChart title="Drowsiness on Hour" data={AccidentTimeBar} />
            </DashbordCard>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default DrowsinessStatistics;
