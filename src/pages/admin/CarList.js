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
import { CarData } from "../../mock/Car";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AddCarModal } from "../../components/AddCarModal";
import { useHistory } from "react-router-dom";
dayjs.extend(relativeTime);
const { Content, Header } = Layout;
const { Option } = Select;

const columns = [
  {
    title: "Car ID",
    dataIndex: "car_id",
    key: "car_id",
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

const CarList = () => {
  let history = useHistory();
  return (
    <Layout style={{ height: "100%" }}>
      <Header className="header">
        <AddCarModal />
        <div className="header-title">Car List</div>
      </Header>
      <Content>
        <Table
          columns={columns}
          dataSource={CarData}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Total ${total} items`,
          }}
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
