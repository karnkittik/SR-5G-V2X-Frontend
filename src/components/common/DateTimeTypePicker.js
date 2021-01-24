import { Select, Switch } from "antd";
import { HeatMapOutlined, EnvironmentOutlined } from "@ant-design/icons";
const { Option } = Select;
const DateTimeTypePicker = (props) => {
  var n = props.n;
  var times = [];
  var d = new Date().toLocaleDateString();
  for (var i = 0; i <= n; i++) {
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
      <div className="time-range-label">{d}</div>
      <Select
        className="time-range-picker"
        placeholder={"Select time"}
        onChange={handleChange}
      >
        {times}
      </Select>
      {!props.disabledHeat && (
        <div className="toggle-map">
          <Switch
            unCheckedChildren={<EnvironmentOutlined />}
            checkedChildren={<HeatMapOutlined />}
            onChange={onChange}
          />
          <div>Heatmap</div>
        </div>
      )}
    </div>
  );
};

export default DateTimeTypePicker;
