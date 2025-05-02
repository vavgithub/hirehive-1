import React  from 'react'
import ReactECharts from "echarts-for-react";

export function ScreeningChart({scoreData}){
    const option = {
        textStyle: {
          fontFamily: "'Gilroy', sans-serif",
        },
        grid: {
            top: 10,    // Adjust the top margin
            bottom: 20, // Adjust the bottom margin
            left: 40,   // Adjust left margin if needed
            right: 10   // Adjust right margin if needed
          },
        xAxis: {
          type: 'category',
          data: Object.keys(scoreData),
          axisLabel: {
            formatter: function(value) {
              return value.length > 5 ? value.substring(0, 3) + '...' : value; // Truncate if longer than 10 characters
            },
            interval: 0, // Show all labels
          }
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'Values',
            type: 'bar',
            data: Object.values(scoreData),
            itemStyle: {
              color: 'rgba(4, 95, 253, 1)',
              borderRadius: [6, 6, 0, 0],
            },
          },
        ],
      };
    
      return <ReactECharts option={option} style={{ height: 130 }} />;
}