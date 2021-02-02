import dayjs from "dayjs";
import { Table, Row, Col } from "antd";
import DashbordCard from "../../components/common/DashbordCard";
import PieChart from "../../components/common/PieChart";
import {
  DriverDrowsiness,
  DriverDrowsinessTimeBar,
  DriverDrowsinessTimePie,
} from "../../mock/Driver";
import TimeBarChart from "../../components/common/TimeBarChart";
import { ProfileDriver } from "./DriverIndiv";

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
      dataIndex: "response",
      key: "response",
    },
    {
      title: "Working Time (min)",
      dataIndex: "working_time",
      key: "working_time",
    },
  ];
  return (
    <>
      <Row style={{ height: "100%", backgroundColor: "white" }}>
        <Col xs={24} lg={12}>
          <DashbordCard height="auto">
            <ProfileDriver />
          </DashbordCard>
          <DashbordCard>
            <PieChart
              data={DriverDrowsinessTimePie}
              title="Drowsiness Day & Night"
            />
          </DashbordCard>
        </Col>
        <Col xs={24} lg={12}>
          <DashbordCard>
            <TimeBarChart
              data={DriverDrowsinessTimeBar}
              title="Drowsiness on Hour"
            />
          </DashbordCard>
          <Table
            columns={columns}
            dataSource={DriverDrowsiness}
            rowKey="time"
          />
        </Col>
      </Row>
    </>
  );
};
export default DriverIndivDrowsiness;
