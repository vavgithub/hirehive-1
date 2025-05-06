import React, { useMemo } from 'react'
import ReactECharts from "echarts-for-react";

function InterviewsChart({dataSet}) {
    const formattedDataSet = useMemo(()=>{
        if(dataSet){
            return Object.entries(dataSet).map(([key,value])=>({name : key === "Screening" ? key + ' Round' : key + ' Interview',value}));
        }else{
           return []
        }
    },[dataSet])

    const options = {
        textStyle: {
          fontFamily: "'Gilroy', sans-serif",
        },
        color: ['rgba(2, 75, 202, 1)', 'rgba(27, 110, 253, 1)', 'rgba(108, 161, 254, 1)'],        textStyle: {
          fontFamily: 'Gilroy, sans-serif'
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: "rgba(32, 33, 34, 1)", // Teal with transparency
          borderColor: "#fff",
          borderWidth: 0,
          borderRadius: 12,
          padding: 10,
          textStyle: {
            color: "#fff",
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
            color: "#fff",
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
