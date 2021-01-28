import { useState } from "react";
import { Button, Modal, Form, Input, Select, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { Option } = Select;
export const CarTypeName = {
  "01": "SUV",
  "02": "Pickup",
  "03": "Compact Car",
  "04": "Minivan",
  "05": "Supercar",
};
const CarOption = () => {
  var carArr = [];
  for (const carType in CarTypeName) {
    carArr.push(<Option value={carType}>{CarTypeName[carType]}</Option>);
  }
  return carArr;
};
export const AddCarModal = () => {
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
        icon={<PlusOutlined />}
        className="add-employee-btn"
      >
        Car
      </Button>
      <Modal
        title="New car"
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
            name="carType"
            label="Car Type"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select a option and change input text above"
              // onChange={this.onGenderChange}
              allowClear
            >
              {CarOption()}
            </Select>
          </Form.Item>
          <Form.Item label="Regis Date">
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
