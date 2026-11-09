import { ChevronDown } from 'lucide-react';
import React, { useRef, useEffect, useState } from 'react';
import StyledMenu from '../MUIUtilities/StyledMenu';
import StyledCard from '../Cards/StyledCard';

// StatCard component (unchanged)
const StatCard = ({ cardBg = 'primary', title, value, icon: Icon, statistics, equalWidth = false, valueClassName = '' }) => {
  const [currentStatistics, setCurrentStatistics] = useState('');
  const [show, setShow] = useState(false);

  const hasDropdown = statistics && (statistics.weekly !== undefined || statistics.daily !== undefined);

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

  const cardSizeClass = equalWidth
    ? 'min-w-0 w-full h-full'
    : 'min-w-[15rem] max-w-[15rem]'

  return (
    <StyledCard backgroundColor={cardBg === 'secondary' ? 'bg-background-80' : 'bg-background-100'} padding={2} extraStyles={`flex overflow-hidden justify-between relative items-center ${cardSizeClass}`}>
      <div className=" w-full ">
        <p className="typography-small-p text-font-teritiary w-max mb-2">{title}</p>
        <h2 className={`pb-2 ${valueClassName}`}>{value ?? 0}</h2>
        {(currentStatistics || equalWidth) && (
          <p
            key={currentStatistics || 'empty'}
            onClick={hasDropdown ? handleDropDown : undefined}
            className={`typography-small-p min-h-[18px] relative z-[1] text-font-teritiary flex items-center gap-1 ${hasDropdown ? 'cursor-pointer' : ''}`}
          >
            {hasDropdown ? (
              <>
                <span className={/\-/.test(currentStatistics?.split(' ')[0]) ? 'text-red-40' : 'text-green-70'}>
                  {(/\-/.test(currentStatistics?.split(' ')[0]) || '+')}{currentStatistics?.split(' ')[0]}
                </span>{' '}
                {currentStatistics?.split(' ').slice(1).join(' ')}
                <span><ChevronDown size={14} /></span>
              </>
            ) : (
              <span>{currentStatistics || '\u00A0'}</span>
            )}
          </p>
        )}
      </div>
      <div  className='absolute z-0 -right-5 -bottom-4'>
        <Icon />
      </div>
      {hasDropdown && (
        <StyledMenu itemComponents={dropdownComponents} anchorEl={show} handleMenuClose={() => setShow(null)} />
      )}
    </StyledCard>
  )
};

// Updated StatsGrid component with horizontal mouse wheel scroll
const StatsGrid = ({ cardBg , stats, equalWidth = false }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (equalWidth) return

    const handleWheel = (e) => {
      if (scrollContainerRef.current) {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [equalWidth]);

  if (equalWidth) {
    return (
      <div
        className='grid gap-4 w-full'
        style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
      >
        {stats.map((stat, index) => (
          <StatCard
            cardBg={cardBg}
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            statistics={stat.statistics}
            valueClassName={stat.valueClassName}
            equalWidth
          />
        ))}
      </div>
    )
  }

  return (
    <div
      ref={scrollContainerRef}
      className="flex gap-4 overflow-x-auto scrollbar-hide"
      style={{
        msOverflowStyle: 'none',  /* IE and Edge */
        scrollbarWidth: 'none',   /* Firefox */
      }}
    >
      {stats.map((stat, index) => (
        <StatCard cardBg={cardBg} key={index} title={stat.title} value={stat.value} icon={stat.icon} statistics={stat.statistics} valueClassName={stat.valueClassName} />
      ))}
    </div>
  );
};

export default StatsGrid;