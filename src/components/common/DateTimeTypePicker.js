import { Select } from "antd";
import dayjs from "dayjs";
const { Option } = Select;
const DateTimeTypePicker = (props) => {
  var n = props.n;
  var times = [];
  // var d = dayjs(new Date()).format("DD/MM/YYYY");
  for (var i = 0; i <= n; i++) {
    times.push(
      <Option value={i} key={i + "time"}>{`${i}.00 - ${
        i === 23 ? "0" : i + 1
      }.00`}</Option>
    );
  }
  const handleChange = (value) => {
    props.setTime(value);
  };
  return (
    <div className="time-range">
      {/* <div className="time-range-label">{d}</div> */}
      <Select
        defaultValue={props.defaultValue}
        size="small"
        bordered={false}
        className="time-range-picker"
        placeholder={"Hour"}
        onChange={handleChange}
      >
        {times}
      </Select>
      {/* {!props.disabledHeat && (
        <div className="toggle-map">
          <Switch
            unCheckedChildren={<EnvironmentOutlined />}
            checkedChildren={<HeatMapOutlined />}
            onChange={onChange}
          />
          <div>Heatmap</div>
        </div>
      )} */}
    </div>
  );
};

export default DateTimeTypePicker;
