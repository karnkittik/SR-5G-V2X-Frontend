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
      title: "License Plate Number",
      dataIndex: "vehicle_registration_number",
      align: "center",
    },
    {
      title: "Car Detail",
      dataIndex: "car_detail",
      render: (text, record) => (
        <div style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {text}
        </div>
      ),
      align: "center",
    },
    {
      title: "Reg Date",
      render: (text, record) => (
        <div>
          {!record.registered_at
            ? ""
            : dayjs(record.registered_at).format("DD/MM/YYYY")}
        </div>
      ),
      align: "center",
    },
    {
      title: "Mfg Date",
      render: (text, record) => (
        <div>
          {!record.mfg_at ? "" : dayjs(record.mfg_at).format("DD/MM/YYYY")}
        </div>
      ),
      align: "center",
    },
    {
      title: "Car Age",
      render: (text, record) => (
        <div>
          {!record.mfg_at ? "" : dayjs().from(dayjs(record.mfg_at)).substr(3)}
        </div>
      ),
      align: "center",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={props.data}
      rowKey={(record) => record.car_id + "indiv"}
      pagination={false}
      size="small"
      bordered={false}
      loading={props.loading}
      scroll={{ x: 768 }}
    />
  );
};
const CarIndiv = () => {
  let history = useHistory();
  const { car_id } = useParams();
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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
    fetchCar();
  }, [car_id]);
  return (
    <Layout style={{ height: "100%" }}>
      <Content className="real-content">
        <Row>
          <Col xs={24}>
            <DashbordCardLoading
              notHideTitle={true}
              title="Car Information"
              back={
                <Button
                  type="text"
                  icon={<ArrowLeftOutlined />}
                  onClick={() => {
                    history.push("/admin/car");
                  }}
                />
              }
            >
              <ProfileCar
                data={[carData.car ? carData.car : {}]}
                loading={loading}
              />
            </DashbordCardLoading>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <DashbordCardLoading
              notHideTitle={true}
              loading={loading}
              title="Accident Count"
            >
              <div className="count">
                <div>{carData.accident_count || 0}</div>
              </div>
            </DashbordCardLoading>
          </Col>
          <Col xs={12}>
            <DashbordCardLoading
              notHideTitle={true}
              loading={loading}
              title="Drowsiness Count"
            >
              <div className="count">
                <div>{carData.drowsiness_count || 0}</div>
              </div>
            </DashbordCardLoading>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default CarIndiv;
