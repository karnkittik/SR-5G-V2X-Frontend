import React, { useState, useEffect } from "react";
import { Layout, Table, Button, Popconfirm } from "antd";
import dayjs from "dayjs";
import { AddCarModal } from "../../components/AddCarModal";
import { EditCarModal } from "../../components/EditCarModal";
import { useHistory } from "react-router-dom";
import { CarSerivce } from "../../utils/api";
import { DashbordCardLoading } from "../../components/common/DashbordCard";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
const { Content } = Layout;

const CarList = () => {
  let history = useHistory();
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      title: "License Plate Number",
      dataIndex: "vehicle_registration_number",
      key: "vehicle_registration_number",
      width: "25%",
      align: "center",
      sorter: (a, b) =>
        a.vehicle_registration_number.localeCompare(
          b.vehicle_registration_number
        ),
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
      sorter: (a, b) => dayjs(a.registered_at) - dayjs(b.registered_at),
    },
    {
      title: "Mfg Date",
      key: "mfg_at",
      render: (text, record) => (
        <div>{dayjs(record.mfg_at).format("DD/MM/YYYY")}</div>
      ),
      align: "center",
      sorter: (a, b) => dayjs(a.mfg_at) - dayjs(b.mfg_at),
    },
    {
      title: "Car Age",
      key: "age",
      render: (text, record) => (
        <div>{dayjs().from(dayjs(record.mfg_at)).substr(3)}</div>
      ),
      align: "center",
      sorter: (a, b) =>
        parseInt(dayjs().from(dayjs(a.date_of_birth)).substr(3).split(" ")[0]) -
        parseInt(dayjs().from(dayjs(b.date_of_birth)).substr(3).split(" ")[0]),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      align: "center",
      width: "100px",
      render: (_, record) =>
        carData.length >= 1 ? (
          <span>
            <EditCarModal
              icon={<EditTwoTone twoToneColor="#5272c2" />}
              initialValues={record}
              setLoading={setLoading}
              refresh={refreshEdit}
            />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.car_id)}
            >
              <Button
                type="link"
                size="small"
                icon={<DeleteTwoTone twoToneColor="#cc0000" />}
              />
            </Popconfirm>
          </span>
        ) : null,
    },
  ];
  useEffect(() => {
    fetchAllCar();
  }, []);
  const fetchAllCar = () => {
    CarSerivce.fetchAllCar(
      ({ data }) => {
        setCarData(data.reverse());
        setLoading(false);
        //console.log(data);
      },
      (response) => {
        //console.log(response.message);
      }
    );
  };
  const handleDelete = (car_id) => {
    CarSerivce.deleteCar(
      car_id,
      ({ data }) => {
        //console.log(data);
        setCarData(carData.filter((item) => item.car_id !== car_id));
      },
      (response) => {
        //console.log(response.message);
      }
    );
    //console.log(car_id);
  };
  const refreshEdit = (car_id, values) => {
    let carIndex = carData.findIndex((item) => item.car_id === car_id);
    if (carIndex >= 0) {
      carData[carIndex].vehicle_registration_number =
        values.vehicle_registration_number;
      carData[carIndex].car_detail = values.car_detail;
    }
    setLoading(false);
  };
  return (
    <Layout style={{ height: "100%" }}>
      <Content className="children-page-content">
        <DashbordCardLoading
          notHideTitle={true}
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
            scroll={{ x: 768 }}
            showSorterTooltip={false}
          />
        </DashbordCardLoading>
      </Content>
    </Layout>
  );
};
export default CarList;
