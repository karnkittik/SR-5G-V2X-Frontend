import { Table, Tooltip } from "antd";
const Ranking = (props) => {
  const columns = [
    {
      title: "No.",
      key: "index",
      render: (value, item, index) => (
        <div className={index < 3 ? `numberCircle rank${1}` : ""}>
          {index + 1}
        </div>
      ),
      align: "center",
      width: "40px",
    },
    {
      title: "Road Name",
      dataIndex: "road_name",
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      render: (roadName) => (
        <Tooltip placement="topLeft" title={roadName}>
          {roadName}
        </Tooltip>
      ),
    },
    {
      title: "Count",
      dataIndex: "accident_count",
      render: (text, record) => <div>{text}</div>,
      align: "center",
      width: "70px",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={props.data}
      rowKey={(record) => record.road_name + "rank" + record.accident_count}
      pagination={false}
      loading={props.loading}
      showHeader={false}
      bordered={false}
      size="small"
    />
  );
};
export default Ranking;
