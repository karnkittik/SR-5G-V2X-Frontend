import { React, useState, useEffect } from "react";
import { Layout, Select } from "antd";
import MyMapComponent from "../../components/common/Map";
import { AccidentHeat } from "../../mock/Coordinate";
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
    <div className="time-range">
      <div className="time-range-label">Select time:</div>
      <Select
        className="time-range-picker"
        // placeholder={now}
        onChange={handleChange}
      >
        {times}
      </Select>
    </div>
  );
};

const DrowsinessHeatMap = () => {
  var d = new Date();
  var n = d.getHours();
  const [time, setTime] = useState(n);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(AccidentHeat[time]);
  }, [time]);
  return (
    <Layout style={{ height: "100%" }}>
      <Content>
        <TimeRangePicker n={n} setTime={setTime} />
        <MyMapComponent zoom={16} isShownHere heatMapData={data} />
      </Content>
    </Layout>
  );
};
export default DrowsinessHeatMap;
