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
      key: "time_accident",
      render: (text, record) => (
        <div>{dayjs(record.accident.time).format("DD/MM/YYYY HH:mm ")}</div>
      ),
      align: "center",
    },
    {
      title: "Coordinate",
      key: "coordinate_accident",
      render: (text, record) => (
        <div>{`${record.accident.lat.toFixed(6)}, ${record.accident.lng.toFixed(
          6
        )}`}</div>
      ),
      align: "center",
    },
    {
      title: "Road",
      key: "road_accident",
      render: (text, record) => <div>{record.accident.road}</div>,
      align: "center",
    },
    {
      title: "License Plate Number",
      key: "vehicle_registration_number_accident",
      render: (text, record) => (
        <div>{record.car.vehicle_registration_number}</div>
      ),
      align: "center",
    },
  ];
  const { driver_id } = useParams();
  const [accidentData, setAccidentData] = useState([]);
  const [timeBarData, setTimeBarData] = useState([0]);
  const [accidentLoading, setAccidentLoading] = useState(true);
  const [timeBarLoading, setTimeBarLoading] = useState(true);
  useEffect(() => {
    fetchAccident(driver_id);
    fetchAccidentTimeBar(driver_id);
  }, [driver_id]);
  const fetchAccident = (driver_id) => {
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
  const fetchAccidentTimeBar = (driver_id) => {
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
    <Row>
      <Col xs={24} lg={11}>
        <DashbordCardLoading
          notHideTitle={true}
          title="Accident on Hour"
          loading={timeBarLoading}
        >
          <TimeBarChart
            data={timeBarData}
            disablePaddingBottom={true}
            height="220px"
          />
        </DashbordCardLoading>
      </Col>
      <Col xs={24} lg={13}>
        <DashbordCardLoading
          notHideTitle={true}
          title="Accident Records"
          loading={accidentLoading}
        >
          <Table
            columns={columns}
            dataSource={accidentData}
            rowKey={(record) =>
              "accident" + record.accident.time + record.accident.username
            }
            pagination={{
              pageSize: 6,
              showTotal: (total) => `Total ${total} items`,
              showSizeChanger: false,
            }}
            size="small"
            scroll={{ x: 568 }}
          />
        </DashbordCardLoading>
      </Col>
    </Row>
  );
};

export default DriverIndivAccident;
