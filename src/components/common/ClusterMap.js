import React from "react";
import GoogleMapReact from "google-map-react";
import supercluster from "points-cluster";
import Marker, { Here } from "./Marker";
import ClusterMarker from "./ClusterMarker";
import { bangkokCoords } from "../../mock/Coordinate";
import { config } from "../../config/config";

const MAP = {
  defaultZoom: 8,
  defaultCenter: bangkokCoords,
  options: {
    maxZoom: 19,
    panControl: false,
    mapTypeControl: false,
    scrollwheel: true,
    zoomControl: false,
    fullscreenControl: false,
    mapTypeId: "roadmap",
  },
};
export class GoogleMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mapOptions: {
        center: MAP.defaultCenter,
        zoom: MAP.defaultZoom,
      },
      clusters: [],
    };
  }

  getClusters = () => {
    const clusters = supercluster(this.props.markers, {
      minZoom: 0,
      maxZoom: 16,
      radius: 60,
    });

    return clusters(this.state.mapOptions);
  };

  createClusters = (props) => {
    this.setState({
      clusters: this.state.mapOptions.bounds
        ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => {
            // console.log(wx, wy, numPoints, points);
            return {
              lat: wy,
              lng: wx,
              numPoints,
              id: `${numPoints}_${points[0].id}`,
              detail: points[0].detail,
              points,
            };
          })
        : [],
    });
  };

  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds,
        },
      },
      () => {
        this.createClusters(this.props);
      }
    );
  };

  render() {
    return (
      <GoogleMapReact
        defaultZoom={MAP.defaultZoom}
        defaultCenter={bangkokCoords}
        options={MAP.options}
        onChange={this.handleMapChange}
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{
          key: config.googleMapAPI,
          libraries: ["visualization"],
        }}
      >
        {this.props.isShownHere && (
          <Here lat={this.props.here.lat} lng={this.props.here.lng} />
        )}
        {this.state.clusters.map((item) => {
          if (item.numPoints === 1) {
            return (
              <Marker
                key={item.id}
                lat={item.points[0].lat}
                lng={item.points[0].lng}
                detail={item.points[0].detail}
              />
            );
          }

          return (
            <ClusterMarker
              key={item.id}
              lat={item.lat}
              lng={item.lng}
              points={item.points}
            />
          );
        })}
      </GoogleMapReact>
    );
  }
}

export default GoogleMap;
