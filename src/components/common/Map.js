import { config } from "../../config/config";
import React, { useEffect, useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import { Here } from "./Marker";
import { bangkokCoords } from "../../mock/Coordinate";
export const useWatchLocation = (options = {}) => {
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
  if (error) {
    //console.log(error);
  }
  return { location, cancelLocationWatch, error };
};
const createMapOptions = (maps) => {
  return {
    panControl: false,
    mapTypeControl: false,
    scrollwheel: true,
    zoomControl: false,
    fullscreenControl: false,
    mapTypeId: "roadmap",
    // styles: [
    //   {
    //     stylers: [
    //       { saturation: -100 },
    //       { gamma: 0.8 },
    //       { lightness: 4 },
    //       { visibility: "on" },
    //     ],
    //   },
    // ],
  };
};
const MyMapComponent = (props) => {
  return (
    <div className="content-block-full">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: config.googleMapAPI,
          language: config.googleMapLang,
          libraries: ["visualization"],
        }}
        center={{
          lat: props.location?.latitude,
          lng: props.location?.longitude,
        }}
        defaultCenter={bangkokCoords}
        defaultZoom={props.zoom || 8}
        options={createMapOptions}
        heatmap={{
          positions: !!props.heatMapData ? props.heatMapData : [],
          options: { radius: 30, opacity: 0.6 },
        }}
        hoverDistance={20}
      >
        {props.isShownHere && props.location && (
          <Here
            lat={props.location?.latitude}
            lng={props.location?.longitude}
          />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default MyMapComponent;
