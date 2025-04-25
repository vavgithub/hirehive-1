import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";

function ApplicationChart({type,dataArray}) {
    const xData = dataArray?.map(data => type === "weekly" ? data?.week : type === "daily" ? data?.day : type === "yesterday" ? data?.hour : data?.month);
    const values = dataArray?.map(data => data?.totalCount ?? 0);

  const options = useMemo(()=>(
    {
        grid: {
          left: "8%",
          right: "2.5%",
          top: "10%",
          bottom: "15%"
        },
        xAxis: {
          type: "category",
          name: type === "daily" ? "Days" : type === "weekly" ? "Weeks" : "Months",
          nameLocation: "middle",
          nameGap: 30,
          data: xData,
         
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
  ),[xData,values,type])

  return <ReactECharts option={options} />;
}

export default ApplicationChart;
