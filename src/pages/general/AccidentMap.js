import { React, useState, useEffect } from "react";
import { Layout } from "antd";
import MyMapComponent, { useWatchLocation } from "../../components/common/Map";
import DateTimeTypePicker from "../../components/common/DateTimeTypePicker";
import { AccidentData } from "../../mock/Coordinate";
import { AccidentService } from "../../utils/api";
import GoogleMap from "../../components/common/ClusterMap";
const { Content, Header } = Layout;

const AccidentMap = () => {
  var d = new Date();
  var n = d.getHours();
  const [time, setTime] = useState(null);
  const [data, setData] = useState([]);
  const [heatMap, setHeatMap] = useState(false);
  const { location, cancelLocationWatch, error } = useWatchLocation();
  useEffect(() => {
    if (!location) return;
    return function cleanUp() {
      cancelLocationWatch();
    };
  }, [location, cancelLocationWatch]);
  useEffect(() => {
    console.log(time);
    setData(AccidentData[time]);
    // fetchHeatmap(time);
  }, [time]);
  const fetchHeatmap = (time) => {
    AccidentService.fetchHeatmap(
      time,
      ({ data }) => {
        console.log(data);
      },
      (response) => {
        console.log(response);
      }
    );
  };
  return (
    <Layout style={{ height: "100%" }}>
      <Header className="header">
        <div className="header-title">Accident Map</div>
      </Header>
      <Content>
        <DateTimeTypePicker n={n} setTime={setTime} setHeatMap={setHeatMap} />
        {!!!heatMap && data ? (
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
