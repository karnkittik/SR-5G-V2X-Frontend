import { Layout } from "antd";
const { Header } = Layout;

const PageHeader = ({ title }) => {
  return (
    <Header className="header">
      <div className="header-title">{title}</div>
    </Header>
  );
};
export default PageHeader;
