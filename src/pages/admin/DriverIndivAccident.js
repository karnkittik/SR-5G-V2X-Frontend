import dayjs from "dayjs";
import { Table, Row, Col } from "antd";
import {
  DriverAccidentTimeBar,
  DriverAccidentTimePie,
} from "../../mock/Driver";
import DashbordCard, {
  ContentCard,
} from "../../components/common/DashbordCard";
import PieChart from "../../components/common/PieChart";
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
  const { driver_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [accident, setAccident] = useState([]);
  useEffect(() => {
    fetchAccident();
  }, []);
  const fetchAccident = () => {
    DriverService.fetchAccident(
      driver_id,
      ({ data }) => {
        setAccident(data);
        setLoading(false);
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
          <DashbordCard height="420px">
            <ContentCard>
              <div className="title-card">Record</div>
              <Row>
                <Col xs={24}>
                  <Table
                    columns={columns}
                    dataSource={accident}
                    loading={loading}
                    rowKey="time"
                    pagination={{
                      pageSize: 3,
                      showTotal: (total) => `Total ${total} items`,
                    }}
                  />
                </Col>
              </Row>
            </ContentCard>
          </DashbordCard>
        </Col>
        <Col xs={24} lg={12}>
          <DashbordCard>
            <PieChart
              data={DriverAccidentTimePie}
              title="Accident Day & Night"
            />
          </DashbordCard>
          <DashbordCard>
            <TimeBarChart
              data={DriverAccidentTimeBar}
              title="Accident in Time"
            />
          </DashbordCard>
        </Col>
      </Row>
    </>
  );
};

export default DriverIndivAccident;
