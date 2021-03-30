import React, { useState, useEffect } from "react";
import { Layout, Table, Popconfirm } from "antd";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import { AddDriverModal } from "../../components/AddDriverModal";
import { DriverService } from "../../utils/api";
import { DriverDataDetail } from "../../mock/Driver";

const { Content, Header } = Layout;
const DriverList = () => {
  let history = useHistory();
  const [driverData, setDriverData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleDelete = (driver_id) => {
    console.log(driver_id);
    setDriverData(driverData.filter((item) => item.driver_id !== driver_id));
  };
  const columns = [
    {
      title: "No.",
      key: "index",
      render: (value, item, index) => index + 1,
      fixed: "left",
      align: "center",
      width: "70px",
    },
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
      sorter: (a, b) =>
        `${a.firstname} ${a.lastname}`.localeCompare(
          `${b.firstname} ${b.lastname}`
        ),
      fixed: "left",
      // width: "25%",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      align: "center",
      sorter: (a, b) => a.username.localeCompare(b.username),
      // width: "25%",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      filters: [
        {
          text: "Male",
          value: "Male",
        },
        {
          text: "Female",
          value: "Female",
        },
      ],
      filterMultiple: true,
      onFilter: (value, record) => record.gender === value,
      // width: "15%",
    },
    // {
    //   title: "Date of Birth",
    //   key: "dob",
    //   render: (text, record) => (
    //     <div>
    //       {!record.date_of_birth
    //         ? ""
    //         : dayjs(record.date_of_birth).format("DD/MM/YYYY")}
    //     </div>
    //   ),
    //   align: "center",
    //   // width: "15%",
    // },
    {
      title: "Age",
      key: "age",
      render: (text, record) => (
        <div>
          {dayjs().from(dayjs(record.date_of_birth)).substr(3).split(" ")[0]}
        </div>
      ),
      align: "center",
      sorter: (a, b) =>
        parseInt(dayjs().from(dayjs(a.date_of_birth)).substr(3).split(" ")[0]) -
        parseInt(dayjs().from(dayjs(b.date_of_birth)).substr(3).split(" ")[0]),
      // width: "10%",
    },
    {
      title: "Accident",
      dataIndex: "accident",
      key: "accident",
      align: "center",
      sorter: (a, b) => a.accident - b.accident,
      // width: "15%",
    },
    {
      title: "Drowsiness",
      dataIndex: "drowsiness",
      key: "drowsiness",
      align: "center",
      sorter: (a, b) => a.drowsiness - b.drowsiness,
      // width: "15%",
    },
    {
      title: "Response",
      dataIndex: "avg_response",
      key: "avg_response",
      align: "center",
      sorter: (a, b) => a.avg_response - b.avg_response,
      // width: "15%",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      align: "center",
      // width: "80px",
      render: (_, record) =>
        driverData.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.driver_id)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  useEffect(() => {
    // fetchAllDriver();
    setLoading(false);
    setDriverData(DriverDataDetail);
  }, []);
  const fetchAllDriver = () => {
    DriverService.fetchAllDriver(
      ({ data }) => {
        setDriverData(data.reverse());
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
        <AddDriverModal refresh={fetchAllDriver} />
        <div className="header-title">Driver</div>
      </Header>
      <Content className="children-page-content">
        <Table
          size="small"
          columns={columns}
          dataSource={driverData}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Total ${total} items`,
            showSizeChanger: false,
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
          scroll={{ x: 720 }}
          showSorterTooltip={false}
        />
      </Content>
    </Layout>
  );
};
export default DriverList;
