import dayjs from "dayjs";
import { Table, Row, Col } from "antd";
import {
  DriverAccident,
  DriverAccidentTimeBar,
  DriverAccidentTimePie,
} from "../../mock/Driver";
import DashbordCard from "../../components/common/DashbordCard";
import PieChart from "../../components/common/PieChart";
import TimeBarChart from "../../components/common/TimeBarChart";
import { ProfileDriver } from "./DriverIndiv";
const DriverIndivAccident = () => {
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
      title: "Road Name",
      dataIndex: "roadname",
      key: "roadname",
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
              data={DriverAccidentTimePie}
              title="Accident Day & Night"
            />
          </DashbordCard>
        </Col>
        <Col xs={24} lg={12}>
          <DashbordCard>
            <TimeBarChart
              data={DriverAccidentTimeBar}
              title="Accident in Time"
            />
          </DashbordCard>
          <Table
            columns={columns}
            dataSource={DriverAccident}
            rowKey="time"
            pagination={{
              pageSize: 4,
              showTotal: (total) => `Total ${total} items`,
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default DriverIndivAccident;
