import { React, useEffect, useState } from "react";
import { Layout, Row, Col } from "antd";
import DashbordCard from "../../components/common/DashbordCard";
import HeatMapCalendar from "../../components/common/HeatMapCalendar";
import PieChart from "../../components/common/PieChart";
import TimeBarChart from "../../components/common/TimeBarChart";
import { AccidentService } from "../../utils/api";
const { Content, Header } = Layout;
const AccidentStatistics = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [roadPieData, setRoadPieData] = useState({});
  const [timeBarData, setTimeBarData] = useState([0]);
  useEffect(() => {
    fetchStatCalendar();
    fetchStatRoadPie();
    fetchStatTimeBar();
  }, []);
  const fetchStatCalendar = () => {
    AccidentService.fetchStatCalendar(
      ({ data }) => {
        setCalendarData(data);
        console.log(data);
      },
      (response) => {
        console.log(response.message);
      }
    );
  };
  const fetchStatRoadPie = () => {
    AccidentService.fetchStatRoadPie(
      ({ data }) => {
        setRoadPieData(data);
        console.log(data);
      },
      (response) => {
        console.log(response.message);
      }
    );
  };
  const fetchStatTimeBar = () => {
    AccidentService.fetchStatTimeBar(
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
        <div className="header-title">Accident Statistics</div>
      </Header>
      <Content className="real-content">
        <Row>
          <Col xs={24} lg={12}>
            <DashbordCard className="accident-stat-calendar">
              <HeatMapCalendar
                title="Accident Heatmap Calendar"
                data={calendarData}
              />
            </DashbordCard>
          </Col>
          <Col xs={24} lg={12}>
            <DashbordCard className="accident-stat-timechart">
              <TimeBarChart title="Accident on Hour" data={timeBarData} />
            </DashbordCard>
          </Col>
        </Row>
        <Row>
          <Col xs={24} lg={12}>
            <DashbordCard className="accident-stat-pie">
              <PieChart data={roadPieData} title="Accident On Road" />
            </DashbordCard>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default AccidentStatistics;
