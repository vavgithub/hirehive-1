import React, { useMemo, useRef, useState } from 'react'
import ReactECharts from "echarts-for-react";
import StyledCard from '../Cards/StyledCard';
import { ScreeningChart } from './ScreeningChart';

function ScoreChart({scoreData}) {
    const [hoveredSegment, setHoveredSegment] = useState(null);

    const hasScreening = useMemo(()=>scoreData?.find(stageScores=>(stageScores?.name === "Screening") && stageScores?.scoreObj),[scoreData]);

    const options = useMemo(()=>{
      return {
        tooltip: {
            trigger: "item",
            backgroundColor: "#232425", // Custom background color
            borderWidth: 0,
            borderRadius: 12,
            padding : [8 , 16, 8 , 16],
            textStyle: {
              color: "#ffffff", // Text color
              fontSize: 14,
              fontFamily: "Gilroy, sans-serif", // Font for tooltip
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
      }
    },[scoreData]);

    // Define event handlers
    const eventHandlers = useRef({
      mouseover: (params) => setHoveredSegment(params.name),
      mouseout: () => setHoveredSegment(null),
    });
          
    
    return (
      <>
          <ReactECharts option={options} onEvents={eventHandlers.current} style={{ height: 140, width: "100%" }} />
          {(hoveredSegment === "Screening" && hasScreening) &&
          <StyledCard padding={2} extraStyles={`absolute left-0 -bottom-32 font-Gilroy w-full transition-opacity duration-200 ${hoveredSegment === "Screening" && hasScreening ? "opacity-100" : "opacity-0"}`}>
              <ScreeningChart scoreData={hasScreening?.scoreObj} />
          </StyledCard>}
      </>
    );
}

export default ScoreChart
