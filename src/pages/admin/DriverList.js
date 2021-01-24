import React, { useState } from "react";
import {
  Layout,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { EmployeeData } from "../../mock/Employee";
const { Content } = Layout;
const { Option } = Select;
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
];
const AddSection = styled.div`
  display: flex;
  width: 100%;
  /* background-color: white; */
  justify-content: flex-end;
  /* padding: 10px 10px; */
  /* padding-bottom: 10px; */
`;
export const AddModal = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const onFinishFailed = () => {
    console.log("bruh");
  };
  const onFinish = (value) => {
    alert(value);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  return (
    <>
      <Button
        type="primary"
        size=""
        onClick={showModal}
        icon={<UserAddOutlined />}
        className="add-employee-btn"
      >
        Employee
      </Button>
      <Modal
        title="New employee"
        visible={visible}
        className="add-employee-modal"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            loading={confirmLoading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Firstname"
            name="firstname"
            rules={[
              { required: true, message: "Please input your firstname!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Lastname"
            name="lastname"
            rules={[{ required: true, message: "Please input your lastname!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              // onChange={this.onGenderChange}
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Date of birth">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Start Date">
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const DriverList = () => {
  return (
    <Layout>
      <Content>
        {/* <AddSection>
          <AddModal />
        </AddSection> */}
        <Table
          columns={columns}
          dataSource={EmployeeData}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Total ${total} items`,
          }}
          rowKey="id"
        />
      </Content>
    </Layout>
  );
};
export default DriverList;
