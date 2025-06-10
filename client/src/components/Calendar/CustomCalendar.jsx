import React, { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid'; // Import dayGridPlugin for week view
import timeGridPlugin from '@fullcalendar/timegrid'; // Import timeGridPlugin for week view
import { formatDate } from '@fullcalendar/core';
import { fetchCalendarDetails } from '../../services/admin.candidate.service';
import './calendar.css';
import { Button } from '../Buttons/Button';
import { useRef } from 'react';
import IconWrapper from '../Cards/IconWrapper';
import { ChevronLeft, ChevronRight, SquareArrowOutUpRight } from 'lucide-react';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import LoaderModal from '../Loaders/LoaderModal';
import { useCallback } from 'react';
  
function CustomCalendar({calendarType}) {
    const currentDate = useMemo(()=> DateTime.local() ,[]);
    const [startDate,setStartDate] = useState(currentDate.startOf('day').toUTC())
    const [endDate,setEndDate] = useState(currentDate.endOf('week').toUTC())

    const { data, isLoading } = useQuery({
        queryKey: ['interview-details',startDate,endDate,calendarType],
        queryFn: () => fetchCalendarDetails(startDate,endDate,calendarType),
        enabled : !!startDate && !!endDate && !!calendarType
    });

  const events = useMemo(()=> data?.calendarEvents ?? [], [data])

  const [eventMap, setEventMap] = useState({});
  const calendarRef = useRef();
    
  useEffect(() => {
    if(calendarType === 'WEEK'){
        setStartDate(currentDate.startOf('week').toUTC())
        setEndDate(currentDate.endOf('week').toUTC())
    }else if(calendarType === 'MONTH'){
        setStartDate(currentDate.startOf('month').toUTC())
        setEndDate(currentDate.endOf('month').toUTC())
    }else{
        setStartDate(currentDate.startOf('day').toUTC())
        setEndDate(currentDate.endOf('week').toUTC())
    }
  },[calendarType,currentDate])

  useEffect(() => {
    const map = {};

    events.forEach((event) => {
      const dateKey = new Date(event.start).toDateString();
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(event);
    });

    // Optional: sort by time to ensure last event is correctly positioned
    Object.keys(map).forEach((key) => {
      map[key].sort((a, b) => new Date(a.start) - new Date(b.start));
    });

    setEventMap(map);
  }, [events]);


  const handlePrev = useCallback(() => {
    const calendarApi = calendarRef.current?.getApi();
    // Take the current startDate, subtract 1 week, and get the start/end of that new week
    const newStartDate = DateTime.fromJSDate(startDate.toJSDate()).minus({ weeks: 1 }).startOf('week').toUTC();
    const newEndDate = DateTime.fromJSDate(startDate.toJSDate()).minus({ weeks: 1 }).endOf('week').toUTC();

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    calendarApi?.prev()
  },[startDate])

  const handleToday = () => {
    const calendarApi = calendarRef.current?.getApi();
    const today = DateTime.local();
    const newStartDate = today.startOf('day').toUTC();
    const newEndDate = today.endOf('week').toUTC();

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    calendarApi?.today()
  }

  const handleNext = useCallback(() => {
    const calendarApi = calendarRef.current?.getApi();
    const newStartDate = DateTime.fromJSDate(startDate.toJSDate()).plus({ weeks: 1 }).startOf('week').toUTC();
    const newEndDate = DateTime.fromJSDate(startDate.toJSDate()).plus({ weeks: 1 }).endOf('week').toUTC();

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    calendarApi?.next()
  },[startDate])

  //Event Component
  const renderEventContent = (eventInfo) => {
  const dateKey = eventInfo.event.start?.toDateString?.();
  const start = eventInfo.event.start;
  const end = eventInfo.event.end;
  const now = new Date();

  if (!dateKey || !eventMap[dateKey]) {
    return null; // or show a fallback
  }

  const currentEventKey = eventInfo.event.title + eventInfo.event.start.toISOString();
  const eventList = eventMap[dateKey];

  if (!eventList || eventList.length === 0) {
    return null;
  }

  const lastEvent = eventList[eventList.length - 1];
  const lastEventKey = lastEvent?.title + new Date(lastEvent.start).toISOString();

  const isLast = currentEventKey === lastEventKey;
  const isPast = start < now;
  const isHappening =  (start > now && end < now);

  const formatTime = (date, omitPeriod = false) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formatted = `${(hours % 12) || 12}:${minutes.toString().padStart(2, '0')}`;
    if (omitPeriod) return formatted;
    return `${formatted}${hours >= 12 ? 'pm' : 'am'}`;
  };

  const timeText = end
    ? `${formatTime(start, true)} – ${formatTime(end)}`
    : formatTime(start);
  if(calendarType === 'MONTH'){
    return (<div className={(isPast ? 'opacity-70 bg-background-70 ' : 'bg-background-50') +' max-w-full text-ellipsis overflow-hidden p-2  rounded-xl px-4'}>
        {isHappening && <span className='w-2 h-2 bg-accent-100 rounded-full mr-2 inline-block'></span>}{eventInfo.event.title}
        </div>)
  }else if(calendarType === 'WEEK'){
    return (<div className={(isPast ? 'opacity-60 bg-background-70 ' : 'bg-background-50') +' max-w-full text-ellipsis overflow-hidden p-2  rounded-xl px-4'}>
        {isHappening && <span className='w-2 h-2 bg-accent-100 rounded-full mr-2 inline-block'></span>}{eventInfo.event.title}
        </div>)
  }else{
  return (
        <div
        className={`px-8 typography-body bg-background-80  ${
            isLast ? 'rounded-b-xl mb-6 pb-8' : ''
        }`}
        >
        <div className={(isPast ? 'opacity-60' : '') +' bg-background-70 flex justify-between rounded-xl p-4 ' }>
            <div className={(isPast ? 'text-font-gray' : '') +"  flex  items-center gap-4 "}>
            <p>{timeText}</p>
            {eventInfo.event.title}
            </div>
        {!isPast && (eventInfo.event.extendedProps?.joiningLink 
            ? <Button variant='secondary' onClick={()=> window.open(eventInfo.event.extendedProps.joiningLink)}>Join Now</Button> 
            : <div className='cursor-pointer' onClick={() => window.open(eventInfo.event.extendedProps.htmlLink)}>
                <IconWrapper hasBg='bg-background-60' customBgHover={'hover:bg-background-50'} icon={SquareArrowOutUpRight} />
            </div>)
        }
        </div>
            {
                !isLast && <div className='w-full h-4 bg-background-80'></div>
            }
        </div>
        );
    }
    };


  return (
    <div>
        {isLoading && <LoaderModal />}
        <div className='flex mb-4 gap-4'>
            <button onClick={handlePrev} className='bg-background-80 hover:bg-background-60 rounded-xl h-11 aspect-square flex justify-center items-center'><IconWrapper icon={ChevronLeft} size={0} customIconSize={5} /></button>
            <button onClick={handleToday} className='bg-background-80 hover:bg-background-60 rounded-xl h-11 aspect-square flex justify-center items-center px-12'>{calendarType === 'LIST' ? 'Today' : currentDate.monthShort}</button>
            <button onClick={handleNext} className='bg-background-80 hover:bg-background-60 rounded-xl h-11 aspect-square flex justify-center items-center'><IconWrapper icon={ChevronRight} size={0} customIconSize={5} /></button>
        </div>
      <FullCalendar
        key={calendarType}
        ref={calendarRef}
        plugins={[listPlugin,dayGridPlugin,timeGridPlugin]}
        initialView={calendarType === 'MONTH'  ? "dayGridMonth" : calendarType === 'WEEK' ? "timeGridWeek" :"listWeek"}
        headerToolbar={false}
        events={events}
        eventContent={renderEventContent}
        height="auto"
        dayHeaderContent={(arg) => {
            console.log('HEAD' , arg)
            if(calendarType === 'LIST'){
                if (arg.isToday) {
                  return (
                    <div className="fc-list-day-text-today mb-4">
                      Today ( {formatDate(arg.date, { weekday: 'long', day: 'numeric', month: 'short' })} )
                    </div>
                  );
                } else {
                  // Default formatting for other days in list week view
                  return (
                    <div className="fc-list-day-text mb-4">
                      {formatDate(arg.date, { weekday: 'long', day: 'numeric', month: 'short' })}
                    </div>
                  );
                }
            }else if(calendarType === 'MONTH'){
                return (<div className="fc-list-day-text my-2 ">
                      {arg.text}
                </div>)
            }else if(calendarType === 'WEEK'){
                // Default formatting for other days in list week view
                  return (
                    <div className="fc-list-day-text my-2">
                      {formatDate(arg.date, { weekday: 'long', day: 'numeric', month: 'short' })}
                    </div>
                  );
            }
        }}
        listDayFormat={calendarType === 'LIST' ? false : true}
      />
    </div>
  );
}

export default CustomCalendar;
