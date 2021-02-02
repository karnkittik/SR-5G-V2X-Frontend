import React from "react";
import m1 from "./../../assets/m1.png";
import m2 from "./../../assets/m2.png";
import m3 from "./../../assets/m3.png";
import m4 from "./../../assets/m4.png";
import m5 from "./../../assets/m5.png";
const ClusterImg = (props) => {
  var n = props.number;
  var img;
  switch (true) {
    case n > 60:
      img = m5;
      break;
    case n > 40:
      img = m4;
      break;
    case n > 20:
      img = m3;
      break;
    case n > 10:
      img = m2;
      break;
    default:
      img = m1;
  }
  return (
    <div className="cluster-img">
      <img src={img} alt="m1" />
      <div className="cluster-text">{props.number}</div>
    </div>
  );
};
const ClusterMarker = (props) => {
  // var clusterFaceMarkers = props.points.slice(0, 2);
  return (
    <div>
      <ClusterImg number={props.points.length} />
    </div>
  );
};

export default ClusterMarker;
