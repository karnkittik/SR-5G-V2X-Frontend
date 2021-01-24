import React from "react";
import { Layout, Table } from "antd";

import styled from "styled-components";
import { DriverData } from "../../mock/Driver";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";

const { Content } = Layout;
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
    title: "Date of birth",
    dataIndex: "DOB",
    key: "dob",
    render: (text, record) => (
      <div>{dayjs(record.DOB).format("DD/MM/YYYY")}</div>
    ),
  },
];
const AddSection = styled.div`
  display: flex;
  width: 100%;
  /* background-color: white; */
  justify-content: flex-end;
  /* padding: 10px 10px; */
  /* padding-bottom: 10px; */
`;

const DriverList = () => {
  let history = useHistory();
  return (
    <Layout>
      <Content>
        {/* <AddSection>
          <AddModal />
        </AddSection> */}
        <Table
          columns={columns}
          dataSource={DriverData}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Total ${total} items`,
          }}
          rowKey="driver_id"
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
