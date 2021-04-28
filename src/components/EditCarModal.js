import { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Alert } from "antd";
import { CarSerivce } from "../utils/api";
const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

export const EditCarModal = (props) => {
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
      <CarForm
        visible={visible}
        setVisible={setVisible}
        refresh={props.refresh}
        setLoading={props.setLoading}
        initialValues={props.initialValues}
      />
    </>
  );
};

const CarForm = ({
  visible,
  setVisible,
  refresh,
  setLoading,
  initialValues,
}) => {
  const { vehicle_registration_number, car_detail, car_id } = initialValues;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    form.resetFields();
  }, [form, visible]);
  const onEdit = (values) => {
    setConfirmLoading(true);
    setLoading(true);
    CarSerivce.editCar(
      car_id,
      values,
      ({ data }) => {
        //console.log(data);
        setConfirmLoading(false);
        setSuccessful(true);
        setTimeout(() => {
          setVisible(false);
          refresh(car_id, values);
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
      title="Edit car"
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
            //console.log("Validate Failed:", info);
          });
      }}
      visible={visible}
      confirmLoading={confirmLoading}
    >
      <Form
        {...layout}
        form={form}
        initialValues={{ vehicle_registration_number, car_detail }}
      >
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
