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
export const AddCarModal = (props) => {
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
      <CarForm
        visible={visible}
        setVisible={setVisible}
        refresh={props.refresh}
        setLoading={props.setLoading}
      />
    </>
  );
};

const CarForm = ({ visible, setVisible, refresh, setLoading }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [failed, setFailed] = useState(false);
  const onCreate = (values) => {
    values.mfg_at = values.mfg_at.$d;
    setConfirmLoading(true);
    setLoading(true);
    CarSerivce.addCar(
      values,
      ({ data }) => {
        //console.log(data);
        setConfirmLoading(false);
        setSuccessful(true);
        form.resetFields();
        setTimeout(() => {
          setVisible(false);
          refresh();
        }, 500);
      },
      (response) => {
        //console.log(response.message);
        setConfirmLoading(false);
        setLoading(false);
        setFailed({ message: response.message });
      }
    );
  };
  return (
    <Modal
      title="New Car Information"
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
            onCreate(values);
          })
          .catch((info) => {
            //console.log("Validate Failed:", info);
          });
      }}
      visible={visible}
      confirmLoading={confirmLoading}
    >
      <Form {...layout} form={form}>
        <Form.Item
          name="mfg_at"
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
            inputReadOnly={true}
          />
        </Form.Item>
        <Form.Item
          label="License Plate Number"
          name="vehicle_registration_number"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input license plate number!",
            },
            () => ({
              validator(_, value) {
                if (!value || value.match("^[0-9ก-ฮ][ก-ฮ][ก-ฮ]? [0-9]{1,4}$")) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  `License Plate Number must match Thai "Private cars" vehicle registration plates format!`
                );
              },
            }),
          ]}
        >
          <Input placeholder="Example: ทล 1989" />
        </Form.Item>
        <Form.Item
          label="Car Detail"
          name="car_detail"
          rules={[{ required: false, message: "Please input car detail!" }]}
        >
          <Input.TextArea placeholder="Example: Taiwan EV" />
        </Form.Item>
      </Form>
      <div style={{ height: "auto", margin: "5px 0" }}>
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
