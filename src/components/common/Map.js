import { config } from "../../config/config";
import React, { useEffect, useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import marker from "../../assets/marker.png";
import pin from "../../assets/pin.png";
import styled from "styled-components";
import dayjs from "dayjs";
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
const Marker = (props) => {
  const HoverMessage = styled.div`
    padding: 5px 5px;
    text-align: center;
    background-color: white;
    border-radius: 5px;
    max-width: 120px;
    transform: translateX(-50%) translateY(calc(-100% - 20px));
    z-index: 9995;
    position: absolute;
    height: auto;
    word-wrap: break-word;
  `;
  return (
    <div>
      {props.$hover && (
        <HoverMessage style={{ backgroundColor: "white" }}>
          <div>
            {props.detail != null
              ? dayjs(props.detail.time).format("hh:mm")
              : ""}
          </div>
          {props.showMore && <div>{`DriverID: ${props.detail.info}`}</div>}
        </HoverMessage>
      )}
      <img
        src={marker}
        height="32"
        width="32"
        alt="marker"
        style={{
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: props.$hover && "3px solid blue",
        }}
      />
    </div>
  );
};
const Here = () => (
  <div style={{ position: "absolute", transform: "translate(-50%, -100%)" }}>
    <img src={pin} height="50" width="50" alt="I'm here" />
  </div>
);
const createMapOptions = (maps) => {
  return {
    panControl: false,
    mapTypeControl: false,
    scrollwheel: true,
    zoomControl: false,
    fullscreenControl: false,
    mapTypeId: "roadmap",
    styles: [
      {
        stylers: [
          { saturation: -100 },
          { gamma: 0.8 },
          { lightness: 4 },
          { visibility: "on" },
        ],
      },
    ],
  };
};
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
    <div className="content-block-full">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: config.googleMapAPI,
          language: config.googleMapLang,
          libraries: ["visualization"],
        }}
        center={{
          lat: location?.latitude,
          lng: location?.longitude,
        }}
        defaultZoom={props.zoom || 18}
        options={createMapOptions}
        heatmap={{
          positions: !!props.heatMapData ? props.heatMapData : [],
          options: { radius: 30, opacity: 0.6 },
        }}
        hoverDistance={20}
      >
        {props.isShownHere && location && (
          <Here lat={location?.latitude} lng={location?.longitude} />
        )}
        {!!props.markers &&
          props.markers.map((marker, index) => (
            <Marker
              key={index + "m"}
              lat={marker.coordinate.lat}
              lng={marker.coordinate.lng}
              detail={marker.detail}
              showMore={props.showMore}
            />
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default MyMapComponent;
