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
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          radius: 0,
          useFillColorAsStroke: false,
          colorScale: {
            // ranges1: [
            //   {
            //     from: 0,
            //     to: 0,
            //     name: "none",
            //     color: "#2066AC",
            //   },
            //   {
            //     from: 1,
            //     to: 5,
            //     name: "1-5",
            //     color: "#66A9CE",
            //   },
            //   {
            //     from: 6,
            //     to: 20,
            //     name: "6-20",
            //     color: "#D2E4F0",
            //   },
            //   {
            //     from: 21,
            //     to: 35,
            //     name: "21-35",
            //     color: "#F7F7F7",
            //   },
            //   {
            //     from: 36,
            //     to: 50,
            //     name: "36-50",
            //     color: "#FDDBC7",
            //   },
            //   {
            //     from: 51,
            //     to: 70,
            //     name: "51-70",
            //     color: "#EF8B62",
            //   },
            //   {
            //     from: 71,
            //     to: 100,
            //     name: "71-100",
            //     color: "#B2172B",
            //   },
            // ],
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
          count`,
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
      xaxis: {
        tickAmount: 31,
        tooltip: {
          enabled: true,
          formatter: function (val, opts) {
            return ordinalSuffix(val);
          },
          offsetY: 0,
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 10,
          maxWidth: 160,
          style: {
            colors: [],
            height: "10px",
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
          formatter: (value) => {
            return value;
          },
        },
      },
      zoom: {
        enabled: false,
      },
    }}
    series={props.data}
    type="heatmap"
    height="280px"
  />
);

export default HeatMapCalendar;
