import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { formatUTCToLocalTimeAuto, UTCToShortDate, UTCToShortMonth } from "../../utility/timezoneConverter";
import { useGeodeToken } from "../../lib/readGeodeToken";

function ApplicationChart({type,dataArray}) {
    const xData = dataArray?.map(data => type === "weekly" ? `${UTCToShortDate(data?.week?.start)} - ${UTCToShortDate(data?.week?.end)}` : type === "daily" ? `${UTCToShortMonth(data?.day)}` : type === "yesterday" ? formatUTCToLocalTimeAuto(data?.hour) : data?.month);
    const values = dataArray?.map(data => data?.totalCount ?? 0);
    const lineColor = useGeodeToken("--geode-chart-1", "currentColor");
    const gridColor = useGeodeToken("--geode-border", "currentColor");
    const labelColor = useGeodeToken("--geode-text-muted", "currentColor");
    const fontFamily = useGeodeToken("--geode-font-sans", "Gilroy, sans-serif");
    
  const options = useMemo(()=>(
    {
        textStyle: {
          fontFamily
        },
        grid: {
          left: 56,
          right: 12,
          top: 16,
          bottom: 28,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          name: type === "daily" ? "Days" : type === "weekly" ? "Weeks" : type === "yesterday" ? 'Hours' : "Months",
          nameLocation: "middle",
          nameGap: 28,
          data: xData,
          axisLabel: { color: labelColor },
          nameTextStyle: { color: labelColor },
        },
        yAxis: {
          type: "value",
          name: "Candidate Applications",
          nameLocation: "middle",
          nameGap: 40,
          axisLabel: { color: labelColor, margin: 8 },
          nameTextStyle: { color: labelColor },
          splitLine: {
            lineStyle: {
              color: gridColor,
              type: "dashed"
            }
          }
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "var(--color-background-70)", // Teal with transparency
          borderColor: "#fff",
          textStyle: {
            color: "var(--color-font-main)",
          },
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
              color: lineColor,
              width: 2
            },
            itemStyle: {
              color: lineColor
            }
          }
        ]
      }
  ),[xData,values,type,lineColor,gridColor,labelColor,fontFamily])

  return <ReactECharts option={options} className="geode-trend-chart" />;
}

export default ApplicationChart;
