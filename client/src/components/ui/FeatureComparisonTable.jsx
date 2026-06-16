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

  const gridCols = 'grid-cols-[minmax(17rem,21rem)_1fr_1fr_1fr]'
  const planHeaderCell = 'px-8 md:px-10 py-3 flex items-center justify-center'
  const planDataCell = 'px-8 md:px-10 py-4 flex items-center justify-center'

  const getHeaderClass = (column) => {
    if (column === highlightedColumn) return 'typography-body text-teal-100 text-center'
    return 'typography-body text-font-main text-center'
  }

  return (
    <div className='rounded-xl overflow-hidden bg-background-100'>
      <div className={`grid ${gridCols} bg-background-70 min-h-[3rem]`}>
        <div className='px-5 py-3 flex items-center'>
          <span className='typography-body text-font-teritiary'>Feature</span>
        </div>
        <div className={planHeaderCell}>
          <span className={getHeaderClass('free')}>Free</span>
        </div>
        <div className={planHeaderCell}>
          <span className={getHeaderClass('pro')}>Pro</span>
        </div>
        <div className={planHeaderCell}>
          <span className={getHeaderClass('enterprise')}>Enterprise</span>
        </div>
      </div>

      {sections.map((section) => (
        <Fragment key={section.category}>
          <div className={`grid ${gridCols} bg-background-90 min-h-[2.75rem]`}>
            <div className='px-5 py-3 flex items-center col-span-4'>
              <span className='typography-small-p text-font-gray font-semibold tracking-wide uppercase'>
                {section.category}
              </span>
            </div>
          </div>

          {section.rows.map((row) => {
            const isEvenRow = rowIndex % 2 === 0
            rowIndex += 1
            const rowBg = isEvenRow ? 'bg-background-100' : 'bg-background-80'

            return (
              <div
                key={row.feature}
                className={`grid ${gridCols} min-h-[3.5rem] ${rowBg}`}
              >
                <div className='px-5 py-4 flex items-center bg-background-70'>
                  <span className='typography-body text-font-main'>{row.feature}</span>
                </div>
                <div className={planDataCell}>
                  <ComparisonCellValue value={row.free} />
                </div>
                <div className={planDataCell}>
                  <ComparisonCellValue value={row.pro} />
                </div>
                <div className={planDataCell}>
                  <ComparisonCellValue value={row.enterprise} />
                </div>
              </div>
            )
          })}
        </Fragment>
      ))}
    </div>
  )
}

export default FeatureComparisonTable
