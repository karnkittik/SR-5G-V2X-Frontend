import { useHistory, useParams } from "react-router-dom";
import { Layout, Table, Menu, Button, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  DriverDrowsiness,
  DriverDrowsinessTimePie,
  DriverDrowsinessTimeBar,
  DriverData,
} from "../../mock/Driver";
import DashbordCard, {
  ContentCard,
} from "../../components/common/DashbordCard";
import PieChart from "../../components/common/PieChart";
import dayjs from "dayjs";
import TimeBarChart from "../../components/common/TimeBarChart";
import DriverIndivAccident from "./DriverIndivAccident";
import DriverIndivDrowsiness from "./DriverIndivDrowsiness";
const { Header, Content } = Layout;
const CarIndiv = () => {
  let history = useHistory();
  return (
    <Layout>
      <Header className="header">
        <div className="header-title">Car Information</div>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          className="car-back-btn"
          onClick={() => {
            history.push("/admin/car");
          }}
        />
      </Header>
      <Content className="real-content"></Content>
    </Layout>
  );
};
export default CarIndiv;
