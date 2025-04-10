import React from 'react'
import IconWrapper from '../../components/Cards/IconWrapper'
import { CircleAlert } from 'lucide-react'

const WarningIcon = () => {
    return  <span className='text-yellow-100'><IconWrapper customStrokeWidth={4} customIconSize={4} icon={CircleAlert} inheritColor size={0} /></span>

}

export default WarningIcon