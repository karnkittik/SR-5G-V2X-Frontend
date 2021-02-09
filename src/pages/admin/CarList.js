import React, { useState, useEffect } from "react";
import { Layout, Table } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AddCarModal } from "../../components/AddCarModal";
import { useHistory } from "react-router-dom";
import { CarSerivce } from "../../utils/api";
dayjs.extend(relativeTime);
const { Content, Header } = Layout;

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

const CarList = () => {
  let history = useHistory();
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAllCar();
  }, []);
  const fetchAllCar = () => {
    CarSerivce.fetchAllCar(
      ({ data }) => {
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
    <Layout style={{ height: "100%" }}>
      <Header className="header">
        <AddCarModal />
        <div className="header-title">Car List</div>
      </Header>
      <Content>
        <Table
          columns={columns}
          dataSource={carData}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Total ${total} items`,
          }}
          loading={loading}
          rowKey="car_id"
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: (event) => {
                history.push(`/admin/car/${record.car_id}`);
              },
            };
          }}
        />
      </Content>
    </Layout>
  );
};
export default CarList;
