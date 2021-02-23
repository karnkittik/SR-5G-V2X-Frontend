import { React, useState, useEffect } from "react";
import { Layout } from "antd";
import MyMapComponent, { useWatchLocation } from "../../components/common/Map";
import DateTimeTypePicker from "../../components/common/DateTimeTypePicker";
import GoogleMap from "../../components/common/ClusterMap";
import { DrowsinessService } from "../../utils/api";
const { Content, Header } = Layout;

const DrowsinessMap = () => {
  var d = new Date();
  var n = d.getHours();
  const [time, setTime] = useState(null);
  const [data, setData] = useState(null);
  const [heatMap, setHeatMap] = useState(false);
  const { location, cancelLocationWatch } = useWatchLocation();
  useEffect(() => {
    if (!location) return;
    return function cleanUp() {
      cancelLocationWatch();
    };
  }, [location, cancelLocationWatch]);
  useEffect(() => {
    fetchMap(time);
  }, [time]);
  const fetchMap = (time) => {
    if (time === null) return;
    DrowsinessService.fetchMap(
      time,
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
      <Header className="header">
        <div className="header-title">Drowsiness Map</div>
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
export default DrowsinessMap;
