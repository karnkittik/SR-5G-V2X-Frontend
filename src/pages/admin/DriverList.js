import React, { useState, useEffect } from "react";
import { Layout, Table, Popconfirm, Checkbox } from "antd";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import { AddDriverModal } from "../../components/AddDriverModal";
import { DriverService } from "../../utils/api";
import { DashbordCardLoading } from "../../components/common/DashbordCard";
import { DriverDataDetail } from "../../mock/Driver";
import { SearchOutlined } from "@ant-design/icons";
const { Content, Header } = Layout;
const DriverList = () => {
  let history = useHistory();
  const [driverData, setDriverData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedFilter, setCheckedFilter] = useState([]);

  const handleDelete = (driver_id) => {
    console.log(driver_id);
    setDriverData(driverData.filter((item) => item.driver_id !== driver_id));
  };

  const options = [
    { label: "Accident Count", value: "accidentCount" },
    { label: "Drowsiness Count", value: "drowsinessCount" },
    { label: "Avg Response Time", value: "avgResponse" },
  ];
  const onCheck = (checkedValues) => {
    console.log("checked = ", checkedValues);
    setCheckedFilter(checkedValues);
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
          value: "MALE",
        },
        {
          text: "Female",
          value: "FEMALE",
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
    ...(checkedFilter.includes("accidentCount")
      ? [
          {
            title: "Accident",
            dataIndex: "accidentCount",
            key: "accident",
            align: "center",
            sorter: (a, b) => a.accidentCount - b.accidentCount,
            // width: "15%",
          },
        ]
      : []),
    ...(checkedFilter.includes("drowsinessCount")
      ? [
          {
            title: "Drowsiness",
            dataIndex: "drowsinessCount",
            key: "drowsiness",
            align: "center",
            sorter: (a, b) => a.drowsinessCount - b.drowsinessCount,
            // width: "15%",
          },
        ]
      : []),
    ...(checkedFilter.includes("avgResponse")
      ? [
          {
            title: "Avg Response (s)",
            key: "avg_response",
            align: "center",
            render: (text, record) => (
              <div>{record?.AvgResponseTime?.toFixed(2) || "-"}</div>
            ),
            sorter: (a, b) => a.AvgResponseTime - b.AvgResponseTime,
            width: "170px",
          },
        ]
      : []),
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      align: "center",
      width: "100px",
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
    fetchAllDriver();
    // setLoading(false);
    // setDriverData(DriverDataDetail);
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
    <Layout>
      <Content className="real-content">
        <DashbordCardLoading
          loading={loading}
          title="Driver List"
          width="calc(100% - 20px)"
          height="calc(100vh - 75px)"
          disablePaddingBottom={true}
          header={
            <span>
              <Checkbox.Group
                options={options}
                defaultValue={[]}
                onChange={onCheck}
                style={{ margin: "0 10px" }}
              />
              <AddDriverModal
                refresh={fetchAllDriver}
                setLoading={setLoading}
              />
            </span>
          }
        >
          <Table
            size="small"
            columns={columns}
            dataSource={driverData}
            pagination={{
              pageSize: 12,
              showTotal: (total) => `Total ${total} items`,
              showSizeChanger: false,
            }}
            rowKey="driver_id"
            // loading={loading}
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
        </DashbordCardLoading>
      </Content>
    </Layout>
  );
};
export default DriverList;
