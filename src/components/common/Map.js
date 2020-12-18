import { config } from "../../config/config";
import React, { useEffect, useState, useRef } from "react";
import GoogleMapReact from "google-map-react";

const useCurrentLocation = (options = {}) => {
  const [location, setLocation] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
    return;
  }, [options]);
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
  return { location, error };
};
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
    <img
      src="https://png2.cleanpng.com/dy/c90ec3c2094e1e47b81d4f0014c6856a/L0KzQYi4UsE4N2c1epGAYUO5SYeBhsI5a2M4UZC7NkS2Q4eAUME2OWQ6SqgEMke0Roi1kP5o/5a36968f28c239.264336701513526927167.png"
      height="32"
      width="32"
      alt="marker"
    />
  </div>
);
const Here = () => (
  <div style={{ position: "absolute", transform: "translate(-50%, -100%)" }}>
    <img
      src="https://img3.thaipng.com/dy/db8bcd66e92dd0df0829d7a281b430ee/L0KzQYm3VsE3N5h1jpH0aYP2gLBuTfkuaZ4ygNd7ZT3rhb72lgIufF54gNt7dD3rdb3zTfkuaZ4ygNd7ZT24coO7hMZnOWloT9M8MD62RIS7VMM6QGI6Sqs6NEC8R4i8V8U1NqFzf3==/kisspng-i-am-here-humour-t-shirt-hell-i-am-here-5b24d6f18c7a30.3434439815291409775754.png"
      height="50"
      width="50"
      alt="I'm here"
    />
  </div>
);
const MyMapComponent = (props) => {
  const { location, cancelLocationWatch, error } = useWatchLocation();
  useEffect(() => {
    if (!location) return;
    // Cancel location watch after 3sec once the location was found.
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
          defaultCenter={{ lat: location.latitude, lng: location.longitude }}
          defaultZoom={props.zoom || 18}
          heatmap={props.heatMapData}
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
