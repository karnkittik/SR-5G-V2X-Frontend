import { useState } from "react";
import { Button, Modal, Form, Input, DatePicker, Alert } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CarSerivce } from "../utils/api";
import dayjs from "dayjs";
const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current > dayjs().endOf("day");
};
export const AddCarModal = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        className="add-employee-btn"
        icon={<PlusOutlined />}
      >
        Car
      </Button>
      <CarForm visible={visible} setVisible={setVisible} />
    </>
  );
};

const CarForm = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [failed, setFailed] = useState(false);
  const onCreate = (values) => {
    values.created_at = values.created_at.$d;
    setConfirmLoading(true);
    CarSerivce.AddCar(
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
      title="New car"
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
          name="created_at"
          label="Manufacturing Date"
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
          label="License Plate Number"
          name="vehicle_registration_number"
          rules={[
            {
              required: true,
              message: "Please input license plate number!",
            },
          ]}
        >
          <Input placeholder="Example: ABC1234" />
        </Form.Item>
        <Form.Item
          label="Car Detail"
          name="car_detail"
          rules={[{ required: false, message: "Please input car detail!" }]}
        >
          <Input.TextArea placeholder="Example: Taiwan EV" />
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
