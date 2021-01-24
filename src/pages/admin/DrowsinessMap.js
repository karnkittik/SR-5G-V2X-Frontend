import { React, useState, useEffect } from "react";
import { Layout } from "antd";
import MyMapComponent from "../../components/common/Map";
import { AccidentData } from "../../mock/Coordinate";
import DateTimeTypePicker from "../../components/common/DateTimeTypePicker";
const { Content, Header } = Layout;

const DrowsinessMap = () => {
  var d = new Date();
  var n = d.getHours();
  const [time, setTime] = useState(n);
  const [data, setData] = useState([]);
  const [heatMap, setHeatMap] = useState(false);
  useEffect(() => {
    setData(AccidentData[time]);
  }, [time]);
  return (
    <Layout style={{ height: "100%" }}>
      <Header className="header">
        <div className="header-title">Drowsiness Map</div>
      </Header>
      <Content>
        <DateTimeTypePicker n={n} setTime={setTime} setHeatMap={setHeatMap} />
        <MyMapComponent
          zoom={16}
          markers={!heatMap && data}
          isShownHere
          heatMapData={heatMap && data?.map((point) => point.coordinate)}
        />
      </Content>
    </Layout>
  );
};
export default DrowsinessMap;
