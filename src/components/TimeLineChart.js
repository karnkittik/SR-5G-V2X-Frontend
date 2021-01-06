import Chart from "react-apexcharts";
import { AccidentTime } from "../mock/Statistics";
var maxSeries = Math.max(...AccidentTime[0].data.map((data) => data[1]));
var options = {
  chart: {
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    animations: {
      initialAnimation: {
        enabled: false,
      },
    },
    toolbar: {
      show: true,
      offsetX: 0,
      offsetY: 0,
      tools: {
        download: true,
        selection: true,
        zoom: false,
        zoomin: true,
        zoomout: true,
        pan: false,
        reset: true | '<img src="/static/icons/reset.png" width="20">',
        customIcons: [],
      },
      autoSelected: "pan",
    },
  },
  stroke: {
    width: 7,
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    tickAmount: 10,
    labels: {
      datetimeFormatter: {
        year: "yyyy",
        month: "MMM 'yy",
        day: "dd MMM",
        hour: "HH:mm",
      },
    },
    tooltip: {
      enabled: false,
      formatter: undefined,
      offsetY: 0,
      style: {
        fontSize: 0,
        fontFamily: 0,
      },
    },
  },
  tooltip: {
    x: {
      show: true,
      format: "dd MMM 'yy HH:mm",
      formatter: undefined,
    },
  },
  title: {
    text: "Accident Count In Time",
    offsetX: 0,
    offsetY: 0,
    style: {
      align: "center",
      fontSize: "18px",
      fontWeight: 400,
      color: "#666",
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      gradientToColors: ["#FDD835"],
      shadeIntensity: 1,
      type: "horizontal",
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100],
    },
  },
  markers: {
    size: 4,
    // colors: ["#FFA4FB"],
    strokeColors: "#fff",
    strokeWidth: 2,
    hover: {
      size: 7,
    },
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: undefined,
    formatter: function (val, opts) {
      return val;
    },
    textAnchor: "middle",
    distributed: false,
    offsetX: 0,
    offsetY: -8,
    style: {
      fontSize: "12px",
      colors: ["#FFA41B"],
    },
    background: {
      enabled: true,
      foreColor: "#fff",
      padding: 4,
      borderRadius: 2,
      borderWidth: 1,
      borderColor: "#fff",
      opacity: 0.9,
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: "#000",
        opacity: 0.45,
      },
    },
    dropShadow: {
      enabled: false,
      top: 1,
      left: 1,
      blur: 1,
      color: "#000",
      opacity: 0.45,
    },
  },
  yaxis: {
    min: 0,
    max: maxSeries + 5,
    labels: {
      show: true,
      align: "right",
      offsetX: -5,
      offsetY: 0,
    },
  },
};

const MyResponsiveLine = () => (
  <Chart options={options} series={AccidentTime} type="line" height="100%" />
);
export default MyResponsiveLine;
