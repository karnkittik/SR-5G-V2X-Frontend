import { React, useEffect, useState } from "react";
import { Layout, Row, Col, DatePicker, Select } from "antd";
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
const { Option } = Select;

const AccidentStatistics = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [calendar, setCalendar] = useState(dayjs().year());
  const [topTen, setTopTen] = useState(dayjs().year());
  const [topTenData, setTopTenData] = useState([]);
  const [timeBarData, setTimeBarData] = useState([0]);
  const [timeBar, setTimeBar] = useState([dayjs(), dayjs()]);
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [topTenLoading, setTopTenLoading] = useState(true);
  const [timeBarLoading, setTimeBarLoading] = useState(true);
  const [type, setType] = useState("date");
  const [count, setCount] = useState(dayjs());
  const [countData, setCountData] = useState("-");
  const [countLoading, setCountLoading] = useState(true);

  useEffect(() => {
    fetchStatCalendar(calendar);
  }, [calendar]);
  useEffect(() => {
    fetchStatTopTen(topTen);
  }, [topTen]);
  useEffect(() => {
    fetchStatTimeBar(timeBar);
  }, [timeBar]);
  useEffect(() => {
    fetchStatCount(type, count);
  }, [type, count]);
  const fetchStatCount = (mode, date) => {
    setCountLoading(true);
    AccidentService.fetchStatCount(
      { mode, date: dayjs(date).startOf(mode).unix() },
      ({ data }) => {
        setCountData(data);
        setCountLoading(false);
        console.log(data);
      },
      (response) => {
        console.log(response.message);
      }
    );
  };
  const fetchStatCalendar = (year) => {
    setCalendarLoading(true);
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
    setTopTenLoading(true);
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
    setTimeBarLoading(true);
    let payload = {
      start: dayjs(timeBar[0]).startOf("day").unix(),
      end: dayjs(timeBar[1]).endOf("day").unix(),
    };
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
          <Col xs={24} lg={12}>
            <DashbordCardLoading
              loading={calendarLoading}
              title="Heatmap Calendar"
              // width="420px"
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
                height="258px"
                style={{ width: "100%" }}
              />
            </DashbordCardLoading>
            <DashbordCardLoading
              loading={timeBarLoading}
              title="Hourly Accident"
              // width="420px"
              disablePaddingBottom={true}
              header={
                <div>
                  <span className="date-label">Date: </span>
                  <RangePicker
                    defaultValue={[dayjs(), dayjs()]}
                    onChange={(value) => {
                      setTimeBar([
                        dayjs(value?.[0]?.$d),
                        dayjs(value?.[1]?.$d),
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
          <Col xs={24} lg={12}>
            <DashbordCardLoading
              loading={countLoading}
              title="Total Accident"
              header={
                <span>
                  <Select
                    value={type}
                    onChange={setType}
                    bordered={false}
                    style={{ width: "90px" }}
                  >
                    <Option value="date">Date</Option>
                    <Option value="week">Week</Option>
                    <Option value="month">Month</Option>
                    <Option value="quarter">Quarter</Option>
                    <Option value="year">Year</Option>
                  </Select>
                  {type === "date" ? (
                    <DatePicker
                      size="small"
                      onChange={(value) => setCount(value.$d)}
                      defaultValue={dayjs()}
                      bordered={false}
                      disabledDate={(current) => {
                        return current && current > dayjs().endOf("day");
                      }}
                      allowClear={false}
                      style={{ width: "120px" }}
                    />
                  ) : (
                    <DatePicker
                      style={{
                        width:
                          type === "week"
                            ? "110px"
                            : type === "year"
                            ? "75px"
                            : "100px",
                      }}
                      picker={type}
                      size="small"
                      defaultValue={dayjs()}
                      onChange={(value) => setCount(value.$d)}
                      bordered={false}
                      disabledDate={(current) => {
                        return current && current > dayjs().endOf(type);
                      }}
                      allowClear={false}
                    />
                  )}
                </span>
              }
            >
              <div className="count">
                <div>{countData}</div>
              </div>
            </DashbordCardLoading>
            <DashbordCardLoading
              loading={topTenLoading}
              title="Top 10 Roads"
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
