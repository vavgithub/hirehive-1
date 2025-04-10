import React from 'react'
import FileMainIcon from '../../svg/FileMainIcon'
import { ensureAbsoluteUrl } from '../../utility/ensureAbsoluteUrl'

function PortfolioHeader({portfolio}) {
  return (
    <div className='flex gap-2 items-center justify-center'>
        {/* <div className='w-8 h-8 rounded-full bg-background-80 flex items-center justify-center'>
            <FileMainIcon />
        </div> */}
        <a href={ensureAbsoluteUrl(portfolio)} target="_blank" rel="noopener noreferrer" className='typography-body text-font-primary underline flex gap-2' >View Portfolio
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21M21 3V9M21 3L10 14" stroke="#045FFD" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </a>
    </div>
  )
}

export default PortfolioHeader
