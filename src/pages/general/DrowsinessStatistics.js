import { React, useState, useEffect } from "react";
import { Layout, Row, Col } from "antd";
import DashbordCard from "../../components/common/DashbordCard";
import HeatMapCalendar from "../../components/common/HeatMapCalendar";
import PieChart from "../../components/common/PieChart";
import { AccidentHeatMap, AccidentTimeBar } from "../../mock/Statistics";
import TimeBarChart from "../../components/common/TimeBarChart";
import { DrowsinessService } from "../../utils/api";
const { Content, Header } = Layout;
const DrowsinessStatistics = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [timeBarData, setTimeBarData] = useState([0]);
  useEffect(() => {
    fetchStatCalendar();
    fetchStatTimeBar();
  }, []);
  const fetchStatCalendar = () => {
    DrowsinessService.fetchStatCalendar(
      ({ data }) => {
        setCalendarData(data);
        console.log(data);
      },
      (response) => {
        console.log(response.message);
      }
    );
  };
  const fetchStatTimeBar = () => {
    DrowsinessService.fetchStatTimeBar(
      ({ data }) => {
        setTimeBarData(data);
        console.log(data);
      },
      (response) => {
        console.log(response.message);
      }
    );
  };
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
                data={calendarData}
              />
            </DashbordCard>
          </Col>
          <Col xs={24} lg={12}>
            <DashbordCard className="accident-stat-timechart">
              <TimeBarChart title="Drowsiness on Hour" data={timeBarData} />
            </DashbordCard>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default DrowsinessStatistics;
