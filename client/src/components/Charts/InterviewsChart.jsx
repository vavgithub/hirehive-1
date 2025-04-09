import React, { useMemo } from 'react'
import ReactECharts from "echarts-for-react";

function InterviewsChart({dataSet}) {
    const formattedDataSet = useMemo(()=>{
        if(dataSet){
            return Object.entries(dataSet).map(([key,value])=>({name : key,value}));
        }else{
           return []
        }
    },[dataSet])

    const options = {
        textStyle: {
            fontFamily: "Outfit, sans-serif"  // Apply Outfit font globally
          },
        tooltip: {
          trigger: 'item',
          backgroundColor: "rgba(32, 33, 34, 1)", // Teal with transparency
          borderColor: "#fff",
          borderWidth: 0,
          borderRadius: 12,
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
        legend: {
          top: '6%',
          left: 'center',
          textStyle: {
            color: "#fff",  // Legend text color
           }
        },
        series: [
          {
            name: 'Interviews',
            type: 'pie',
            radius: ['50%', '75%'],
            avoidLabelOverlap: false,
            center: ['50%', '60%'],
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
  return <ReactECharts option={options} style={{height : "90%"}} />;
}

export default InterviewsChart
