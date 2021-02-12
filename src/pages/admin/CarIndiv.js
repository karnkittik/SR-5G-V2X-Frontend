import { useHistory, useParams } from "react-router-dom";
import { Layout, Table, Button, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DashbordCard, {
  ContentCard,
  CountCard,
  DashbordCardLoading,
} from "../../components/common/DashbordCard";
import dayjs from "dayjs";
import { CarSerivce } from "../../utils/api";
import { useEffect, useState } from "react";
const { Header, Content } = Layout;
export const ProfileCar = (props) => {
  const columns = [
    {
      title: "Car Detail",
      dataIndex: "car_detail",
      key: "car_detail",
      render: (text, record) => (
        <div style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {text}
        </div>
      ),
    },
    {
      title: "License Plate Number",
      dataIndex: "vehicle_registration_number",
      key: "vehicle_registration_number",
    },
    {
      title: "Reg Date",
      key: "registered_at",
      render: (text, record) => (
        <div>
          {!record.registered_at
            ? ""
            : dayjs(record.registered_at).format("DD/MM/YYYY")}
        </div>
      ),
    },
    {
      title: "Mfg Date",
      key: "created_at",
      render: (text, record) => (
        <div>
          {!record.created_at
            ? ""
            : dayjs(record.created_at).format("DD/MM/YYYY")}
        </div>
      ),
    },
    {
      title: "Car Age",
      key: "age",
      render: (text, record) => (
        <div>
          {!record.created_at
            ? ""
            : dayjs().from(dayjs(record.created_at)).substr(3)}
        </div>
      ),
    },
  ];

  return (
    <ContentCard>
      <div className="title-card">Profile</div>
      <Row>
        <Col xs={24}>
          <Table
            columns={columns}
            dataSource={props.data}
            rowKey="driver_id"
            pagination={false}
            loading={props.loading}
          />
        </Col>
      </Row>
    </ContentCard>
  );
};
const CarIndiv = () => {
  let history = useHistory();
  const { car_id } = useParams();
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCar();
  }, []);
  const fetchCar = () => {
    CarSerivce.fetchCar(
      car_id,
      ({ data }) => {
        data.accident_count = data.accident.length;
        data.drowsiness_count = data.drowsiness.length;
        console.log(data);
        setCarData(data);
        setLoading(false);
        console.log(data);
      },
      (response) => {
        console.log(response.message);
      }
    );
  };
  return (
    <Layout>
      <Header className="header">
        <div className="header-title">Car Information</div>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          className="car-back-btn"
          onClick={() => {
            history.push("/admin/car");
          }}
        />
      </Header>
      <Content className="real-content">
        <Row style={{ height: "100%", backgroundColor: "white" }}>
          <Col xs={24}>
            <DashbordCard height="auto">
              <ProfileCar
                data={[carData.car ? carData.car : {}]}
                loading={loading}
              />
            </DashbordCard>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <DashbordCardLoading height="auto" loading={loading}>
              <CountCard
                title="Accident Count"
                count={carData.accident_count}
              />
            </DashbordCardLoading>
          </Col>
          <Col xs={12}>
            <DashbordCardLoading height="auto" loading={loading}>
              <CountCard
                title="Drowsiness Count"
                count={carData.drowsiness_count}
              />
            </DashbordCardLoading>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default CarIndiv;
