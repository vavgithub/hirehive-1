import { ChevronDown } from '@/components/geode/icons';
import React, { useEffect, useState } from 'react';
import StyledMenu from '../MUIUtilities/StyledMenu';
import StyledCard from '../Cards/StyledCard';

// StatCard component (unchanged)
const StatCard = ({ title, value, icon: Icon, statistics }) => {
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

  return (
    <StyledCard padding={3} extraStyles="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">{title}</p>
        {Icon ? <span className="text-muted-foreground"><Icon /></span> : null}
      </div>
      <h2 className="text-2xl font-medium">{value ?? 0}</h2>
      <p key={currentStatistics} onClick={currentStatistics ? handleDropDown : undefined} className={`flex min-h-4 items-center gap-1 text-sm text-muted-foreground ${currentStatistics ? 'cursor-pointer' : ''}`}>
        <span className={/\-/.test(currentStatistics?.split(' ')[0]) ? 'text-destructive' : 'text-foreground'}>{currentStatistics && (/\-/.test(currentStatistics?.split(' ')[0]) || '+')}{currentStatistics?.split(' ')[0]}</span> {currentStatistics?.split(' ').slice(1).join(' ')}
        {currentStatistics ? <ChevronDown size={16} strokeWidth={2} aria-hidden="true" /> : null}
      </p>
      <StyledMenu itemComponents={dropdownComponents} anchorEl={show} handleMenuClose={() => setShow(null)} />
    </StyledCard>
  )
};

// Updated StatsGrid component with horizontal mouse wheel scroll
const StatsGrid = ({ cardBg, stats }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard cardBg={cardBg} key={index} title={stat.title} value={stat.value} icon={stat.icon} statistics={stat.statistics} />
      ))}
    </div>
  );
};

export default StatsGrid;