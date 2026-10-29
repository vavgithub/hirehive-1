import React, { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import { useGeodeToken } from '../../lib/readGeodeToken'

function InterviewsChart({ dataSet }) {
  const formattedDataSet = useMemo(() => {
    if (!dataSet) return []
    return Object.entries(dataSet).map(([key, value], index) => ({
      name: key === 'Screening' ? `${key} Round` : `${key} Interview`,
      value,
      swatch: String((index % 5) + 1),
    }))
  }, [dataSet])

  const fontFamily = useGeodeToken('--geode-font-sans', 'Gilroy, sans-serif')
  const chart1 = useGeodeToken('--geode-chart-1', 'currentColor')
  const chart2 = useGeodeToken('--geode-chart-2', 'currentColor')
  const chart3 = useGeodeToken('--geode-chart-3', 'currentColor')
  const chart4 = useGeodeToken('--geode-chart-4', 'currentColor')
  const chart5 = useGeodeToken('--geode-chart-5', 'currentColor')
  const chartColors = [chart1, chart2, chart3, chart4, chart5]

  const options = {
    textStyle: {
      fontFamily,
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'var(--geode-card)',
      borderColor: 'var(--geode-border)',
      borderWidth: 1,
      borderRadius: 12,
      padding: 10,
      textStyle: {
        color: 'var(--geode-text)',
      },
      extraCssText: 'min-width: 100px;',
    },
    legend: {
      show: false,
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['58%', '80%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: { show: false },
        labelLine: { show: false },
        data: formattedDataSet.map((item, index) => ({
          name: item.name,
          value: item.value,
          itemStyle: { color: chartColors[index % chartColors.length] },
        })),
      },
    ],
  }

  return (
    <div className="geode-stage">
      <ReactECharts option={options} className="geode-stage-chart" />
      <ul className="geode-legend">
        {formattedDataSet.map((item) => (
          <li key={item.name} className="geode-legend-item">
            <span className="geode-legend-swatch" data-swatch={item.swatch} />
            <span className="geode-legend-copy">
              <span>{item.name}</span>
              <span className="geode-legend-value">{item.value}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InterviewsChart
