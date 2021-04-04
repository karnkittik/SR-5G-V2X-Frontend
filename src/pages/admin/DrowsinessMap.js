import { React, useState, useEffect } from "react";
import { DatePicker, Layout, Switch } from "antd";
import MyMapComponent, { useWatchLocation } from "../../components/common/Map";
import DateTimeTypePicker from "../../components/common/DateTimeTypePicker";
import { DrowsinessService } from "../../utils/api";
import GoogleMap from "../../components/common/ClusterMap";
import { DashbordCardLoading } from "../../components/common/DashbordCard";
import { HeatMapOutlined, EnvironmentOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { newData } from "../../mock/Coordinate";
const { Content } = Layout;
const { RangePicker } = DatePicker;
const DrowsinessMap = () => {
  var d = new Date();
  var n = d.getHours();
  const [time, setTime] = useState(n);
  const [locationData, setLocationData] = useState([]);
  const [heatMap, setHeatMap] = useState(false);
  const [date, setDate] = useState([dayjs(), dayjs()]);
  const [heatData, setHeatData] = useState([]);
  const { location, cancelLocationWatch } = useWatchLocation();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!location) return;
    return function cleanUp() {
      cancelLocationWatch();
    };
  }, [location, cancelLocationWatch]);
  useEffect(() => {
    fetchLocationMap(time);
  }, [time, heatMap]);
  useEffect(() => {
    fetchHeatMap(date);
  }, [date, heatMap]);
  const fetchLocationMap = (time) => {
    let start = dayjs().startOf("hour").unix();
    let end = dayjs().endOf("hour").unix();
    let payload = { start, end };
    DrowsinessService.fetchMap(
      payload,
      ({ data }) => {
        setLocationData(data);
        setLoading(false);
      },
      (response) => {
        console.log(response.message);
      }
    );
  };
  const fetchHeatMap = (date) => {
    let payload = {
      start: dayjs(date[0]).startOf("day").unix(),
      end: dayjs(date[1]).endOf("day").unix(),
    };
    DrowsinessService.fetchMap(
      payload,
      ({ data }) => {
        setHeatData(data);
        setLoading(false);
      },
      (response) => {
        console.log(response.message);
      }
    );
  };
  return (
    <Layout style={{ height: "100%" }}>
      <Content>
        <DashbordCardLoading
          title={heatMap ? "HeatMap" : "Location Map"}
          width="calc(100% - 20px)"
          height="calc(100% - 20px)"
          disablePaddingBottom={true}
          loading={loading}
          header={
            <div>
              {heatMap ? (
                <span>
                  <span className="date-label">Date: </span>
                  <RangePicker
                    defaultValue={[dayjs(), dayjs()]}
                    onChange={(value) => {
                      setDate([dayjs(value?.[0]?.$d), dayjs(value?.[1]?.$d)]);
                    }}
                    bordered={false}
                    size="small"
                    style={{ width: "240px" }}
                    disabledDate={(current) => {
                      return current && current > dayjs().endOf("day");
                    }}
                  />
                </span>
              ) : (
                <span>
                  <span className="date-label">Hour: </span>
                  <DateTimeTypePicker
                    n={n}
                    setTime={setTime}
                    setHeatMap={setHeatMap}
                    defaultValue={n}
                  />
                </span>
              )}
              <div className="toggle-map">
                {/* <span>Heatmap</span> */}
                <Switch
                  unCheckedChildren={<EnvironmentOutlined />}
                  checkedChildren={<HeatMapOutlined />}
                  onChange={() => {
                    setHeatMap(!heatMap);
                    setLoading(true);
                  }}
                />
              </div>
            </div>
          }
        >
          <div
            style={{
              height: "calc(100vh - 135px)",
            }}
          >
            {loading ? null : !heatMap ? (
              <GoogleMap
                isShownHere
                markers={locationData.map((point, index) => ({
                  id: index,
                  lat: point.coordinate?.lat,
                  lng: point.coordinate?.lng,
                  detail: point.detail,
                }))}
                here={{
                  lat: location?.latitude,
                  lng: location?.longitude,
                }}
              />
            ) : (
              <MyMapComponent
                zoom={8}
                isShownHere={false}
                heatMapData={heatData.map((point) => point.coordinate)}
              />
            )}
          </div>
        </DashbordCardLoading>
      </Content>
    </Layout>
  );
};
export default DrowsinessMap;
