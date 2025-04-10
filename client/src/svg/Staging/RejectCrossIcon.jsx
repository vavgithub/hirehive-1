import React from 'react'
import IconWrapper from '../../components/Cards/IconWrapper'
import { X } from 'lucide-react'

function RejectCrossIcon() {
  return  <span className='text-red-100'><IconWrapper customStrokeWidth={4} customIconSize={4} icon={X} inheritColor size={0} /></span>
}

export default RejectCrossIcon
