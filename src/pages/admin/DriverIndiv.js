import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Layout, Table, Menu, Button, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { DriverData } from "../../mock/Driver";
import { ContentCard } from "../../components/common/DashbordCard";
import dayjs from "dayjs";
import DriverIndivAccident from "./DriverIndivAccident";
import DriverIndivDrowsiness from "./DriverIndivDrowsiness";
const { Header, Content } = Layout;

export const ProfileDriver = () => {
  const { driver_id: id } = useParams();
  const columns = [
    {
      title: "ID",
      dataIndex: "driver_id",
      key: "id",
    },
    {
      title: "Name",
      key: "name",
      render: (text, record) => (
        <div>{`${record.firstname} ${record.lastname}`}</div>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Age",
      key: "age",
      render: (text, record) => (
        <div>{dayjs().from(dayjs(record.DOB)).substr(3)}</div>
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
            dataSource={[
              DriverData[DriverData.findIndex((x) => x.driver_id === id)],
            ]}
            rowKey="driver_id"
            pagination={false}
          />
        </Col>
      </Row>
    </ContentCard>
  );
};
const DriverComp = {
  0: <DriverIndivAccident />,
  1: <DriverIndivDrowsiness />,
};
const DriverIndiv = () => {
  const { driver_id: id } = useParams();
  let history = useHistory();
  const [render, updateRender] = useState(0);
  const handleClick = (menu) => {
    updateRender(menu.key);
  };
  return (
    <Layout>
      <Header className="header">
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["0"]}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              history.push("/admin");
            }}
          />
          <Menu.Item key="0" className="driver-menu" onClick={handleClick}>
            Accident
          </Menu.Item>
          <Menu.Item key="1" className="driver-menu" onClick={handleClick}>
            Drowsiness
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="real-content">{DriverComp[render]}</Content>
    </Layout>
  );
};
export default DriverIndiv;
