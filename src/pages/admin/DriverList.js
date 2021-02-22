import React, { useState, useEffect } from "react";
import { Layout, Table } from "antd";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import { AddDriverModal } from "../../components/AddDriverModal";
import { DriverService } from "../../utils/api";

const { Content, Header } = Layout;
const columns = [
  {
    title: "Name",
    key: "name",
    render: (text, record) => (
      <div>
        {!record.firstname || !record.lastname
          ? ""
          : `${record?.firstname} ${record?.lastname}`}
      </div>
    ),
    align: "center",
    // width: "25%",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    align: "center",
    // width: "25%",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    align: "center",
    // width: "15%",
  },
  {
    title: "Date of Birth",
    key: "dob",
    render: (text, record) => (
      <div>
        {!record.date_of_birth
          ? ""
          : dayjs(record.date_of_birth).format("DD/MM/YYYY")}
      </div>
    ),
    align: "center",
    // width: "15%",
  },
  {
    title: "Age",
    key: "age",
    render: (text, record) => (
      <div>{dayjs().from(dayjs(record.date_of_birth)).substr(3)}</div>
    ),
    align: "center",
    // width: "10%",
  },
];
const DriverList = () => {
  let history = useHistory();
  const [driverData, setDriverData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAllDriver();
  }, []);
  const fetchAllDriver = () => {
    DriverService.fetchAllDriver(
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
    <Layout style={{ height: "100%" }}>
      <Header className="header">
        <AddDriverModal />
        <div className="header-title">Driver</div>
      </Header>
      <Content className="children-page-content">
        <Table
          columns={columns}
          dataSource={driverData}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Total ${total} items`,
          }}
          rowKey="driver_id"
          loading={loading}
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: (event) => {
                history.push(`/admin/driver/${record.driver_id}`);
              },
            };
          }}
        />
      </Content>
    </Layout>
  );
};
export default DriverList;
