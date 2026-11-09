import { ChevronDown } from '@/components/geode/icons';
import React, { useEffect, useState } from 'react';
import StyledMenu from '../MUIUtilities/StyledMenu';
import StyledCard from '../Cards/StyledCard';

function trendParts(text) {
  if (!text) return null
  const [head, ...rest] = text.split(' ')
  const amount = Number(String(head).replace('%', ''))
  if (!Number.isFinite(amount) || amount === 0) return null
  return { head, rest: rest.join(' '), negative: String(head).startsWith('-') }
}

const StatCard = ({ title, value, icon: Icon, statistics, onSelect, active }) => {
  const [currentStatistics, setCurrentStatistics] = useState('');
  const [show, setShow] = useState(false);


  useEffect(() => {
    if (statistics?.monthly) {
      setCurrentStatistics(statistics.monthly);
    }
  }, [statistics])

  const handleDropDown = (e) => {
    setShow(e.currentTarget)
  }

  const handleSwitch = (type) => {
    setCurrentStatistics(statistics[type])
    setShow(null)
  }

  const dropdownComponents = [
    {
      onClick: () => handleSwitch("monthly"),
      content: () => {
        return (
          <p className='typography-large-p  w-full h-full rounded-xl flex items-center px-2'>
            Last Month
          </p>
        )
      }
    },
    {
      onClick: () => handleSwitch("weekly"),
      content: () => {
        return (
          <p className='typography-large-p  w-full h-full rounded-xl flex items-center px-2'>
            Last Week
          </p>)
      }
    },
    {
      onClick: () => handleSwitch("daily"),
      content: () => {
        return (
          <p className='typography-large-p  w-full h-full rounded-xl flex items-center px-2'>
            Last Day
          </p>
        )
      }
    }
  ]

  const trend = trendParts(currentStatistics)
  const summary = (
    <>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">{title}</p>
        {Icon ? <span className="text-muted-foreground"><Icon /></span> : null}
      </div>
      <h2 className="text-2xl font-medium">{value ?? 0}</h2>
    </>
  )

  return (
    <StyledCard padding={3} extraStyles={`relative flex flex-col gap-2 text-left ${active ? 'outline outline-2 outline-accent-100' : ''}`}>
      {onSelect ? (
        <button
          type="button"
          onClick={onSelect}
          aria-pressed={Boolean(active)}
          aria-label={title}
          className="absolute inset-0 z-10 rounded-xl"
        />
      ) : null}
      <div className={onSelect ? 'pointer-events-none relative z-20' : undefined}>{summary}</div>
      {trend ? (
        <p key={currentStatistics} onClick={handleDropDown} className="relative z-20 flex min-h-4 items-center gap-1 text-sm text-muted-foreground">
          <span className={trend.negative ? 'text-destructive' : 'text-foreground'}>{trend.negative ? '' : '+'}{trend.head}</span> {trend.rest}
          <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
        </p>
      ) : null}
      <StyledMenu itemComponents={dropdownComponents} anchorEl={show} handleMenuClose={() => setShow(null)} />
    </StyledCard>
  )
};

// Updated StatsGrid component with horizontal mouse wheel scroll
const StatsGrid = ({ cardBg, stats }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard cardBg={cardBg} key={index} title={stat.title} value={stat.value} icon={stat.icon} statistics={stat.statistics} onSelect={stat.onSelect} active={stat.active} />
      ))}
    </div>
  );
};

export default StatsGrid;