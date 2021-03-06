import { Layout, Form, Input, Button, Badge, Alert } from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AuthService } from "../../utils/api";
const layout = {
  labelCol: {
    span: 8,
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 18,
    },
  },
};
const tailLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      offset: 8,
      span: 8,
      // span: 24,
    },
  },
};
const LogInPage = () => {
  const signIn = (username, password) => {
    const payload = {
      username: username,
      password: password,
    };
    AuthService.login(
      payload,
      ({ data }) => {
        console.log(data);
        window.location.reload();
      },
      (response) => {
        console.log(response.message);
        setFailed({ message: response.message });
      }
    );
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    signIn(values.username, values.password);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const setTheme = () => {
    window.less
      .modifyVars({
        "@primary-color": "#5272c2",
      })
      .then(() => {
        //do other stuff here
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setTheme();
  }, []);
  let history = useHistory();
  const GoHome = () => {
    history.push("/");
  };
  return (
    <Layout className="full">
      <div className="login container">
        <div className="login-logo">
          <Badge.Ribbon text="admin" placement="end" color="gold">
            <div className="login-logo-text">5G-V2X</div>
          </Badge.Ribbon>
        </div>
        <div className="login-form">
          <Form
            {...layout}
            name="login"
            className="login-form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label={<label className="login-label">Username</label>}
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label={<label className="login-label">Password</label>}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>
            <div style={{ height: "20px", margin: "5px 0" }}>
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
            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                className="login-button"
                htmlType="submit"
                size="large"
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};
export default LogInPage;
