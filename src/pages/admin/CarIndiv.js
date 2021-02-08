import { useHistory, useParams } from "react-router-dom";
import { Layout, Table, Button, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DashbordCard, {
  ContentCard,
  CountCard,
} from "../../components/common/DashbordCard";
import dayjs from "dayjs";
import { CarData } from "../../mock/Car";
const { Header, Content } = Layout;
export const ProfileCar = (props) => {
  const columns = [
    {
      title: "Car ID",
      dataIndex: "car_id",
      key: "car_id",
    },
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
        <div>{dayjs(record.registered_at).format("DD/MM/YYYY")}</div>
      ),
    },
    {
      title: "Mfg Date",
      key: "created_at",
      render: (text, record) => (
        <div>{dayjs(record.created_at).format("DD/MM/YYYY")}</div>
      ),
    },
    {
      title: "Car Age",
      key: "age",
      render: (text, record) => (
        <div>{dayjs().from(dayjs(record.created_at)).substr(3)}</div>
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
          />
        </Col>
      </Row>
    </ContentCard>
  );
};
const CarIndiv = () => {
  let history = useHistory();
  const { car_id: id } = useParams();
  const data = CarData.find((x) => x.car_id === id);
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
              <ProfileCar data={[data]} />
            </DashbordCard>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <DashbordCard height="auto">
              <CountCard title="Accident Count" count={data.accident_count} />
            </DashbordCard>
          </Col>
          <Col xs={12}>
            <DashbordCard height="auto">
              <CountCard
                title="Drowsiness Count"
                count={data.drowsiness_count}
              />
            </DashbordCard>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default CarIndiv;
