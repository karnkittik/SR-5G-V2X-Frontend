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

export const EditDriverModal = (props) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button
        type="link"
        size="small"
        onClick={() => setVisible(true)}
        icon={props.icon}
        className="add-employee-btn"
      />
      <DriverForm
        initialValues={props.initialValues}
        visible={visible}
        setVisible={setVisible}
        refresh={props.refresh}
        setLoading={props.setLoading}
      />
    </>
  );
};

const DriverForm = ({
  visible,
  setVisible,
  refresh,
  setLoading,
  initialValues,
}) => {
  const { firstname, lastname, date_of_birth, driver_id } = initialValues;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [failed, setFailed] = useState(false);
  const onEdit = (values) => {
    values.date_of_birth = values.date_of_birth.$d;
    setConfirmLoading(true);
    setLoading(true);
    DriverService.editDriver(
      driver_id,
      values,
      ({ data }) => {
        console.log(data);
        setConfirmLoading(false);
        setSuccessful(true);
        form.resetFields();
        setTimeout(() => {
          setVisible(false);
          refresh(driver_id, values);
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
      title="Edit driver"
      style={{ top: "60px" }}
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
            onEdit(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      visible={visible}
      confirmLoading={confirmLoading}
    >
      <Form
        {...layout}
        form={form}
        initialValues={{
          firstname,
          lastname,
          date_of_birth: dayjs(date_of_birth),
        }}
      >
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
          name="date_of_birth"
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
