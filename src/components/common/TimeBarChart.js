import Chart from "react-apexcharts";
var timeseries = [
  "0:00",
  "1:00",
  "2:00",
  "3:00",
  "4:00",
  "5:00",
  "6:00",
  "7:00",
  "8:00",
  "9:00",
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
      colors: [
        function ({ value, seriesIndex, w }) {
          if (value < 5) {
            return "#fad738ff";
          } else if (value >= 5 && value < 16) {
            return "#adbf78ff";
          } else {
            return "#469fcdff";
          }
        },
      ],
    },
    dataLabels: {
      enabled: true,
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
        enabled: true,
      },
    },
    yaxis: {
      min: 0,
      max: Math.max(...props.data) + 1,
      labels: {
        show: true,
        align: "right",
        offsetX: -5,
        offsetY: 0,
      },
    },
    tooltip: {
      x: {
        formatter: function (value) {
          return `${value} - ${
            parseInt(value.substr(value.indexOf(".") + 1)) + 1
          }.00`;
        },
      },
    },
    title: {
      text: props.title,
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
  return <Chart options={options} series={series} type="bar" height="100%" />;
};
export default TimeBarChart;
