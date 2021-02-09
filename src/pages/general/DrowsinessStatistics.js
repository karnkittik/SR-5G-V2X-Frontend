import { React, useState, useEffect } from "react";
import { Layout, Row, Col } from "antd";
import DashbordCard, {
  DashbordCardLoading,
} from "../../components/common/DashbordCard";
import HeatMapCalendar from "../../components/common/HeatMapCalendar";
import TimeBarChart from "../../components/common/TimeBarChart";
import { DrowsinessService } from "../../utils/api";
const { Content, Header } = Layout;
const DrowsinessStatistics = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [timeBarData, setTimeBarData] = useState([0]);
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [timeBarLoading, setTimeBarLoading] = useState(true);
  useEffect(() => {
    fetchStatCalendar();
    fetchStatTimeBar();
  }, []);
  const fetchStatCalendar = () => {
    DrowsinessService.fetchStatCalendar(
      ({ data }) => {
        setCalendarData(data);
        setCalendarLoading(false);
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
        setTimeBarLoading(false);
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
            <DashbordCardLoading loading={calendarLoading}>
              <HeatMapCalendar
                title="Drowsiness Heatmap Calendar"
                data={calendarData}
              />
            </DashbordCardLoading>
          </Col>
          <Col xs={24} lg={12}>
            <DashbordCardLoading loading={timeBarLoading}>
              <TimeBarChart title="Drowsiness on Hour" data={timeBarData} />
            </DashbordCardLoading>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default DrowsinessStatistics;
