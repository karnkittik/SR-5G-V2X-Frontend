import { React, useState, useEffect } from "react";
import { Layout, Select } from "antd";
import PageHeader from "../components/common/PageHeader";
import MyMapComponent from "../components/common/Map";
import { AccidentHeat } from "../mock/Coordinate";
const { Content } = Layout;
const { Option } = Select;

const TimeRangePicker = (props) => {
  var n = props.n;
  var times = [];
  for (var i = 0; i < n; i++) {
    times.push(<Option value={i} key={i}>{`${i}.00 - ${i + 1}.00`}</Option>);
  }
  const handleChange = (value) => {
    props.setTime(value);
  };
  return (
    <Select
      className="time-range-picker"
      placeholder="Select time"
      onChange={handleChange}
    >
      {times}
    </Select>
  );
};

const AccidentHeatMap = () => {
  var d = new Date();
  var n = d.getHours();
  const [time, setTime] = useState(n);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(AccidentHeat[time]);
  }, [time]);
  return (
    <Layout style={{ height: "100vh" }}>
      <PageHeader title={"Accident Heatmap"} />
      <Content className="fullmap-content" style={{ height: "100%" }}>
        <TimeRangePicker n={n} setTime={setTime} />
        <MyMapComponent zoom={16} isShownHere heatMapData={data} />
      </Content>
    </Layout>
  );
};
export default AccidentHeatMap;
