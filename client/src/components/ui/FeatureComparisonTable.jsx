import React, { Fragment } from 'react'
import { Check, X } from 'lucide-react'
import IconWrapper from '../Cards/IconWrapper'

const ComparisonCellValue = ({ value }) => {
  if (value === true) {
    return (
      <IconWrapper
        icon={Check}
        inheritColor
        customIconSize={0}
        customStrokeWidth={11}
        size={0}
        className='text-font-main mx-auto'
      />
    )
  }

  if (value === false) {
    return (
      <IconWrapper
        icon={X}
        inheritColor
        customIconSize={0}
        customStrokeWidth={4}
        size={0}
        className='text-font-gray opacity-30 mx-auto'
      />
    )
  }

  return <span className='typography-body text-font-main text-center'>{value}</span>
}

function FeatureComparisonTable({ sections, highlightedColumn = 'pro' }) {
  let rowIndex = 0

  const getHeaderClass = (column) => {
    if (column === highlightedColumn) return 'typography-body text-teal-100 text-center'
    return 'typography-body text-font-main text-center'
  }

  return (
    <div className='flex rounded-xl overflow-hidden bg-background-100'>
      {/* Continuous left grey bar */}
      <div className='shrink-0 w-[13.5rem] bg-background-70'>
        <div className='px-4 py-3 min-h-[3rem] flex items-center'>
          <span className='typography-body text-font-teritiary'>Feature</span>
        </div>

        {sections.map((section) => (
          <Fragment key={section.category}>
            <div className='px-4 py-3 min-h-[2.75rem] flex items-center'>
              <span className='typography-small-p text-font-gray font-semibold tracking-wide uppercase'>
                {section.category}
              </span>
            </div>

            {section.rows.map((row) => (
              <div
                key={row.feature}
                className='px-4 py-4 min-h-[3.5rem] flex items-center'
              >
                <span className='typography-body text-font-main'>{row.feature}</span>
              </div>
            ))}
          </Fragment>
        ))}
      </div>

      {/* Plan columns */}
      <div className='flex-1 min-w-0'>
        <div className='grid grid-cols-3 bg-background-70 min-h-[3rem]'>
          <div className='px-6 py-3 flex items-center justify-center'>
            <span className={getHeaderClass('free')}>Free</span>
          </div>
          <div className='px-6 py-3 flex items-center justify-center'>
            <span className={getHeaderClass('pro')}>Pro</span>
          </div>
          <div className='px-6 py-3 flex items-center justify-center'>
            <span className={getHeaderClass('enterprise')}>Enterprise</span>
          </div>
        </div>

        {sections.map((section) => (
          <Fragment key={section.category}>
            <div className='grid grid-cols-3 bg-background-100 min-h-[2.75rem]' aria-hidden='true'>
              <div className='px-6 py-3' />
              <div className='px-6 py-3' />
              <div className='px-6 py-3' />
            </div>

            {section.rows.map((row) => {
              const isEvenRow = rowIndex % 2 === 0
              rowIndex += 1
              const rowBg = isEvenRow ? 'bg-background-100' : 'bg-background-80'

              return (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 min-h-[3.5rem] ${rowBg}`}
                >
                  <div className='px-6 py-4 flex items-center justify-center'>
                    <ComparisonCellValue value={row.free} />
                  </div>
                  <div className='px-6 py-4 flex items-center justify-center'>
                    <ComparisonCellValue value={row.pro} />
                  </div>
                  <div className='px-6 py-4 flex items-center justify-center'>
                    <ComparisonCellValue value={row.enterprise} />
                  </div>
                </div>
              )
            })}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default FeatureComparisonTable
