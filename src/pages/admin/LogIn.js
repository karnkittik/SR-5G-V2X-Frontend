import cookie from "js-cookie";
import { Layout, Form, Input, Button, Badge } from "antd";
import { useEffect } from "react";
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
      offset: 16,
      span: 8,
    },
  },
};
const LogInPage = () => {
  const signIn = () => {
    cookie.set("5G-V2X", { user: "evermore" });
    window.location.reload();
  };
  const onFinish = (values) => {
    signIn();
    console.log("Success:", values);
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
  useEffect(() => {
    setTheme();
  }, []);
  return (
    <Layout className="full">
      <div className="login container">
        <div className="login-logo">
          <Badge.Ribbon text="admin" placement="end">
            <div className="login-logo-text">5G-V2X</div>
          </Badge.Ribbon>
        </div>

        <div className="login-form">
          <Form
            {...layout}
            name="login"
            class="login-form"
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
