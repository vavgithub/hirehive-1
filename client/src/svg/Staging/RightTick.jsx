import React from 'react'
import IconWrapper from '../../components/Cards/IconWrapper'
import { Check } from 'lucide-react'

const RightTick = () => {
    return  <span className='text-green-100'><IconWrapper customStrokeWidth={4} customIconSize={4} icon={Check} inheritColor size={0} /></span>
}

export default RightTick