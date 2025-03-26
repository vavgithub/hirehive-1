import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";

function ApplicationChart({dataArray}) {
    const months = dataArray?.map(data => data?.month);
    const values = dataArray?.map(data => data?.totalCount ?? 0);

  const options = useMemo(()=>(
    {
        textStyle: {
          fontFamily: "Outfit, sans-serif"  // Apply Outfit font globally
        },
        grid: {
          left: "8%",
          right: "2.5%",
          top: "10%",
          bottom: "15%"
        },
        xAxis: {
          type: "category",
          name: "Months",
          nameLocation: "middle",
          nameGap: 30,
          data: months,
          axisLabel: {
            fontFamily: "Outfit, sans-serif",  // Font for x-axis labels
            fontSize: 12
          },
          nameTextStyle: {
            fontFamily: "Outfit, sans-serif", // Font for x-axis name
            fontSize: 14
          }
        },
        yAxis: {
          type: "value",
          name: "Applications",
          nameLocation: "middle",
          nameGap: 50,
          splitLine: {
            lineStyle: {
              color: "#aaa",
              type: "none"
            }
          },
          axisLabel: {
            fontFamily: "Outfit, sans-serif",  // Font for y-axis labels
            fontSize: 12
          },
          nameTextStyle: {
            fontFamily: "Outfit, sans-serif", // Font for y-axis name
            fontSize: 14
          }
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(32, 33, 34, 1)", // Teal with transparency
          borderColor: "#fff",
          borderWidth: 0,
          borderRadius: 8,
          padding: 10,
          axisPointer: {
            type: "none",
          },
          textStyle: {
            fontFamily: "Outfit, sans-serif", // Font for tooltip
            fontSize: 12,
            color : "white"
          },
          extraCssText: "min-width: 100px;"
        },
        series: [
          {
            data: values,
            type: "line",
            lineStyle: {
              color: "teal",
              width: 2
            },
            itemStyle: {
              color: "teal"
            }
          }
        ]
      }
  ),[months,values])

  return <ReactECharts option={options} />;
}

export default ApplicationChart;
