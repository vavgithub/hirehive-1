import React, { useMemo, useState } from 'react'
import ReactECharts from "echarts-for-react";
import StyledCard from '../ui/StyledCard';

function ScreeningChart({scoreData}){
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

function ScoreChart({scoreData}) {
    const [hoveredSegment, setHoveredSegment] = useState(null);

    const hasScreening = useMemo(()=>scoreData?.find(stageScores=>(stageScores?.name === "Screening") && stageScores?.scoreObj),[scoreData]);

    const options = {
        tooltip: {
            trigger: "item",
            backgroundColor: "#232425", // Custom background color
            borderWidth: 0,
            borderRadius: 12,
            padding : [8 , 16, 8 , 16],
            textStyle: {
              color: "#ffffff", // Text color
              fontSize: 14,
              fontFamily: "Outfit",
              fontWeight : 300,
            },
            formatter: (params) => {
                return `
                  <div style="display: flex; align-items: center;">
                    <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${params.color}; margin-right: 8px;"></span>
                    <p style="margin: 0; color: #ffffff;">${params.name}: ${params.value} / ${params.data?.maxScore}</p>
                  </div>
                `;
            },
            
          },
        series: [
          {
            name: "Score",
            type: "pie",
            radius: ["55%", "70%"], // Creates the doughnut effect
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                fontSize: "18",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: scoreData,
          },
        ],
      };

          // Define event handlers
    const onEvents = {
        mouseover: (params) => {
            setHoveredSegment(params.name); // Store hovered segment
        },
        mouseout: (params) => {
            setHoveredSegment(null); // Clear when mouse leaves
        },
    };
    
      return (
        <>
            <ReactECharts option={options} onEvents={onEvents} style={{ height: 140, width: "100%" }} />
            {(hoveredSegment === "Screening" && hasScreening) &&
            <StyledCard padding={2} extraStyles='absolute left-0 -bottom-32 font-outfit w-[350px]'>
                <ScreeningChart scoreData={hasScreening?.scoreObj} />
            </StyledCard>}
        </>
      );
}

export default ScoreChart
