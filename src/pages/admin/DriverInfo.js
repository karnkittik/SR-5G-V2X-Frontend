import { useParams } from "react-router-dom";

const DriverInfo = () => {
  const { driver_id: id } = useParams();
  return <div>{id}</div>;
};
export default DriverInfo;
