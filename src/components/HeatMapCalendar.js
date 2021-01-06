import { ResponsiveCalendar } from "@nivo/calendar";
import { Typography } from "antd";
import { AccidentCalendar, AccidentHeatMap } from "../mock/Statistics";
import Chart from "react-apexcharts";
const { Text } = Typography;
const MyResponsiveCalendar2 = () => (
  <>
    <Text className="dashboard-title">Accident Calendar</Text>
    <ResponsiveCalendar
      data={AccidentCalendar}
      from="2015-01-01"
      to="2015-12-31"
      emptyColor="#eeeeee"
      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
      margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
      yearSpacing={50}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
    />
  </>
);
const ordinalSuffix = (val) => {
  return `${val} ${
    ["", "st", "nd", "rd"][(val / 10) % 10 ^ 1 && val % 10] || "th"
  }`;
};
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
            to: 5,
            name: "low",
            color: "#FAD738",
          },
          {
            from: 6,
            to: 20,
            name: "medium",
            color: "#BDC182",
          },
          {
            from: 21,
            to: 45,
            name: "high",
            color: "#74A9BE",
          },
          {
            from: 46,
            to: 100,
            name: "extreme",
            color: "#128FF8",
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
      formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
        return value;
      },
      style: {
        fontWeight: "inherit",
      },
      title: {
        formatter: (seriesName) => "",
      },
    },
  },
  title: {
    text: "Accident Calendar HeatMap",
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
};

const MyResponsiveCalendar = () => (
  <Chart
    options={options}
    series={AccidentHeatMap}
    type="heatmap"
    height="100%"
  />
);

export default MyResponsiveCalendar;
