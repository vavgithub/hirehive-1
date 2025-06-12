import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useQuery } from "@tanstack/react-query";
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { formatDate } from '@fullcalendar/core';
import { fetchCalendarDetails } from '../../services/admin.candidate.service';
import './calendar.css';
import { Button } from '../Buttons/Button';
import IconWrapper from '../Cards/IconWrapper';
import { ChevronLeft, ChevronRight, SquareArrowOutUpRight } from 'lucide-react';
import { DateTime } from 'luxon';
import LoaderModal from '../Loaders/LoaderModal';
import StyledMenu from '../MUIUtilities/StyledMenu';

function CustomCalendar({ calendarType }) {
  const currentDate = useMemo(() => DateTime.local(), []);
  const [startDate, setStartDate] = useState(currentDate.startOf('day').toUTC());
  const [endDate, setEndDate] = useState(currentDate.endOf('week').toUTC());
  const [anchor, setAnchor] = useState(null);
  const [currentItemComponents, setCurrentItemComponents] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ['interview-details', startDate, endDate, calendarType],
    queryFn: () => fetchCalendarDetails(startDate, endDate, calendarType),
    enabled: !!startDate && !!endDate && !!calendarType
  });

  const events = useMemo(() => data?.calendarEvents ?? [], [data]);
  const [eventMap, setEventMap] = useState({});
  const calendarRef = useRef();

  useEffect(() => {
    if (calendarType === 'WEEK') {
      setStartDate(currentDate.startOf('week').toUTC());
      setEndDate(currentDate.endOf('week').toUTC());
    } else if (calendarType === 'MONTH') {
      setStartDate(currentDate.startOf('month').toUTC());
      setEndDate(currentDate.endOf('month').toUTC());
    } else {
      setStartDate(currentDate.startOf('day').toUTC());
      setEndDate(currentDate.endOf('week').toUTC());
    }
  }, [calendarType, currentDate]);

  useEffect(() => {
    const map = {};
    events.forEach((event) => {
      const dateKey = new Date(event.start).toDateString();
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(event);
    });

    Object.keys(map).forEach((key) => {
      map[key].sort((a, b) => new Date(a.start) - new Date(b.start));
    });

    setEventMap(map);
  }, [events]);

  const handlePrev = useCallback(() => {
    const calendarApi = calendarRef.current?.getApi();
    const newStartDate = DateTime.fromJSDate(startDate.toJSDate()).minus({ weeks: 1 }).startOf('week').toUTC();
    const newEndDate = DateTime.fromJSDate(startDate.toJSDate()).minus({ weeks: 1 }).endOf('week').toUTC();

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    calendarApi?.prev();
  }, [startDate]);

  const handleToday = () => {
    const calendarApi = calendarRef.current?.getApi();
    const today = DateTime.local();
    const newStartDate = today.startOf('day').toUTC();
    const newEndDate = today.endOf('week').toUTC();

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    calendarApi?.today();
  };

  const handleNext = useCallback(() => {
    const calendarApi = calendarRef.current?.getApi();
    const newStartDate = DateTime.fromJSDate(startDate.toJSDate()).plus({ weeks: 1 }).startOf('week').toUTC();
    const newEndDate = DateTime.fromJSDate(startDate.toJSDate()).plus({ weeks: 1 }).endOf('week').toUTC();

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    calendarApi?.next();
  }, [startDate]);

  const renderEventContent = (eventInfo) => {
    const dateKey = eventInfo.event.start?.toDateString?.();
    const start = eventInfo.event.start;
    const end = eventInfo.event.end;
    const now = new Date();

    if (!dateKey || !eventMap[dateKey]) {
      return null;
    }

    const eventList = eventMap[dateKey];
    if (!eventList || eventList.length === 0) {
      return null;
    }

    if (calendarType === 'MONTH') {
      // Limit to 2 events in Month view
      const eventIndex = eventList.findIndex(
        (e) => e.title + new Date(e.start).toISOString() === eventInfo.event.title + eventInfo.event.start.toISOString()
      );

      if (eventIndex > 2) {
  return null;
}

if (eventIndex === 2 && eventList.length > 3) {
  const moreCount = eventList.length - 2;
  return (
    <div
      className="bg-background-50 max-w-full text-ellipsis overflow-hidden p-2 rounded-xl px-4 cursor-pointer hover:bg-background-40"
      onClick={(e) => {
        setAnchor(e.currentTarget);
        const additionalEvents = eventList.slice(2).map((event, idx) => ({
          onClick: null,
          content: () => (
            <div key={idx} className="max-w-full text-ellipsis overflow-hidden p-2 rounded-xl px-4">
              {new Date(event.start) <= now && (!event.end || new Date(event.end) > now) && (
                <span className="w-2 h-2 bg-accent-100 rounded-full mr-2 inline-block"></span>
              )}
              {event.title}
            </div>
          )
        }));
        setCurrentItemComponents(additionalEvents);
      }}
    >
      {moreCount} more
    </div>
  );
}


      const isPast = start < now;
      const isHappening = start <= now && (!end || end > now);

      return (
        <div className={(isPast ? 'bg-background-70' : 'bg-background-50') + ' max-w-full text-ellipsis overflow-hidden p-2 rounded-xl px-4'}>
          {isHappening && <span className='w-2 h-2 bg-accent-100 rounded-full mr-2 inline-block'></span>}
          {eventInfo.event.title}
        </div>
      );
    } else if (calendarType === 'WEEK') {
      const isPast = start < now;
      const isHappening = start <= now && (!end || end > now);

      return (
        <div className={(isPast ? 'bg-background-70' : 'bg-background-50') + ' max-w-full text-ellipsis overflow-hidden p-2 rounded-xl px-4'}>
          {isHappening && <span className='w-2 h-2 bg-accent-100 rounded-full mr-2 inline-block'></span>}
          {eventInfo.event.title}
        </div>
      );
    } else {
      const currentEventKey = eventInfo.event.title + eventInfo.event.start.toISOString();
      const lastEvent = eventList[eventList.length - 1];
      const lastEventKey = lastEvent?.title + new Date(lastEvent.start).toISOString();
      const isLast = currentEventKey === lastEventKey;
      const isPast = start < now;
      const isHappening = start <= now && (!end || end > now);

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

      return (
        <div className={`px-8 typography-body bg-background-80 ${isLast ? 'rounded-b-xl mb-6 pb-8' : ''}`}>
          <div className={(isPast ? 'opacity-60' : '') + ' bg-background-70 flex justify-between rounded-xl p-4'}>
            <div className={(isPast ? 'text-font-gray' : '') + ' flex items-center gap-4'}>
              <p>{timeText}</p>
              {eventInfo.event.title}
            </div>
            {!isPast && (eventInfo.event.extendedProps?.joiningLink
              ? <Button variant='secondary' onClick={() => window.open(eventInfo.event.extendedProps.joiningLink)}>Join Now</Button>
              : <div className='cursor-pointer' onClick={() => window.open(eventInfo.event.extendedProps.htmlLink)}>
                  <IconWrapper hasBg='bg-background-60' customBgHover={'hover:bg-background-50'} icon={SquareArrowOutUpRight} />
                </div>)
            }
          </div>
          {!isLast && <div className='w-full h-4 bg-background-80'></div>}
        </div>
      );
    }
  };

  return (
    <div>
      {isLoading && <LoaderModal />}
      <div className='flex mb-4 gap-4'>
        <button onClick={handlePrev} className='bg-background-80 hover:bg-background-60 rounded-xl h-11 aspect-square flex justify-center items-center'>
          <IconWrapper icon={ChevronLeft} size={0} customIconSize={5} />
        </button>
        <button onClick={handleToday} className='bg-background-80 hover:bg-background-60 rounded-xl h-11 aspect-square flex justify-center items-center px-12'>
          {calendarType === 'LIST' ? 'Today' : currentDate.monthShort}
        </button>
        <button onClick={handleNext} className='bg-background-80 hover:bg-background-60 rounded-xl h-11 aspect-square flex justify-center items-center'>
          <IconWrapper icon={ChevronRight} size={0} customIconSize={5} />
        </button>
      </div>
      <FullCalendar
        key={calendarType}
        ref={calendarRef}
        plugins={[listPlugin, dayGridPlugin, timeGridPlugin]}
        initialView={calendarType === 'MONTH' ? 'dayGridMonth' : calendarType === 'WEEK' ? 'timeGridWeek' : 'listWeek'}
        headerToolbar={false}
        events={events}
        eventContent={renderEventContent}
        height="auto"
        dayHeaderContent={(arg) => {
          if (calendarType === 'LIST') {
            if (arg.isToday) {
              return (
                <div className="fc-list-day-text-today mb-4">
                  Today ({formatDate(arg.date, { weekday: 'long', day: 'numeric', month: 'short' })})
                </div>
              );
            } else {
              return (
                <div className="fc-list-day-text mb-4">
                  {formatDate(arg.date, { weekday: 'long', day: 'numeric', month: 'short' })}
                </div>
              );
            }
          } else if (calendarType === 'MONTH') {
            return (
              <div className="fc-list-day-text my-2">
                {arg.text}
              </div>
            );
          } else if (calendarType === 'WEEK') {
            return (
              <div className="fc-list-day-text my-2">
                {formatDate(arg.date, { weekday: 'long', day: 'numeric', month: 'short' })}
              </div>
            );
          }
        }}
        listDayFormat={calendarType === 'LIST' ? false : true}
      />
      <StyledMenu anchorEl={anchor} handleMenuClose={() => setAnchor(null)} itemComponents={currentItemComponents} />
    </div>
  );
}

export default CustomCalendar;