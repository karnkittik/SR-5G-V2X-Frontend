import { React, useEffect, useState } from "react";
import { Layout, Row, Col, DatePicker } from "antd";
import { DashbordCardLoading } from "../../components/common/DashbordCard";
import HeatMapCalendar from "../../components/common/HeatMapCalendar";
import PieChart from "../../components/common/PieChart";
import TimeBarChart from "../../components/common/TimeBarChart";
import { AccidentService } from "../../utils/api";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
dayjs.extend(objectSupport);
const { Content, Header } = Layout;
const { RangePicker } = DatePicker;

const AccidentStatistics = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [calendar, setCalendar] = useState(dayjs().year());
  const [roadPieData, setRoadPieData] = useState({});
  const [timeBarData, setTimeBarData] = useState([0]);
  const [timeBar, setTimeBar] = useState([dayjs().unix(), dayjs().unix()]);
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [roadPieLoading, setRoadPieLoading] = useState(true);
  const [timeBarLoading, setTimeBarLoading] = useState(true);
  useEffect(() => {
    fetchStatCalendar(calendar);
    fetchStatRoadPie();
    fetchStatTimeBar(timeBar);
  }, [calendar, timeBar]);
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
  const fetchStatRoadPie = () => {
    AccidentService.fetchStatRoadPie(
      ({ data }) => {
        setRoadPieData(data);
        setRoadPieLoading(false);
        console.log(data);
      },
      (response) => {
        console.log(response.message);
      }
    );
  };
  const fetchStatTimeBar = (timeBar) => {
    let payload = { start: timeBar[0], end: timeBar[1] };
    console.log(payload);
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
  function PickerWithType({ type, onChange, defaultValue }) {
    if (type === "date")
      return <DatePicker onChange={onChange} defaultValue={defaultValue} />;
    return (
      <DatePicker
        picker={type}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    );
  }
  return (
    <Layout>
      {/* <Header className="header">
        <div className="header-title">Accident Statistics</div>
      </Header> */}
      <Content className="real-content">
        {["date", "week", "month", "quarter", "year"].map((type) => (
          <PickerWithType
            type={type}
            onChange={(value) => {
              console.log(dayjs(value.$d).unix());
            }}
          />
        ))}
        <RangePicker
          picker="month"
          defaultValue={[dayjs(), dayjs()]}
          onChange={(value) => {
            console.log(dayjs(value?.[0]?.$d).unix());
            console.log(dayjs(value?.[1]?.$d).unix());
          }}
        />
        <Row>
          <Col xs={24} lg={12}>
            <DashbordCardLoading
              loading={calendarLoading}
              title="Accident Heatmap Calendar"
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
                height="160px"
                style={{ width: "100%" }}
              />
            </DashbordCardLoading>
            <DashbordCardLoading
              loading={timeBarLoading}
              title="Hour in day"
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
        </Row>
        <Row>
          <Col xs={24} lg={12}>
            <DashbordCardLoading loading={roadPieLoading}>
              <PieChart data={roadPieData} title="Accident On Road (Today)" />
            </DashbordCardLoading>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default AccidentStatistics;
