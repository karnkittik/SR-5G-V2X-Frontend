import Chart from "react-apexcharts";
const ordinalSuffix = (val) => {
  return `${val} ${
    ["", "st", "nd", "rd"][(val / 10) % 10 ^ 1 && val % 10] || "th"
  }`;
};

const HeatMapCalendar = (props) => (
  <Chart
    options={{
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
        heatmap: {
          shadeIntensity: 0.5,
          radius: 0,
          useFillColorAsStroke: false,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 0,
                name: "none",
                color: "#EFF3FF",
              },
              {
                from: 1,
                to: 20,
                name: "1-20",
                color: "#6AAED6",
              },
              {
                from: 21,
                to: 40,
                name: "21-40",
                color: "#3282BD",
              },
              {
                from: 41,
                to: 70,
                name: "41-70",
                color: "#0B519C",
              },
              {
                from: 71,
                to: 100,
                name: "71-100",
                color: "#0A4064",
              },
            ],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
      },
      tooltip: {
        y: {
          show: true,
          formatter: function (
            value,
            { series, seriesIndex, dataPointIndex, w }
          ) {
            return value;
          },
          style: {
            fontWeight: "inherit",
          },
          title: {
            formatter: (seriesName) => `${seriesName}:
          Count`,
          },
        },
        x: {
          formatter: function (val, opts) {
            return ordinalSuffix(val);
          },
        },
      },
      title: {
        text: undefined,
        style: {
          align: "center",
          fontSize: "18px",
          fontWeight: 400,
          color: "#666",
        },
      },
      zoom: {
        enabled: false,
      },
    }}
    series={props.data}
    type="heatmap"
    height={props.height}
  />
);

export default HeatMapCalendar;
