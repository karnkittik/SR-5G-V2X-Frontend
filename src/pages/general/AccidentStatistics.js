import { React, useEffect, useState } from "react";
import { Layout, Row, Col } from "antd";
import { DashbordCardLoading } from "../../components/common/DashbordCard";
import HeatMapCalendar from "../../components/common/HeatMapCalendar";
import TimeBarChart from "../../components/common/TimeBarChart";
import { AccidentService } from "../../utils/api";
const { Content, Header } = Layout;
const AccidentStatistics = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [timeBarData, setTimeBarData] = useState([0]);
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [timeBarLoading, setTimeBarLoading] = useState(true);
  useEffect(() => {
    fetchStatCalendar();
    fetchStatTimeBar();
  }, []);
  const fetchStatCalendar = () => {
    AccidentService.fetchStatCalendar(
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
    AccidentService.fetchStatTimeBar(
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
        <div className="header-title">Accident Statistics</div>
      </Header>
      <Content className="real-content">
        <Row>
          <Col xs={24} lg={12}>
            <DashbordCardLoading loading={calendarLoading}>
              <HeatMapCalendar
                title="Accident Heatmap Calendar"
                data={calendarData}
                style={{ height: "100%" }}
              />
            </DashbordCardLoading>
          </Col>
          <Col xs={24} lg={12}>
            <DashbordCardLoading loading={timeBarLoading}>
              <TimeBarChart title="Accident on Hour" data={timeBarData} />
            </DashbordCardLoading>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default AccidentStatistics;
