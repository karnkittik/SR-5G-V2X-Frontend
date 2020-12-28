import { config } from "../../config/config";
import React, { useEffect, useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import marker from "../../assets/marker.png";
import pin from "../../assets/pin.png";

const useWatchLocation = (options = {}) => {
  const [location, setLocation] = useState();
  const [error, setError] = useState();
  const locationWatchId = useRef(null);

  const handleSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    setLocation({
      latitude,
      longitude,
    });
  };
  const handleError = (error) => {
    setError(error.message);
  };
  const cancelLocationWatch = () => {
    if (locationWatchId.current && navigator.geolocation) {
      navigator.geolocation.clearWatch(locationWatchId.current);
    }
  };
  useEffect(() => {
    locationWatchId.current = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    );
    return cancelLocationWatch;
  }, [options]);
  return { location, cancelLocationWatch, error };
};
const Marker = () => (
  <div style={{ position: "absolute", transform: "translate(-50%, -50%)" }}>
    <img src={marker} height="32" width="32" alt="marker" />
  </div>
);
const Here = () => (
  <div style={{ position: "absolute", transform: "translate(-50%, -100%)" }}>
    <img src={pin} height="50" width="50" alt="I'm here" />
  </div>
);
const MyMapComponent = (props) => {
  const { location, cancelLocationWatch, error } = useWatchLocation();
  useEffect(() => {
    if (!location) return;
    setTimeout(() => {
      cancelLocationWatch();
    }, 3000);
  }, [location, cancelLocationWatch]);
  if (error) {
    console.log(error);
  }
  return (
    <div style={{ height: "100%", width: "100%" }}>
      {location ? (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: config.googleMapAPI,
            language: config.googleMapLang,
            libraries: ["visualization"],
          }}
          center={{ lat: location.latitude, lng: location.longitude }}
          defaultZoom={props.zoom || 18}
          heatmap={{
            positions: props.heatMapData || [],
            options: { radius: 30, opacity: 0.6 },
          }}
        >
          {props.isShownHere && (
            <Here lat={location.latitude} lng={location.longitude} />
          )}
          {props.markers?.map((marker) => (
            <Marker
              key={marker.key}
              lat={marker.coordinate.lat}
              lng={marker.coordinate.lng}
            />
          ))}
        </GoogleMapReact>
      ) : (
        <div className="loading-map">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default MyMapComponent;
