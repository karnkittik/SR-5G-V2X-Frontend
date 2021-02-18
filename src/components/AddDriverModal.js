import { useState } from "react";
import { Button, Modal, Form, Input, Select, DatePicker, Alert } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { DriverService } from "../utils/api";
import dayjs from "dayjs";
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current > dayjs().endOf("day");
};

export const AddDriverModal = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        icon={<UserAddOutlined />}
        className="add-employee-btn"
      >
        Driver
      </Button>
      <DriverForm visible={visible} setVisible={setVisible} />
    </>
  );
};

const DriverForm = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [failed, setFailed] = useState(false);
  const onCreate = (values) => {
    values.date_of_birth = values.DOB.$d;
    setConfirmLoading(true);
    DriverService.AddDriver(
      values,
      ({ data }) => {
        console.log(data);
        setConfirmLoading(false);
        setSuccessful(true);
        form.resetFields();
      },
      (response) => {
        console.log(response.message);
        setConfirmLoading(false);
        setFailed({ message: response.message });
      }
    );
  };
  return (
    <Modal
      title="New employee"
      className="add-employee-modal"
      okText="Submit"
      onCancel={() => {
        setVisible(false);
        form.resetFields();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      visible={visible}
      confirmLoading={confirmLoading}
    >
      <Form {...layout} form={form}>
        <Form.Item
          label="Firstname"
          name="firstname"
          rules={[{ required: true, message: "Please input your firstname!" }]}
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
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please input your gender!" }]}
        >
          <Select allowClear>
            <Option value="0">male</Option>
            <Option value="1">female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="DOB"
          label="Date of Birth"
          rules={[
            {
              type: "object",
              required: true,
              message: "Please select date!",
            },
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            popupStyle={{ zIndex: "9999" }}
            disabledDate={disabledDate}
          />
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
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
      <div style={{ height: "20px" }}>
        {successful ? (
          <Alert
            message="Success"
            type="success"
            showIcon
            closable
            afterClose={() => {
              setSuccessful(false);
            }}
          />
        ) : null}
        {failed ? (
          <Alert
            message={failed.message}
            type="error"
            showIcon
            closable
            afterClose={() => {
              setFailed(false);
            }}
          />
        ) : null}
      </div>
    </Modal>
  );
};
