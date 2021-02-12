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
        <div>{dayjs(record.time).format("DD/MM/YYYY h:mm ")}</div>
      ),
    },
    {
      title: "Coordinate",
      key: "coordinate",
      render: (text, record) => <div>{`${record.lat} ${record.lng}`}</div>,
    },
    {
      title: "CarID",
      dataIndex: "car_id",
      key: "car_id",
    },
    {
      title: "Response Time (s)",
      dataIndex: "response_time",
      key: "response_time",
    },
    {
      title: "Working Time (hour)",
      dataIndex: "working_hour",
      key: "working_hour",
    },
  ];
  const { driver_id } = useParams();
  const [drowsinessData, setDrowsinessData] = useState([]);
  const [timeBarData, setTimeBarData] = useState([0]);
  const [drowsinessLoading, setDrowsinessLoading] = useState(true);
  const [timeBarLoading, setTimeBarLoading] = useState(true);
  useEffect(() => {
    fetchDrowsiness();
    fetchDrowsinessTimeBar();
  }, []);
  const fetchDrowsiness = () => {
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
  const fetchDrowsinessTimeBar = () => {
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
        <Col xs={24} lg={12}>
          <DashbordCard height="auto">
            <ProfileDriver />
          </DashbordCard>
          <DashbordCardLoading loading={timeBarLoading}>
            <TimeBarChart data={timeBarData} title="Drowsiness on Hour" />
          </DashbordCardLoading>
        </Col>
        <Col xs={24} lg={12}>
          <DashbordCard height="auto">
            <ContentCard>
              <div className="title-card">Record</div>
              <Row>
                <Col xs={24}>
                  <Table
                    columns={columns}
                    dataSource={drowsinessData}
                    loading={drowsinessLoading}
                    rowKey="time"
                    pagination={{
                      pageSize: 10,
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
