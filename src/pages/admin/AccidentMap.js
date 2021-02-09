import { React, useState, useEffect } from "react";
import { Layout } from "antd";
import MyMapComponent, { useWatchLocation } from "../../components/common/Map";
import { AccidentData } from "../../mock/Coordinate";
import * as dayjs from "dayjs";
import DateTimeTypePicker from "../../components/common/DateTimeTypePicker";
import GoogleMap from "../../components/common/ClusterMap";
const { Content, Header } = Layout;

const disabledDate = (current) => {
  // Can not select days before today and today
  return (
    current &&
    (current > dayjs().endOf("day") || current < dayjs().startOf("year"))
  );
};

const AccidentMap = () => {
  var d = new Date();
  var n = d.getHours();
  const [time, setTime] = useState(null);
  const [data, setData] = useState(null);
  const [heatMap, setHeatMap] = useState(false);
  const { location, cancelLocationWatch, error } = useWatchLocation();
  useEffect(() => {
    if (!location) return;
    return function cleanUp() {
      cancelLocationWatch();
    };
  }, [location, cancelLocationWatch]);
  useEffect(() => {
    setData(AccidentData[time]);
  }, [time]);
  return (
    <Layout style={{ height: "100%" }}>
      <Header className="header">
        <div className="header-title">Accident Map</div>
      </Header>
      <Content>
        <DateTimeTypePicker n={n} setTime={setTime} setHeatMap={setHeatMap} />
        {!!!heatMap && data !== null ? (
          <GoogleMap
            isShownHere
            markers={
              data
                ? data.map((point, index) => ({
                    id: index,
                    lat: point.coordinate.lat,
                    lng: point.coordinate.lng,
                    detail: point.detail,
                  }))
                : []
            }
            here={{
              lat: location?.latitude,
              lng: location?.longitude,
            }}
          />
        ) : (
          <MyMapComponent
            zoom={8}
            isShownHere
            heatMapData={heatMap && data?.map((point) => point.coordinate)}
          />
        )}
      </Content>
    </Layout>
  );
};
export default AccidentMap;
