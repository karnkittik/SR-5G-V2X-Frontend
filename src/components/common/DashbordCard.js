import styled from "styled-components";
const DashbordCard = styled.div`
  margin: auto;
  padding: 20px;
  background-color: white;
  width: calc(100%-20px);
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: ${(props) => props.height || "312px"}; ;
`;
export const ContentCard = styled.div`
  height: 100%;
  padding: 5px 10px;
  .title-card {
    font-size: 18px;
    font-weight: 400;
    color: #666;
    margin-bottom: 15px;
  }
`;
export default DashbordCard;
