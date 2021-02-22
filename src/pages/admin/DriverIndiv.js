import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Layout, Table, Menu, Button, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ContentCard } from "../../components/common/DashbordCard";
import dayjs from "dayjs";
import DriverIndivAccident from "./DriverIndivAccident";
import DriverIndivDrowsiness from "./DriverIndivDrowsiness";
import { DriverService } from "../../utils/api";
const { Header, Content } = Layout;

export const ProfileDriver = (props) => {
  const { driver_id } = useParams();
  const columns = [
    {
      title: "Name",
      key: "name_profile",
      render: (text, record) => (
        <div>
          {!record.firstname || !record.lastname
            ? ""
            : `${record?.firstname} ${record?.lastname}`}
        </div>
      ),
      align: "center",
    },
    {
      title: "Username",
      key: "username_profile",
      dataIndex: "username",
      align: "center",
    },
    {
      title: "Gender",
      key: "gender_profile",
      dataIndex: "gender",
      align: "center",
    },
    {
      title: "Age",
      key: "age_profile",
      render: (text, record) => (
        <div>
          {!record.date_of_birth
            ? ""
            : dayjs().from(dayjs(record.date_of_birth)).substr(3)}
        </div>
      ),
      align: "center",
    },
  ];
  const [driverData, setDriverData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchDriver(driver_id);
  }, [driver_id]);

  const fetchDriver = (driver_id) => {
    DriverService.fetchDriver(
      driver_id,
      ({ data }) => {
        setDriverData(data);
        setLoading(false);
        console.log(data);
      },
      (response) => {
        console.log(response.message);
      }
    );
  };
  return (
    <ContentCard>
      <div className="title-card">Profile</div>
      <Row>
        <Col xs={24}>
          <Table
            columns={columns}
            dataSource={[driverData]}
            loading={loading}
            rowKey={(record) => record.driver_id + "profile"}
            pagination={false}
          />
        </Col>
      </Row>
    </ContentCard>
  );
};
const DriverComp = {
  accident: <DriverIndivAccident />,
  drowsiness: <DriverIndivDrowsiness />,
};
const DriverIndiv = () => {
  let history = useHistory();
  const [render, updateRender] = useState("accident");
  const handleClick = (menu) => {
    updateRender(menu.key);
  };
  return (
    <Layout>
      <Header className="header" style={{ paddingRight: "12px" }}>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={"accident"}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              history.push("/admin");
            }}
          />
          <Menu.Item
            key="accident"
            className="driver-menu"
            onClick={handleClick}
          >
            Accident
          </Menu.Item>
          <Menu.Item
            key="drowsiness"
            className="driver-menu"
            onClick={handleClick}
          >
            Drowsiness
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="real-content">{DriverComp[render]}</Content>
    </Layout>
  );
};
export default DriverIndiv;
