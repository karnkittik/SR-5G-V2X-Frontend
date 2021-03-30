import { React, useState, useEffect } from "react";
import { Layout } from "antd";
import MyMapComponent from "../../components/common/Map";
import DateTimeTypePicker from "../../components/common/DateTimeTypePicker";
import { DrowsinessService } from "../../utils/api";
const { Content, Header } = Layout;

const DrowsinessHeatMap = () => {
  var d = new Date();
  var n = d.getHours();
  const [time, setTime] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchHeatmap(time);
  }, [time]);
  const fetchHeatmap = (time) => {
    if (time === null) return;
    DrowsinessService.fetchHeatmap(
      time,
      ({ data }) => {
        setData(data);
        console.log(data);
      },
      (response) => {
        console.log(response.message);
      }
    );
  };
  return (
    <Layout style={{ height: "100%" }}>
      {/* <Header className="header">
        <div className="header-title">Drowsiness HeatMap</div>
      </Header> */}
      <Content>
        <DateTimeTypePicker n={n} setTime={setTime} disabledHeat />
        <MyMapComponent
          zoom={8}
          isShownHere
          heatMapData={
            data.length !== 0 ? data.map((point) => point.coordinate) : []
          }
        />
      </Content>
    </Layout>
  );
};
export default DrowsinessHeatMap;
