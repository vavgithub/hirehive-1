import React, { useState } from 'react'
import StyledCard from '../ui/StyledCard'

export const MIN_SCORE = 0;
export const MAX_SCORE = 100;

function ScoreFilter({handleScoreChange}) {
    const [min,setMin] = useState(0);
    const [max,setMax] = useState(0);

    const handleMinChange = (e) => {
        setMin(prev=>(e.target.value?.toString()?.length < 3 ? e.target.value === "" ? e.target.value : parseInt(e.target.value) : e.target.value === MAX_SCORE?.toString() ? MAX_SCORE : prev));
        handleScoreChange({min : e.target.value?.toString()?.length < 3 ? e.target.value === "" ? e.target.value : parseInt(e.target.value) : e.target.value === MAX_SCORE?.toString() ? MAX_SCORE : min,max : max || MAX_SCORE})
    }

    const handleMaxChange = (e) => {
        setMax(prev=>(e.target.value?.toString()?.length < 3 ? e.target.value === "" ? e.target.value : parseInt(e.target.value) : e.target.value === MAX_SCORE?.toString() ? MAX_SCORE : prev));
        handleScoreChange({min : min || MIN_SCORE,max : e.target.value?.toString()?.length < 3 ? e.target.value === "" ? e.target.value : parseInt(e.target.value) : e.target.value === MAX_SCORE?.toString() ? MAX_SCORE : max})
    }

  return (
    <StyledCard padding={2} extraStyles={"font-outfit absolute left-[18.5rem] w-[250px] flex gap-4"}>
      <div className='flex flex-col gap-2'>
        <label htmlFor="min-score" className='typography-large-p'>Min Score</label>
        <div className='relative'>
        <input type="number" id='min-score' className='no-spinner' value={min} onChange={handleMinChange} style={{
            background : "rgba(35,36,37,1)"
        }} />
        <span className='font-light text-font-gray absolute right-2 top-[10px]'>PT</span>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="max-score" className='typography-large-p'>Max Score</label>
        <div className='relative'>
        <input type="number" id='max-score' value={max} onChange={handleMaxChange} className='no-spinner' style={{
            background : "rgba(35,36,37,1)"
        }} />
        <span className='font-light text-font-gray absolute right-2 top-[10px]'>PT</span>
        </div>
      </div>
    </StyledCard>
  )
}

export default ScoreFilter
