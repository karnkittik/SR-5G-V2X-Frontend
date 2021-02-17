import Chart from "react-apexcharts";

const PieChart = (props) => {
  var { title, data } = props;
  var noData = true;
  if (data && data.labels && data.labels.length !== 0) {
    noData = false;
  }
  var options = {
    labels: noData ? ["None"] : data.labels,
    colors: noData
      ? ["#eeeeee"]
      : [
          "#79afa3",
          "#fad738",
          "#128ff8",
          "#c6c763",
          "#2c97e3",
          "#adbf78",
          "#469fcd",
          "#5fa7b8",
          "#93b78d",
          "#e0cf4d",
        ],
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
                return noData ? "0" : w.globals.seriesTotals;
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
      text: title,
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
