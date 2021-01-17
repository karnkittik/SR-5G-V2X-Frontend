import { React } from "react";
import { Layout, Table, Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { EmployeeData } from "../../mock/Employee";
const { Content } = Layout;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Working Age",
    dataIndex: "workingAge",
    key: "workingAge",
    render: (info) => (
      <div>{(info[0] ? `${info[0]} yr, ` : "") + `${info[1]} mth`}</div>
    ),
  },
];
const AddSection = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  justify-content: flex-end;
  padding: 10px 10px;
`;
const EmployeeList = () => {
  const addEmployee = () => {
    alert("bruh");
  };
  return (
    <Layout>
      <Content>
        <AddSection>
          <Button
            type="primary"
            shape="round"
            onClick={addEmployee}
            icon={<UserAddOutlined />}
          >
            New employee
          </Button>
        </AddSection>
        <Table
          columns={columns}
          dataSource={EmployeeData}
          pagination={{ pageSize: 8 }}
        />
      </Content>
    </Layout>
  );
};
export default EmployeeList;
