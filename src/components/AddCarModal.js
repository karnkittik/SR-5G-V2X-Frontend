import { useState } from "react";
import { Button, Modal, Form, Input, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
export const AddCarModal = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onCreate = (value) => {
    console.log(value);
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };
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
      <CarForm
        visible={visible}
        onCancel={() => setVisible(false)}
        onCreate={onCreate}
        confirmLoading={confirmLoading}
      />
    </>
  );
};

const CarForm = ({ visible, onCancel, onCreate, confirmLoading }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title="New car"
      className="add-employee-modal"
      okText="Submit"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
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
          <DatePicker style={{ width: "100%" }} />
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
    </Modal>
  );
};
