import Chart from "react-apexcharts";
var timeseries = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const TimeBarChart = (props) => {
  const options = {
    chart: {
      fontFamily: "inherit",
      fontSize: "inherit",
      fontWeight: "inherit",
      animations: {
        initialAnimation: {
          enabled: false,
        },
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: false,
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
    plotOptions: {
      bar: {
        dataLabels: {
          position: "top",
        },
        columnWidth: "95%",
      },
    },
    fill: {
      old_colors: [
        function ({ value, seriesIndex, w }) {
          if (value < 5) {
            return "#6AAED6";
          } else if (value >= 5 && value < 16) {
            return "#3282BD";
          } else {
            return "#0B519C";
          }
        },
      ],
      colors: ["#c59c6a"],
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return val;
      },
      offsetY: -25,
      style: {
        fontSize: "12px",
        colors: ["#666"],
      },
    },
    xaxis: {
      categories: timeseries.slice(0, props.data.length),
      position: "bottom",
      tickAmount: 4,
      tooltip: {
        enabled: false,
      },
      labels: {
        trim: false,
        rotate: 0,
        rotateAlways: false,
        // formatter: function (value) {
        //   return `${value}-${
        //     value === "23:00"
        //       ? "00"
        //       : parseInt(value.substr(value.indexOf(".") + 1)) + 1
        //   }:00`;
        // },
      },
    },
    yaxis: {
      min: 0,
      max: Math.max(...props.data) === 0 ? 10 : Math.max(...props.data) + 1,
      labels: {
        show: true,
        align: "right",
        offsetX: -5,
        offsetY: 0,
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
    },
    tooltip: {
      x: {
        formatter: function (value) {
          return `${value} - ${
            value === "23:00"
              ? "00"
              : parseInt(value.substr(value.indexOf(".") + 1)) + 1
          }:00`;
        },
      },
    },
    title: {
      // text: props.title,
      text: undefined,
      style: {
        align: "center",
        fontSize: "18px",
        fontWeight: 400,
        color: "#666",
      },
    },
  };
  var series = [
    {
      name: "Counts",
      data: props.data,
    },
  ];
  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={props.height || "280px"}
    />
  );
};
export default TimeBarChart;
