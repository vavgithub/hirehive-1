import { ChevronDown } from 'lucide-react';
import React, { useRef, useEffect, useState } from 'react';
import StyledMenu from './StyledMenu';

// StatCard component (unchanged)
const StatCard = ({ title, value, icon: Icon ,statistics}) => {
    const [currentStatistics,setCurrentStatistics] = useState('');
    const [index,setIndex] = useState(0);
    const [show,setShow] = useState(false);   

    // useEffect(() => {
    //   let interval;
    //   if(statistics && statistics?.monthly){
    //     setCurrentStatistics(statistics.monthly);
    //     setIndex(1);
    //      interval = setInterval(() => {
    //        setIndex(prev=>{
             
    //          setCurrentStatistics(Object.entries(statistics)[prev][1])
            
    //         return  prev === 2 ? 0 : prev + 1
    //       })
    //     },5000) 
    //   }
    //   return () => clearInterval(interval)
    // },[statistics])

    // useEffect(() => {
    //   setShow(false); // Remove class to restart animation
    //   const timer = setTimeout(() => setShow(true), 10); // Reapply after a slight delay
    //   return () => clearTimeout(timer)
    // }, [currentStatistics]);

    useEffect(()=>{
      console.log(statistics)
      if(statistics?.monthly){
        setCurrentStatistics(statistics.monthly);
      }
    },[statistics])

    const handleDropDown = (e) => {
      console.log(e)
      setShow(e.currentTarget)
    }

    const handleSwitch = (type) => {
      setCurrentStatistics(statistics[type])
      setShow(null)
    }

    const dropdownComponents = [
      {
        onClick : ()=>handleSwitch("monthly"),
        content : () => {
          return (
            <p className='typography-large-p hover:bg-background-60 w-full h-full rounded-xl flex items-center px-2'>
              Monthly
            </p>
          )
        }
      },
      {
        onClick : ()=>handleSwitch("weekly"),
        content : () => {
          return (
            <p className='typography-large-p hover:bg-background-60 w-full h-full rounded-xl flex items-center px-2'>
            Weekly
          </p>)
        }
      },
      {
        onClick : ()=>handleSwitch("daily"),
        content : () => {
          return(
              <p className='typography-large-p hover:bg-background-60 w-full h-full rounded-xl flex items-center px-2'>
              Daily
            </p>
          )
        }
      }
    ] 

  return(
  <div className="flex flex-shrink-0 justify-between relative items-center bg-card-pattern w-[240px] rounded-md shadow h-[6.5rem] min-h-fit">
    <div className="ml-[15px] w-full ">
      <p className="typography-small-p text-font-gray w-max">{title}</p>
      <p className="typography-h2">{value ?? 0}</p>
      { <p key={currentStatistics} onClick={handleDropDown} className={`typography-small-p text-font-gray  flex items-center gap-1 cursor-pointer`}>
        <span className={/\-/.test(currentStatistics?.split(' ')[0]) ? 'text-red-40' : 'text-green-70'}>{currentStatistics && (/\-/.test(currentStatistics?.split(' ')[0]) || '+')}{currentStatistics?.split(' ')[0]}</span> {currentStatistics?.split(' ').slice(1).join(' ')}
        <span><ChevronDown size={14}/></span>
      </p>}
    </div>
    <div className='absolute -z-10 right-0'>
      <Icon />
    </div>
    <StyledMenu itemComponents={dropdownComponents} anchorEl={show} handleMenuClose={() => setShow(null)} />
  </div>
)};

// Updated StatsGrid component with horizontal mouse wheel scroll
const StatsGrid = ({ stats }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
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
  }, []);

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
        <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} statistics={stat.statistics} />
      ))}
    </div>
  );
};

export default StatsGrid;