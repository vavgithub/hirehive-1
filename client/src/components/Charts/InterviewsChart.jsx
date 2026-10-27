import React, { useMemo } from 'react'
import ReactECharts from "echarts-for-react";
import { useGeodeToken } from "../../lib/readGeodeToken";

function InterviewsChart({dataSet}) {
    const formattedDataSet = useMemo(()=>{
        if(dataSet){
            return Object.entries(dataSet).map(([key,value])=>({name : key === "Screening" ? key + ' Round' : key + ' Interview',value}));
        }else{
           return []
        }
    },[dataSet])

    const labelColor = useGeodeToken('--geode-text', 'currentColor');
    const fontFamily = useGeodeToken('--geode-font-sans', 'Gilroy, sans-serif');
    const chartColors = [
      useGeodeToken('--geode-chart-1', 'currentColor'),
      useGeodeToken('--geode-chart-2', 'currentColor'),
      useGeodeToken('--geode-chart-3', 'currentColor'),
      useGeodeToken('--geode-chart-4', 'currentColor'),
      useGeodeToken('--geode-chart-5', 'currentColor'),
    ];

    const options = {
        textStyle: {
          fontFamily,
        },
        color: chartColors,
        tooltip: {
          trigger: 'item',
          backgroundColor: "var(--color-background-70)", // Teal with transparency
          borderColor: "#fff",
          borderWidth: 0,
          borderRadius: 12,
          padding: 10,
          textStyle: {
            color: "var(--color-font-main)",
          },
          axisPointer: {
            type: "none",
          },
          
          extraCssText: "min-width: 100px;"
        },
        legend: {
          orient: 'vertical',     // Stack items vertically
          right: 32,
          itemGap: 32,
          top: 'center',          // Vertically center the legend
          textStyle: {
            color: labelColor,
            padding: [0, 0, 0, 12]
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '75%'],
            avoidLabelOverlap: false,
            center: ['32%', '50%'],
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: formattedDataSet
          }
        ]
      };
  return <ReactECharts option={options} style={{minHeight : "20rem",height : "90%"}} />;
}

export default InterviewsChart
