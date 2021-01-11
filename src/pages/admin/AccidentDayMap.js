import { React, useState, useEffect } from "react";
import { Layout, Select, DatePicker, TimePicker, Space } from "antd";
import MyMapComponent from "../../components/common/Map";
import { Accident } from "../../mock/Coordinate";
import * as dayjs from "dayjs";
const { Content } = Layout;
const { Option } = Select;

const PickerWithType = ({ type, onChange }) => {
  if (type === "time") return <TimePicker onChange={onChange} />;
  if (type === "date") return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
};
// function range(start, end) {
//   const result = [];
//   for (let i = start; i < end; i++) {
//     result.push(i);
//   }
//   return result;
// }

const disabledDate = (current) => {
  // Can not select days before today and today
  return (
    current &&
    (current > dayjs().endOf("day") || current < dayjs().startOf("year"))
  );
};

const AccidentDayMap = () => {
  const [date, setDate] = useState(dayjs());
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(Accident);
  }, [date]);
  return (
    <Layout style={{ height: "100%" }}>
      <Content>
        <div className="time-range">
          <div className="time-range-label">Select Date:</div>
          <DatePicker onChange={setDate} disabledDate={disabledDate} />
        </div>
        <MyMapComponent zoom={16} isShownHere markers={data} />
      </Content>
    </Layout>
  );
};
export default AccidentDayMap;
