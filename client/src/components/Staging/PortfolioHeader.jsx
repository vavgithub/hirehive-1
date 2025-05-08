import React from 'react'
import { ensureAbsoluteUrl } from '../../utility/ensureAbsoluteUrl'
import IconWrapper from '../Cards/IconWrapper'
import { ExternalLink } from 'lucide-react'

function PortfolioHeader({portfolio}) {
  return (  
        
        <a href={ensureAbsoluteUrl(portfolio)} target="_blank" rel="noopener noreferrer" className='flex items-center justify-center typography-body text-font-primary underline  gap-2 pb-3' >View Portfolio
        <IconWrapper icon={ExternalLink} inheritColor size={0} customIconSize={4}  />
        </a>

  )
}

export default PortfolioHeader
