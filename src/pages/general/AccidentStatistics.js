import { React, useEffect, useState } from "react";
import { Layout, Row, Col, DatePicker } from "antd";
import { DashbordCardLoading } from "../../components/common/DashbordCard";
import HeatMapCalendar from "../../components/common/HeatMapCalendar";
import Ranking from "../../components/common/Ranking";
import TimeBarChart from "../../components/common/TimeBarChart";
import { AccidentService } from "../../utils/api";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
dayjs.extend(objectSupport);
const { Content } = Layout;
const { RangePicker } = DatePicker;

const AccidentStatistics = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [calendar, setCalendar] = useState(dayjs().year());
  const [topTen, setTopTen] = useState(dayjs().year());
  const [topTenData, setTopTenData] = useState([]);
  const [timeBarData, setTimeBarData] = useState([0]);
  const [timeBar, setTimeBar] = useState([dayjs().unix(), dayjs().unix()]);
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [topTenLoading, setTopTenLoading] = useState(true);
  const [timeBarLoading, setTimeBarLoading] = useState(true);
  useEffect(() => {
    fetchStatCalendar(calendar);
  }, [calendar]);
  useEffect(() => {
    fetchStatTopTen(topTen);
  }, [topTen]);
  useEffect(() => {
    fetchStatTimeBar(timeBar);
  }, [timeBar]);
  const fetchStatCalendar = (year) => {
    AccidentService.fetchStatCalendar(
      year,
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
  const fetchStatTopTen = (year) => {
    AccidentService.fetchStatTopTen(
      year,
      ({ data }) => {
        setTopTenData(data);
        setTopTenLoading(false);
        console.log(data);
      },
      (response) => {
        console.log(response.message);
      }
    );
  };
  const fetchStatTimeBar = (timeBar) => {
    let payload = { start: timeBar[0], end: timeBar[1] };
    AccidentService.fetchStatTimeBar(
      payload,
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
      <Content className="real-content">
        <Row>
          <Col xs={24} lg={10}>
            <DashbordCardLoading
              loading={calendarLoading}
              title="Heatmap Calendar"
              width="420px"
              disablePaddingBottom={true}
              header={
                <div>
                  <span className="date-label">Year: </span>
                  <DatePicker
                    picker="year"
                    placeholder="Year"
                    onChange={(value) => {
                      setCalendar(value?.$y);
                    }}
                    size="small"
                    defaultValue={dayjs()}
                    style={{ width: "75px" }}
                    disabledDate={(current) => {
                      return current && current > dayjs().endOf("year");
                    }}
                    bordered={false}
                  />
                </div>
              }
            >
              <HeatMapCalendar
                data={calendarData}
                height="220px"
                style={{ width: "100%" }}
              />
            </DashbordCardLoading>
            <DashbordCardLoading
              loading={timeBarLoading}
              title="Hour on day"
              width="420px"
              disablePaddingBottom={true}
              header={
                <div>
                  <span className="date-label">Date: </span>
                  <RangePicker
                    defaultValue={[dayjs(), dayjs()]}
                    onChange={(value) => {
                      setTimeBar([
                        dayjs(value?.[0]?.$d).unix(),
                        dayjs(value?.[1]?.$d).unix(),
                      ]);
                    }}
                    bordered={false}
                    size="small"
                    style={{ width: "240px" }}
                    disabledDate={(current) => {
                      return current && current > dayjs().endOf("day");
                    }}
                  />
                </div>
              }
            >
              <TimeBarChart data={timeBarData} height="200px" />
            </DashbordCardLoading>
          </Col>
          <Col xs={24} lg={8}>
            <DashbordCardLoading
              loading={topTenLoading}
              title="Top 10 Road"
              header={
                <div>
                  <span className="date-label">Year: </span>
                  <DatePicker
                    picker="year"
                    placeholder="Year"
                    onChange={(value) => {
                      setTopTen(value?.$y);
                    }}
                    size="small"
                    defaultValue={dayjs()}
                    style={{ width: "75px" }}
                    disabledDate={(current) => {
                      return current && current > dayjs().endOf("year");
                    }}
                    bordered={false}
                  />
                </div>
              }
            >
              <Ranking data={topTenData} loading={false} />
            </DashbordCardLoading>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default AccidentStatistics;
