import { React, useState, useEffect } from "react";
import { Layout, DatePicker } from "antd";
import MyMapComponent from "../../components/common/Map";
import { DashbordCardLoading } from "../../components/common/DashbordCard";
import { DrowsinessService } from "../../utils/api";
import dayjs from "dayjs";
const { Content } = Layout;
const { RangePicker } = DatePicker;

const DrowsinessHeatMap = () => {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState([dayjs(), dayjs()]);
  useEffect(() => {
    fetchHeatmap(month);
  }, [month]);
  const fetchHeatmap = (date) => {
    let payload = {
      start: dayjs(date[0]).startOf("month").unix(),
      end: dayjs(date[1]).endOf("dmonthay").unix(),
    };
    DrowsinessService.fetchHeatmap(
      payload,
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
        <DashbordCardLoading
          title={"HeatMap"}
          width="calc(100% - 20px)"
          height="calc(100% - 20px)"
          disablePaddingBottom={true}
          loading={false}
          header={
            <span>
              <span className="date-label">Month: </span>
              <RangePicker
                defaultValue={[dayjs(), dayjs()]}
                onChange={(value) => {
                  setMonth([dayjs(value?.[0]?.$d), dayjs(value?.[1]?.$d)]);
                }}
                bordered={false}
                picker="month"
                size="small"
                style={{ width: "230px" }}
                disabledDate={(current) => {
                  return current && current > dayjs().endOf("month");
                }}
                inputReadOnly={true}
              />
            </span>
          }
        >
          <div
            style={{
              height: "calc(100vh - 135px)",
            }}
          >
            <MyMapComponent
              zoom={8}
              isShownHere={false}
              heatMapData={
                data.length !== 0 ? data.map((point) => point.coordinate) : []
              }
            />
          </div>
        </DashbordCardLoading>
      </Content>
    </Layout>
  );
};
export default DrowsinessHeatMap;
