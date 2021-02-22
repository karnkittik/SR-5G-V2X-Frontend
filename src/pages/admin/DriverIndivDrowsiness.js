import dayjs from "dayjs";
import { Table, Row, Col } from "antd";
import DashbordCard, {
  ContentCard,
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
      title: "Working Time (hour)",
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
      <Row style={{ height: "100%", backgroundColor: "white" }}>
        <Col xs={24} lg={11}>
          <DashbordCard height="auto">
            <ProfileDriver indiv="drowsiness" />
          </DashbordCard>
          <DashbordCardLoading loading={timeBarLoading}>
            <TimeBarChart data={timeBarData} title="Drowsiness on Hour" />
          </DashbordCardLoading>
        </Col>
        <Col xs={24} lg={13}>
          <DashbordCard height="auto">
            <ContentCard>
              <div className="title-card">Record</div>
              <Row>
                <Col xs={24}>
                  <Table
                    columns={columns}
                    dataSource={drowsinessData}
                    loading={drowsinessLoading}
                    rowKey={(record) =>
                      "drowsiness" + record.time + record.username
                    }
                    pagination={{
                      pageSize: 6,
                      showTotal: (total) => `Total ${total} items`,
                    }}
                  />
                </Col>
              </Row>
            </ContentCard>
          </DashbordCard>
        </Col>
      </Row>
    </>
  );
};
export default DriverIndivDrowsiness;
