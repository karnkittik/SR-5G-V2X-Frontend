import { React, useState, useEffect } from "react";
import { Layout } from "antd";
import MyMapComponent from "../../components/common/Map";
import DateTimeTypePicker from "../../components/common/DateTimeTypePicker";
import { AccidentData } from "../../mock/Coordinate";
import { AccidentService } from "../../utils/api";
const { Content, Header } = Layout;

const AccidentMap = () => {
  var d = new Date();
  var n = d.getHours();
  const [time, setTime] = useState(0);
  const [data, setData] = useState([]);
  const [heatMap, setHeatMap] = useState(false);
  useEffect(() => {
    console.log(time);
    // setData(AccidentData[0]);
    fetchHeatmap(time);
  }, [time]);
  const fetchHeatmap = (time) => {
    AccidentService.fetchHeatmap(
      time,
      ({ data }) => {
        console.log(data);
      },
      (response) => {
        console.log(response);
      }
    );
  };
  return (
    <Layout style={{ height: "100%" }}>
      <Header className="header">
        <div className="header-title">Accident Map</div>
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
export default AccidentMap;
