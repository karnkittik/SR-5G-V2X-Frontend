import styled from "styled-components";
import { Row, Col, Spin } from "antd";
const DashbordCard = styled.div`
  margin: auto;
  padding: 20px;
  background-color: white;
  width: calc(100%-20px);
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: ${(props) => props.height || "312px"};
`;
export const ContentCard = styled.div`
  height: 100%;
  padding: 5px 10px;
  .title-card {
    font-size: 18px;
    font-weight: 400;
    color: #666;
    margin-bottom: ${(props) => props.mb || "10px"};
  }
`;
export const NumberCard = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  .number {
    font-size: 48px;
    font-weight: 500;
    color: #666;
    /* text-shadow: 2px 2px 2px #666; */
    /* -webkit-text-stroke: 1px #666; */
    position: absolute;
    top: 20px;
  }
  .image {
    transform: scale(1.2);
  }
`;

export const SpinArea = styled.div`
  width: 100%;
  height: calc(100% - 10px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CountCard = (props) => {
  return (
    <ContentCard>
      <div className="title-card">{props.title}</div>
      <Row>
        <Col xs={24}>
          <NumberCard>
            <div className="number">{props.count}</div>
          </NumberCard>
        </Col>
      </Row>
    </ContentCard>
  );
};

export const EmptyCard = (props) => {
  return (
    <ContentCard mb="0">
      <div className="title-card">{props.title}</div>
      <SpinArea>
        <Spin>{props.children}</Spin>
      </SpinArea>
    </ContentCard>
  );
};
export const DashbordCardLoading = (props) => {
  return (
    <DashbordCard height={props.height}>
      <Spin spinning={props.loading} tip="Loading...">
        {props.children}
      </Spin>
    </DashbordCard>
  );
};

export default DashbordCard;
