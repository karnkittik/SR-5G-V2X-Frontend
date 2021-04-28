import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Layout, Table, Radio, Button, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { DashbordCardLoading } from "../../components/common/DashbordCard";
import dayjs from "dayjs";
import DriverIndivAccident from "./DriverIndivAccident";
import DriverIndivDrowsiness from "./DriverIndivDrowsiness";
import { DriverService } from "../../utils/api";
const { Header, Content } = Layout;

export const ProfileDriver = (props) => {
  const { driver_id } = useParams();
  const columns = [
    {
      title: "Name",
      key: "name_profile",
      render: (text, record) => (
        <div>
          {!record.firstname || !record.lastname
            ? ""
            : `${record?.firstname} ${record?.lastname}`}
        </div>
      ),
      align: "center",
      fixed: "left",
      width: "100px",
    },
    {
      title: "Username",
      key: "username_profile",
      dataIndex: "username",
      align: "center",
    },
    {
      title: "Gender",
      key: "gender_profile",
      dataIndex: "gender",
      align: "center",
    },
    {
      title: "Date of Birth",
      key: "dob",
      render: (text, record) => (
        <div>
          {!record.date_of_birth
            ? ""
            : dayjs(record.date_of_birth).format("DD/MM/YYYY")}
        </div>
      ),
      align: "center",
      // width: "15%",
    },
    {
      title: "Age",
      key: "age_profile",
      render: (text, record) => (
        <div>
          {!record.date_of_birth
            ? ""
            : dayjs().from(dayjs(record.date_of_birth)).substr(3)}
        </div>
      ),
      align: "center",
    },
  ];
  const [driverData, setDriverData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchDriver(driver_id);
  }, [driver_id]);

  const fetchDriver = (driver_id) => {
    DriverService.fetchDriver(
      driver_id,
      ({ data }) => {
        setDriverData(data);
        setLoading(false);
        //console.log(data);
      },
      (response) => {
        //console.log(response.message);
      }
    );
  };
  return (
    <Table
      columns={columns}
      dataSource={[driverData]}
      loading={loading}
      rowKey={(record) => record.driver_id + "profile"}
      pagination={false}
      size="small"
      scroll={{ x: 768 }}
    />
  );
};
const DriverIndiv = () => {
  let history = useHistory();
  const [view, setView] = useState("accident");
  const options = [
    { label: "Accident", value: "accident" },
    { label: "Drowsiness", value: "drowsiness" },
  ];
  return (
    <Layout style={{ height: "100%" }}>
      <Content className="real-content">
        <Row>
          <Col xs={24}>
            <DashbordCardLoading
              title="Driver Information"
              back={
                <Button
                  type="text"
                  icon={<ArrowLeftOutlined />}
                  onClick={() => {
                    history.push("/admin");
                  }}
                />
              }
              header={
                <Radio.Group
                  options={options}
                  onChange={(e) => setView(e.target.value)}
                  value={view}
                  optionType="button"
                  buttonStyle="solid"
                />
              }
            >
              <ProfileDriver />
            </DashbordCardLoading>
          </Col>
        </Row>
        {view === "accident" && <DriverIndivAccident />}
        {view === "drowsiness" && <DriverIndivDrowsiness />}
      </Content>
    </Layout>
  );
};
export default DriverIndiv;
