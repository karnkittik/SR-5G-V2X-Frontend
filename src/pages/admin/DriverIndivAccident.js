import dayjs from "dayjs";
import { Table, Row, Col } from "antd";
import DashbordCard, {
  ContentCard,
  DashbordCardLoading,
} from "../../components/common/DashbordCard";
import TimeBarChart from "../../components/common/TimeBarChart";
import { ProfileDriver } from "./DriverIndiv";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { DriverService } from "../../utils/api";
const DriverIndivAccident = () => {
  const columns = [
    {
      title: "Time",
      key: "time",
      render: (text, record) => (
        <div>{dayjs(record.time).format("DD/MM/YYYY HH:mm ")}</div>
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
      title: "Road",
      dataIndex: "road",
      key: "road",
    },
  ];
  const { driver_id } = useParams();
  const [accidentData, setAccidentData] = useState([]);
  const [timeBarData, setTimeBarData] = useState([0]);
  const [accidentLoading, setAccidentLoading] = useState(true);
  const [timeBarLoading, setTimeBarLoading] = useState(true);
  useEffect(() => {
    fetchAccident();
    fetchAccidentTimeBar();
  }, []);
  const fetchAccident = () => {
    DriverService.fetchAccident(
      driver_id,
      ({ data }) => {
        setAccidentData(data);
        setAccidentLoading(false);
        console.log(data);
      },
      (response) => {
        console.log(response.message);
      }
    );
  };
  const fetchAccidentTimeBar = () => {
    DriverService.fetchAccidentTimeBar(
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
            <TimeBarChart data={timeBarData} title="Accident on Hour" />
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
                    dataSource={accidentData}
                    loading={accidentLoading}
                    rowKey="Id"
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

export default DriverIndivAccident;
