import { React, useState, useEffect } from "react";
import { Layout, Row, Col, DatePicker, Select } from "antd";
import { DashbordCardLoading } from "../../components/common/DashbordCard";
import HeatMapCalendar from "../../components/common/HeatMapCalendar";
import TimeBarChart from "../../components/common/TimeBarChart";
import { DrowsinessService } from "../../utils/api";
import dayjs from "dayjs";
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const DrowsinessStatistics = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [calendar, setCalendar] = useState(dayjs().year());
  const [timeBarData, setTimeBarData] = useState([0]);
  const [timeBar, setTimeBar] = useState([dayjs(), dayjs()]);
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [timeBarLoading, setTimeBarLoading] = useState(true);
  const [type, setType] = useState("date");
  const [count, setCount] = useState(dayjs());
  const [countData, setCountData] = useState("-");
  const [countLoading, setCountLoading] = useState(true);
  useEffect(() => {
    fetchStatCalendar(calendar);
  }, [calendar]);
  useEffect(() => {
    fetchStatTimeBar(timeBar);
  }, [timeBar]);
  useEffect(() => {
    fetchStatCount(type, count);
  }, [type, count]);
  const fetchStatCount = (mode, date) => {
    setCountLoading(true);
    DrowsinessService.fetchStatCount(
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
    DrowsinessService.fetchStatCalendar(
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
  const fetchStatTimeBar = (timeBar) => {
    let payload = {
      start: dayjs(timeBar[0]).startOf("day").unix(),
      end: dayjs(timeBar[1]).endOf("day").unix(),
    };
    setTimeBarLoading(true);
    DrowsinessService.fetchStatTimeBar(
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
              // width="420px"
              loading={calendarLoading}
              title="Heatmap Calendar"
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
                height="320px"
                style={{ width: "100%" }}
              />
            </DashbordCardLoading>{" "}
          </Col>
          <Col xs={24} lg={12}>
            <DashbordCardLoading
              loading={countLoading}
              title="Total Drowsiness"
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
              // width="420px"
              loading={timeBarLoading}
              title="Hourly Drowsiness"
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
              <TimeBarChart data={timeBarData} height="190px" />
            </DashbordCardLoading>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default DrowsinessStatistics;
