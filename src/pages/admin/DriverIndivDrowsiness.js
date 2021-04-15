import dayjs from "dayjs";
import { Table, Row, Col } from "antd";
import DashbordCard, {
  ContentCard,
  CountCard,
  DashbordCardLoading,
} from "../../components/common/DashbordCard";
import TimeBarChart from "../../components/common/TimeBarChart";
import { ProfileDriver } from "./DriverIndiv";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { DriverService } from "../../utils/api";

const DriverIndivDrowsiness = () => {
  const columns = [
    {
      title: "Time",
      key: "time",
      render: (text, record) => (
        <div>{dayjs(record.time).format("DD/MM/YYYY HH:mm ")}</div>
      ),
      align: "center",
    },
    {
      title: "Coordinate",
      key: "coordinate",
      render: (text, record) => (
        <div>{`${record.lat.toFixed(6)}, ${record.lng.toFixed(6)}`}</div>
      ),
      align: "center",
    },
    {
      title: "Response Time (s)",
      key: "response_time",
      render: (text, record) => (
        <div>{`${record.response_time.toFixed(2)}`}</div>
      ),
      align: "center",
    },
    {
      title: "Driving Time (hour)",
      key: "working_hour",
      render: (text, record) => (
        <div>{`${record.working_hour.toFixed(2)}`}</div>
      ),
      align: "center",
    },
  ];
  const { driver_id } = useParams();
  const [drowsinessData, setDrowsinessData] = useState([]);
  const [timeBarData, setTimeBarData] = useState([0]);
  const [drowsinessLoading, setDrowsinessLoading] = useState(true);
  const [timeBarLoading, setTimeBarLoading] = useState(true);
  useEffect(() => {
    fetchDrowsiness(driver_id);
    fetchDrowsinessTimeBar(driver_id);
  }, [driver_id]);
  const fetchDrowsiness = (driver_id) => {
    DriverService.fetchDrowsiness(
      driver_id,
      ({ data }) => {
        setDrowsinessData(data);
        setDrowsinessLoading(false);
        console.log(data);
      },
      (response) => {
        console.log(response.message);
      }
    );
  };
  const fetchDrowsinessTimeBar = (driver_id) => {
    DriverService.fetchDrowsinessTimeBar(
      driver_id,
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
    <>
      <Row>
        <Col xs={24} lg={11}>
          <Row>
            <Col xs={12} lg={12}>
              <DashbordCardLoading
                title="Avg 1st Time"
                notHideTitle={true}
                loading={drowsinessLoading}
              >
                <div className="count">
                  <div>
                    {drowsinessData.avg1stDrivingHour
                      ? Math.floor(drowsinessData.avg1stDrivingHour) +
                        "hr " +
                        Math.floor(
                          (drowsinessData.avg1stDrivingHour -
                            Math.floor(drowsinessData.avg1stDrivingHour)) *
                            60
                        ) +
                        "min"
                      : "-"}
                  </div>
                </div>
              </DashbordCardLoading>
            </Col>
            <Col xs={12} lg={12}>
              <DashbordCardLoading
                notHideTitle={true}
                title="Avg Response Time"
                loading={drowsinessLoading}
              >
                <div className="count">
                  <div>
                    {drowsinessData.avgResponse
                      ? drowsinessData.avgResponse.toFixed(2) + " s"
                      : "-"}
                  </div>
                </div>
              </DashbordCardLoading>
            </Col>
          </Row>
          <DashbordCardLoading
            notHideTitle={true}
            title="Hourly Drowsiness"
            disablePaddingBottom={true}
            loading={timeBarLoading}
          >
            <TimeBarChart data={timeBarData} height="220px" />
          </DashbordCardLoading>
        </Col>
        <Col xs={24} lg={13}>
          <DashbordCardLoading
            notHideTitle={true}
            title="Drowsiness Records"
            loading={drowsinessLoading}
          >
            <Table
              columns={columns}
              dataSource={drowsinessData.records}
              rowKey={(record) => "drowsiness" + record.time + record.username}
              pagination={{
                pageSize: 5,
                showTotal: (total) => `Total ${total} items`,
                showSizeChanger: false,
              }}
              size="small"
              scroll={{ x: 568 }}
            />
          </DashbordCardLoading>
        </Col>
      </Row>
    </>
  );
};
export default DriverIndivDrowsiness;
