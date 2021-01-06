import { AccidentRoadPie } from "../mock/Statistics";
import Chart from "react-apexcharts";
var options = {
  labels: AccidentRoadPie.labels,
  colors: [
    "#fad738ff",
    "#79afa3ff",
    "#128ff8ff",
    "#c6c763ff",
    "#2c97e3ff",
    "#adbf78ff",
    "#469fcdff",
    "#5fa7b8ff",
    "#93b78dff",
    "#e0cf4dff",
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
      donut: {
        labels: {
          show: true,
          total: {
            showAlways: true,
            show: true,
          },
        },
      },
    },
  },
  dataLabels: {
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
    text: "Accident On Road",
    offsetX: 0,
    offsetY: 0,
    style: {
      align: "center",
      fontSize: "18px",
      fontWeight: 400,
      color: "#666",
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
  tooltip: {
    enabled: true,
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

const MyResponsivePie = () => (
  <Chart
    options={options}
    series={AccidentRoadPie.series}
    type="donut"
    height="100%"
  />
);

export default MyResponsivePie;
