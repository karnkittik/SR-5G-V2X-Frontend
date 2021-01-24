import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Layout, Table, Menu, Button, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  DriverAccident,
  DriverAccidentTimePie,
  DriverDrowsiness,
  DriverDrowsinessTimePie,
} from "../../mock/Driver";
import DashbordCard from "../../components/common/DashbordCard";
import MyResponsivePie from "../../components/common/PieChart";
import dayjs from "dayjs";
const { Header, Content } = Layout;
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
          <DashbordCard>
            <MyResponsivePie
              data={DriverAccidentTimePie}
              title="Accident on Shift"
            />
          </DashbordCard>
        </Col>
        <Col xs={24} lg={12}>
          <Table columns={columns} dataSource={DriverAccident} rowKey="time" />
        </Col>
      </Row>
    </>
  );
};

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
          <DashbordCard>
            <MyResponsivePie
              data={DriverDrowsinessTimePie}
              title="Drowsiness on Shift"
            />
          </DashbordCard>
        </Col>
        <Col xs={24} lg={12}>
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

const DriverComp = {
  0: <div></div>,
  1: <DriverIndivAccident />,
  2: <DriverIndivDrowsiness />,
};
const DriverIndiv = () => {
  const { driver_id: id } = useParams();
  let history = useHistory();
  const [render, updateRender] = useState(1);
  const handleClick = (menu) => {
    updateRender(menu.key);
  };
  return (
    <Layout>
      <Header className="header">
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              history.push("/admin");
            }}
          />
          <Menu.Item key="0" className="driver-menu" onClick={handleClick}>
            Profile
          </Menu.Item>
          <Menu.Item key="1" className="driver-menu" onClick={handleClick}>
            Accident
          </Menu.Item>
          <Menu.Item key="2" className="driver-menu" onClick={handleClick}>
            Drowsiness
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="real-content">{DriverComp[render]}</Content>
    </Layout>
  );
};
export default DriverIndiv;
