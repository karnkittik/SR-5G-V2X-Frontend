import React from "react";
import marker from "./../../assets/marker.png";
import dayjs from "dayjs";
import styled from "styled-components";
import pin from "./../../assets/pin.png";

const HoverMessage = styled.div`
  padding: 5px 5px;
  text-align: center;
  background-color: white;
  border-radius: 5px;
  max-width: 120px;
  transform: translateX(-50%) translateY(calc(-100% - 50px));
  /* transform: translateX(-50%) translateY(-100%); */
  min-width: 100px;
  z-index: 9995;
  position: absolute;
  height: auto;
  word-wrap: break-word;
`;
const Marker = (props) => {
  return (
    <div className="marker">
      {props.$hover && (
        <HoverMessage style={{ backgroundColor: "white" }}>
          <div>
            {props.detail ? dayjs(props.detail.time).format("HH:mm") : ""}
          </div>
          {/* <div>{props.lat && `Lat:${props.lat}`}</div>
          <div>{props.lng && `Lng:${props.lng}`}</div> */}
          {props.detail.driver && (
            <>
              <div>Username:</div>
              <div>{`"${props.detail.driver.username}"`}</div>
            </>
          )}
          {props.detail.road && (
            <>
              <div>Road:</div>
              <div>{`"${props.detail.road}"`}</div>
            </>
          )}
        </HoverMessage>
      )}
      <img
        src={marker}
        alt="accident"
        height="40"
        width="40"
        style={{ transform: "translate(-50%, -100%)" }}
      />
    </div>
  );
};
export const Here = () => (
  <div
    style={{
      position: "absolute",
      transform: "translate(-50%, -100%)",
      zIndex: "9999",
    }}
  >
    <img src={pin} height="44px" width="44px" alt="I'm here" />
  </div>
);

export default Marker;
