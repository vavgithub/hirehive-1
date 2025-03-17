import React  from 'react'
import ReactECharts from "echarts-for-react";

export function ScreeningChart({scoreData}){
    const option = {
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
              color: '#5470C6',
            },
          },
        ],
      };
    
      return <ReactECharts option={option} style={{ height: 130 }} />;
}