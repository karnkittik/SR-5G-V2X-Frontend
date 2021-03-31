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
  // Can not select the day not far from today at least 18 years
  return current && current > dayjs().subtract(18, "year");
};

export const AddDriverModal = (props) => {
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
      <DriverForm
        visible={visible}
        setVisible={setVisible}
        refresh={props.refresh}
        setLoading={props.setLoading}
      />
    </>
  );
};

const DriverForm = ({ visible, setVisible, refresh, setLoading }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [failed, setFailed] = useState(false);
  const onCreate = (values) => {
    values.date_of_birth = values.DOB.$d;
    setConfirmLoading(true);
    setLoading(true);
    DriverService.AddDriver(
      values,
      ({ data }) => {
        console.log(data);
        setConfirmLoading(false);
        setSuccessful(true);
        form.resetFields();
        setTimeout(() => {
          setVisible(false);
          refresh();
        }, 500);
      },
      (response) => {
        console.log(response.message);
        setConfirmLoading(false);
        setFailed({ message: response.message });
        setLoading(false);
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
          hasFeedback
          rules={[
            { required: true, message: "Please input your firstname!" },
            () => ({
              validator(_, value) {
                if (!value || value.match("^[A-Za-z]([A-Za-z'-.]){0,19}$")) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "Firstname must be English and not exceed 20 characters!"
                );
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Lastname"
          name="lastname"
          hasFeedback
          rules={[
            { required: true, message: "Please input your lastname!" },
            () => ({
              validator(_, value) {
                if (!value || value.match("^[A-Za-z]([A-Za-z'-.]){0,20}$")) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "Lastname must be English and not exceed 20 characters!"
                );
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please input your gender!" }]}
        >
          <Select allowClear>
            <Option value="0">Male</Option>
            <Option value="1">Female</Option>
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
          hasFeedback
          rules={[
            { required: true, message: "Please input your username!" },
            () => ({
              validator(_, value) {
                if (
                  !value ||
                  value.match("^[A-Za-z]([A-Za-z'-@.0-9]){0,11}$")
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "Username must be started with an alphabet and not exceed 12 characters!"
                );
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          hasFeedback
          rules={[
            { required: true, message: "Please input your password!" },
            () => ({
              validator(_, value) {
                if (
                  !value ||
                  value.match(
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9@$!%*?.&']{8,12}$"
                  )
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "Password must have minimum 8 and maximum 12 characters, at least one uppercase letter, one lowercase letter and one number!"
                );
              },
            }),
          ]}
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
