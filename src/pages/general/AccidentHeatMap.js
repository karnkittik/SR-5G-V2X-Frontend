import { React, useState, useEffect } from "react";
import { Layout, Select, Switch } from "antd";
import MyMapComponent from "../../components/common/Map";
import { AccidentData } from "../../mock/Coordinate";
import { HeatMapOutlined, AimOutlined } from "@ant-design/icons";
const { Content } = Layout;
const { Option } = Select;

const TimeAndTypePicker = (props) => {
  var n = props.n;
  var times = [];
  for (var i = 0; i < n; i++) {
    times.push(<Option value={i} key={i}>{`${i}.00 - ${i + 1}.00`}</Option>);
  }
  const handleChange = (value) => {
    props.setTime(value);
  };
  const onChange = (checked) => {
    props.setHeatMap(checked);
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
      <div className="toggle-map">
        <Switch
          unCheckedChildren={<AimOutlined />}
          checkedChildren={<HeatMapOutlined />}
          onChange={onChange}
        />
        <div>Heatmap</div>
      </div>
    </div>
  );
};
const TodayDate = () => {
  var d = new Date().toLocaleString("en-US", { hour12: false });
  return <div className="today-date">{d}</div>;
};
const AccidentHeatMap = () => {
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
      <Content>
        <TimeAndTypePicker n={n} setTime={setTime} setHeatMap={setHeatMap} />
        <TodayDate />
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
export default AccidentHeatMap;
