import { React, useState, useEffect } from "react";
import { Layout, Row, Col, DatePicker } from "antd";
import { DashbordCardLoading } from "../../components/common/DashbordCard";
import HeatMapCalendar from "../../components/common/HeatMapCalendar";
import TimeBarChart from "../../components/common/TimeBarChart";
import { DrowsinessService } from "../../utils/api";
import dayjs from "dayjs";
const { Content } = Layout;
const { RangePicker } = DatePicker;

const DrowsinessStatistics = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [calendar, setCalendar] = useState(dayjs().year());
  const [timeBarData, setTimeBarData] = useState([0]);
  const [timeBar, setTimeBar] = useState([dayjs(), dayjs()]);
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [timeBarLoading, setTimeBarLoading] = useState(true);
  useEffect(() => {
    fetchStatCalendar(calendar);
  }, [calendar]);
  useEffect(() => {
    fetchStatTimeBar(timeBar);
  }, [timeBar]);
  const fetchStatCalendar = (year) => {
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
          <Col xs={24} lg={10}>
            <DashbordCardLoading
              width="420px"
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
                height="220px"
                style={{ width: "100%" }}
              />
            </DashbordCardLoading>
          </Col>
          <Col xs={24} lg={10}>
            <DashbordCardLoading
              width="420px"
              loading={timeBarLoading}
              title="Hour on day"
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
        </Row>
      </Content>
    </Layout>
  );
};
export default DrowsinessStatistics;
