import Chart from "react-apexcharts";
const blues = [
  "#d4edf6",
  "#c6e2f0",
  "#bcdaec",
  "#aecfe6",
  "#a6c8e2",
  "#97bbdb",
  "#8bb1d6",
  "#7ba4cf",
  "#719cca",
  "#6391c4",
  "#5787bf",
  "#497cb9",
  "#3d72b3",
  "#3169ae",
  "#255fa8",
  "#1955a3",
  "#0d4b9d",
]
  .reverse()
  .filter((blue, index) => index % 4 === 0);

const PieChart = (props) => {
  var { data } = props;
  var noData = true;
  if (data && data.labels && data.labels.length !== 0) {
    noData = false;
  }
  var options = {
    labels: noData ? ["None"] : data.labels,
    colors: noData ? ["#eeeeee"] : blues,
    chart: {
      fontFamily: "inherit",
      fontSize: "inherit",
      fontWeight: "inherit",
      animations: {
        initialAnimation: {
          enabled: false,
        },
      },
      dropShadow: {
        enabled: false,
        color: "#111",
        top: -1,
        left: 3,
        blur: 3,
        opacity: 0.2,
      },
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
      },
    },
    stroke: {
      width: 0,
    },
    grid: {
      padding: {
        top: 20,
      },
    },
    plotOptions: {
      pie: {
        offsetX: 30,
        offsetY: 0,
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
              formatter: function (w) {
                return noData
                  ? "0"
                  : w.globals.seriesTotals.reduce((a, b) => a + b);
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: !noData,
      dropShadow: {
        blur: 3,
        opacity: 0.8,
      },
    },
    states: {
      hover: {
        filter: "none",
      },
    },
    theme: {
      palette: "palette2",
    },
    title: {
      // text: title,
      text: undefined,
      offsetX: 0,
      offsetY: 0,
      style: {
        align: "center",
        fontSize: "18px",
        fontWeight: 400,
        color: "#666",
      },
    },
    tooltip: {
      enabled: !noData,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: false,
      onDatasetHover: {
        highlightDataSeries: false,
      },
    },
  };

  return (
    <Chart
      options={options}
      series={!data?.series ? [100] : data.series}
      type="donut"
      height="280px"
    />
  );
};

export default PieChart;
