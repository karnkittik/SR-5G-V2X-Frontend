import { React, useState, useEffect } from "react";
import { Layout } from "antd";
import MyMapComponent from "../../components/common/Map";
import DateTimeTypePicker from "../../components/common/DateTimeTypePicker";
import { DrowsinessData } from "../../mock/Drosiness";
const { Content, Header } = Layout;

const DrowsinessHeatMap = () => {
  var d = new Date();
  var n = d.getHours();
  const [time, setTime] = useState(n);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(DrowsinessData[time]);
  }, [time]);
  return (
    <Layout style={{ height: "100%" }}>
      <Header className="header">
        <div className="header-title">Drowsiness HeatMap</div>
      </Header>
      <Content>
        <DateTimeTypePicker n={n} setTime={setTime} disabledHeat />
        <MyMapComponent
          zoom={8}
          isShownHere
          heatMapData={data?.map((point) => point.coordinate)}
        />
      </Content>
    </Layout>
  );
};
export default DrowsinessHeatMap;
