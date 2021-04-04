import React, { useState, useEffect } from "react";
import { Layout, Table } from "antd";
import dayjs from "dayjs";
import { AddCarModal } from "../../components/AddCarModal";
import { useHistory } from "react-router-dom";
import { CarSerivce } from "../../utils/api";
import { DashbordCardLoading } from "../../components/common/DashbordCard";

const { Content } = Layout;

const columns = [
  {
    title: "License Plate Number",
    dataIndex: "vehicle_registration_number",
    key: "vehicle_registration_number",
    width: "25%",
    align: "center",
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
    align: "center",
  },

  {
    title: "Reg Date",
    key: "registered_at",
    render: (text, record) => (
      <div>{dayjs(record.registered_at).format("DD/MM/YYYY")}</div>
    ),
    align: "center",
  },
  {
    title: "Mfg Date",
    key: "mfg_at",
    render: (text, record) => (
      <div>{dayjs(record.mfg_at).format("DD/MM/YYYY")}</div>
    ),
    align: "center",
  },
  {
    title: "Car Age",
    key: "age",
    render: (text, record) => (
      <div>{dayjs().from(dayjs(record.mfg_at)).substr(3)}</div>
    ),
    align: "center",
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
        setCarData(data.reverse());
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
      <Content className="children-page-content">
        <DashbordCardLoading
          loading={loading}
          title="Car List"
          width="calc(100% - 20px)"
          height="calc(100vh - 70px)"
          disablePaddingBottom={true}
          header={<AddCarModal refresh={fetchAllCar} setLoading={setLoading} />}
        >
          <Table
            size="small"
            columns={columns}
            dataSource={carData}
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Total ${total} items`,
              showSizeChanger: false,
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
        </DashbordCardLoading>
      </Content>
    </Layout>
  );
};
export default CarList;
