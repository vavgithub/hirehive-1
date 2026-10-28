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

    const labelColor = useGeodeToken('--geode-text-muted', 'currentColor');
    const fontFamily = useGeodeToken('--geode-font-sans', 'Gilroy, sans-serif');
    const pink = useGeodeToken('--geode-chart-1', 'currentColor');
    const teal = useGeodeToken('--geode-chart-2', 'currentColor');
    const green = useGeodeToken('--geode-stage-screening', 'currentColor');
    const purple = useGeodeToken('--geode-chart-4', 'currentColor');
    const orange = useGeodeToken('--geode-chart-5', 'currentColor');
    const colorFor = (name) => {
      if (name.startsWith('Screening')) return green
      if (name.startsWith('Round 1')) return orange
      if (name.startsWith('Round 2')) return purple
      if (name.startsWith('Design')) return teal
      return pink
    }

    const options = {
        textStyle: {
          fontFamily,
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: "var(--geode-card)",
          borderColor: "var(--geode-border)",
          borderWidth: 1,
          borderRadius: 12,
          padding: 10,
          textStyle: {
            color: "var(--geode-text)",
          },
          axisPointer: {
            type: "none",
          },
          
          extraCssText: "min-width: 100px;"
        },
        legend: {
          orient: 'horizontal',
          bottom: 0,
          left: 'center',
          itemGap: 16,
          textStyle: {
            color: labelColor,
            fontFamily,
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['52%', '74%'],
            avoidLabelOverlap: false,
            center: ['50%', '44%'],
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
            data: formattedDataSet.map((item) => ({ ...item, itemStyle: { color: colorFor(item.name) } }))
          }
        ]
      };
  return <ReactECharts option={options} className="h-72 w-full" />;
}

export default InterviewsChart
