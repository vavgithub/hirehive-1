
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { formatDate } from '@fullcalendar/core';
import './calendar.css';
import { Button } from '../Buttons/Button';
import IconWrapper from '../Cards/IconWrapper';
import { ChevronLeft, ChevronRight, SquareArrowOutUpRight } from 'lucide-react';
import { DateTime } from 'luxon';
import LoaderModal from '../Loaders/LoaderModal';
import StyledMenu from '../MUIUtilities/StyledMenu';
import Tabs from '../ui/Tabs';
import Modal from '../Modals/Modal';
import { showErrorToast } from '../ui/Toast';
import { fetchCalendarDetails } from '../../services/admin.service';

function CustomCalendar() {
  const currentDate = useMemo(() => DateTime.local(), []);
  const [eventsDate,setEventsDate] = useState({
    startDate : currentDate.startOf('day').toUTC(),
    endDate : currentDate.endOf('week').toUTC(),
    calendarType : 'LIST'
  })
  const [anchor, setAnchor] = useState(null);
  const [currentItemComponents, setCurrentItemComponents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading , error } = useQuery({
    queryKey: ['interview-details', eventsDate?.startDate, eventsDate?.endDate, eventsDate?.calendarType],
    queryFn: () => fetchCalendarDetails(eventsDate?.startDate, eventsDate?.endDate, eventsDate?.calendarType),
    enabled: !!eventsDate?.startDate && !!eventsDate?.endDate && !!eventsDate?.calendarType,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401) return false; // don't retry on unauthorized
      return failureCount < 2; // otherwise allow 2 retries (or customize as needed)
    }
  });

  useEffect(()=> {
    if(error?.response?.status === 401){
      showErrorToast("Error",error.response.data.message || 'Please authorize google again to continue.')
      queryClient.invalidateQueries(['auth'])
    }
  },[error])

  const events = useMemo(() => data?.calendarEvents ?? [], [data]);
  const [eventMap, setEventMap] = useState({});
  const lastEventOfDay = useMemo(() => {
    const allEvents = Object.values(eventMap).flat();

    if (allEvents.length === 0) return null;

    const sortedEvents = allEvents.sort((a, b) => new Date(a.start) - new Date(b.start));
    
    return sortedEvents[sortedEvents.length - 1]; // last event chronologically
  }, [eventMap]);


  const calendarRef = useRef();


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
    const newStartDate = DateTime.fromJSDate(eventsDate?.startDate.toJSDate()).minus(eventsDate?.calendarType === 'MONTH'  ? { months: 1 } :{ weeks: 1 }).startOf(eventsDate?.calendarType === 'MONTH' ? 'month' :'week').toUTC();
    const newEndDate = DateTime.fromJSDate(eventsDate?.startDate.toJSDate()).minus(eventsDate?.calendarType === 'MONTH'  ? { months: 1 } :{ weeks: 1 }).endOf(eventsDate?.calendarType === 'MONTH' ? 'month' :'week').toUTC();

    setEventsDate((prev) => ({
      ...prev,
      startDate : newStartDate,
      endDate : newEndDate
    }))
    calendarApi?.prev();
  }, [eventsDate?.startDate]);

  const handleToday = () => {
    const calendarApi = calendarRef.current?.getApi();
    const today = DateTime.local();
    const newStartDate = today.startOf(eventsDate?.calendarType === 'MONTH' ? 'month' : eventsDate?.calendarType === 'WEEK' ? 'week' : 'day').toUTC();
    const newEndDate = today.endOf(eventsDate?.calendarType === 'MONTH' ? 'month' :'week' ).toUTC();

    setEventsDate((prev) => ({
      ...prev,
      startDate : newStartDate,
      endDate : newEndDate
    }))
    calendarApi?.today();
  };

  const handleNext = useCallback(() => {
    const calendarApi = calendarRef.current?.getApi();
    const newStartDate = DateTime.fromJSDate(eventsDate?.startDate.toJSDate()).plus(eventsDate?.calendarType === 'MONTH'  ? { months: 1 } :{ weeks: 1 }).startOf(eventsDate?.calendarType === 'MONTH' ? 'month' :'week' ).toUTC();
    const newEndDate = DateTime.fromJSDate(eventsDate?.startDate.toJSDate()).plus(eventsDate?.calendarType === 'MONTH'  ? { months: 1 } :{ weeks: 1 }).endOf(eventsDate?.calendarType === 'MONTH' ? 'month' :'week' ).toUTC();

    setEventsDate((prev) => ({
      ...prev,
      startDate : newStartDate,
      endDate : newEndDate
    }))
    calendarApi?.next();
  }, [eventsDate?.startDate]);

  const handleModalClose = () => {
    setSelectedEvent(null);
  };

  const formatTime = (date, omitPeriod = false) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formatted = `${(hours % 12) || 12}:${minutes.toString().padStart(2, '0')}`;
    if (omitPeriod) return formatted;
    return `${formatted}${hours >= 12 ? 'pm' : 'am'}`;
  };

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

    const formatTime = (date, omitPeriod = false) => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const formatted = `${(hours % 12) || 12}:${minutes.toString().padStart(2, '0')}`;
      if (omitPeriod) return formatted;
      return `${formatted}${hours >= 12 ? 'pm' : 'am'}`;
    };

    if (eventsDate?.calendarType === 'MONTH') {
      // Limit to 2 events in Month view
      const eventIndex = eventList.findIndex(
        (e) => e.title + new Date(e.start).toISOString() === eventInfo.event.title + eventInfo.event.start.toISOString()
      );

      if (eventIndex > 2) {
        return null;
      }

      if (eventIndex === 2 && eventList.length > 3) {
        const moreCount = eventList.length - 2;
        const isPast = start < now; 
        return (
          <div
            className={" max-w-full text-ellipsis overflow-hidden p-2 rounded-xl px-4  " + (isPast ? 'bg-background-70 ' : 'bg-background-50 hover:bg-background-40 cursor-pointer')}
            onClick={ isPast ? null : (e) => {
              e.stopPropagation();       // ✅ Prevents bubbling to FullCalendar
              e.preventDefault();        // ✅ Prevents default behavior (important)
              setAnchor(e.currentTarget);

              const additionalEvents = eventList.slice(2).map((event, idx) => ({
                onClick: () => {
                  // Open event modal or take any action
                  setSelectedEvent({
                    title: event.title,
                    ...(event || {}),
                    start: new Date(event.start),
                    end: new Date(event.end),
                  });
                  setAnchor(null); // close the popup
                },
                content: () => (
                  <div key={idx} className="max-w-full text-ellipsis overflow-hidden p-2 rounded-xl px-4">
                    {new Date(event.start) <= now && (!event.end || new Date(event.end) > now) && (
                      <span className="w-2 h-2 bg-accent-100 rounded-full mr-2 inline-block"></span>
                    )}
                    {event.title}
                  </div>
                ),
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
        <div 
        onClick={isPast ?null : () => {
          setSelectedEvent({
            title: eventInfo.event.title,
            ...(eventInfo.event.extendedProps || {}),
            start: eventInfo.event.start,
            end: eventInfo.event.end
          });
        }}
        className={(isPast ? 'bg-background-70 text-font-gray ' : 'bg-background-50 cursor-pointer ') + ' max-w-full text-ellipsis overflow-hidden p-2 rounded-xl px-4'}>
          {isHappening && <span className='w-2 h-2 bg-accent-100 rounded-full mr-2 inline-block'></span>}
          {eventInfo.event.title}
        </div>
      );
    } else if (eventsDate?.calendarType === 'WEEK') {
      const isPast = start < now;
      const isHappening = start <= now && (!end || end > now);
      const timeText = end
        ? `${formatTime(start, true)} - ${formatTime(end)}`
        : formatTime(start);

      return (
        <div 
        onClick={isPast ?null : () => {
        setSelectedEvent({
          title : eventInfo.event.title,
          ...(eventInfo.event.extendedProps || {}),
          start: eventInfo.event.start,
          end: eventInfo.event.end
        });
        }} 
        className={(isPast ? ' bg-background-70' : 'bg-background-60 cursor-pointer ') + '  p-2 h-full  max-w-full whitespace-nowrap text-ellipsis overflow-hidden '}>
          <div className={"flex items-center gap-2 " + (isPast ? 'opacity-35' : '')}>
            {isHappening && <span className="w-2 h-2 bg-accent-100 rounded-full inline-block"></span>}
            <span>{eventInfo.event.title}</span>
          </div>
          <p className="text-font-gray text-sm">{timeText}</p>
        </div>
      );
    } else {
      const currentEventKey = eventInfo.event.id + eventInfo.event.title + eventInfo.event.start.toISOString();
      const lastEvent = eventList[eventList.length - 1];
      const lastEventKey = lastEvent?.id + lastEvent?.title + new Date(lastEvent.start).toISOString();
      const isLast = currentEventKey === lastEventKey;
      
      const isPast = start < now;
      const isHappening = start <= now && (!end || end > now);

      const isFinalEventOfWeek = (lastEventOfDay?.id + lastEventOfDay?.title + new Date(lastEventOfDay.start).toISOString()) === currentEventKey;

      const timeText = end
        ? `${formatTime(start, true)} – ${formatTime(end)}`
        : formatTime(start);

      return (
        <div className={`px-8 typography-body bg-background-80 ${isLast ?  `rounded-b-xl ${isFinalEventOfWeek ? '' : 'mb-6'}  pb-8` : ''}`}>
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

  const tabs = [
    {
      name: 'list',
      label: 'List',
    },
    {
      name: 'week',
      label: 'Week',
    },
    {
      name: 'month',
      label: 'Month',
    },
  ];

  const handleTabClick = (tab) => {
        if (tab.toUpperCase() === 'WEEK') {
      setEventsDate({
        calendarType : tab.toUpperCase(),
        startDate : currentDate.startOf('week').toUTC(),
        endDate : currentDate.endOf('week').toUTC()
      })
    } else if (tab.toUpperCase() === 'MONTH') {
      setEventsDate({
        calendarType : tab.toUpperCase(),
        startDate : currentDate.startOf('month').toUTC(),
        endDate : currentDate.endOf('month').toUTC()
      })
    } else {
      setEventsDate({
        calendarType : tab.toUpperCase(),
        startDate : currentDate.startOf('day').toUTC(),
        endDate : currentDate.endOf('week').toUTC()
      })
    }
  };

  const onModalConfirm = () => {
    let redirectLink = ''
    if(selectedEvent?.joiningLink){
        redirectLink = selectedEvent.joiningLink
    }else if(selectedEvent?.htmlLink){
        redirectLink = selectedEvent.htmlLink
    }
    if(redirectLink){
      window.open(redirectLink)
    }else{
      showErrorToast('Error','No Meeting Links available.')
    }
    setSelectedEvent(null)
  }

  const modalTimeText = selectedEvent
    ? selectedEvent.end
      ? `${formatTime(selectedEvent.start, true)} - ${formatTime(selectedEvent.end)}`
      : formatTime(selectedEvent.start)
    : '';

  return (
    <div>
      {isLoading && <LoaderModal />}
      <div className='flex justify-between mb-4'>
        <div className='flex gap-4'>
          <button onClick={handlePrev} className='bg-background-80 hover:bg-background-60 rounded-xl h-11 aspect-square flex justify-center items-center'>
            <IconWrapper icon={ChevronLeft} size={0} customIconSize={5} />
          </button>
          <button onClick={handleToday} className='bg-background-80 hover:bg-background-60 rounded-xl h-11 flex justify-center items-center px-12'>
            {eventsDate?.calendarType === 'LIST' ? 'Today' : eventsDate?.calendarType === 'WEEK' ? 'This Week' : currentDate.monthShort}
          </button>
          <button onClick={handleNext} className='bg-background-80 hover:bg-background-60 rounded-xl h-11 aspect-square flex justify-center items-center'>
            <IconWrapper icon={ChevronRight} size={0} customIconSize={5} />
          </button>
        </div>
        <Tabs tabs={tabs} activeTab={eventsDate?.calendarType.toLowerCase()} handleTabClick={handleTabClick} />
      </div>
      <FullCalendar
        key={eventsDate?.calendarType}
        ref={calendarRef}
        plugins={[listPlugin, dayGridPlugin, timeGridPlugin]}
        initialView={eventsDate?.calendarType === 'MONTH' ? 'dayGridMonth' : eventsDate?.calendarType === 'WEEK' ? 'timeGridWeek' : 'listWeek'}
        headerToolbar={false}
        noEventsContent={() => (
          <div className="text-center py-8 text-font-gray">
            <h3>No Events Available.</h3>
            <p className='text-white typography-body'>No events scheduled for this period.</p>
          </div>
        )}
        events={events}
        eventContent={renderEventContent}
        allDaySlot={false}
        views={{
          timeGridWeek: {
            nowIndicator: true // Enable current time indicator for WEEK view
          }
        }}
        height="auto"
        dayHeaderContent={(arg) => {
          if (eventsDate?.calendarType === 'LIST') {
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
          } else if (eventsDate?.calendarType === 'MONTH') {
            return (
              <div className="fc-list-day-text my-2">
                {arg.text}
              </div>
            );
          } else if (eventsDate?.calendarType === 'WEEK') {
            return (
              <div className="fc-list-day-text my-2">
                {formatDate(arg.date, { weekday: 'short', day: 'numeric', month: 'short' })}
              </div>
            );
          }
        }}
        listDayFormat={eventsDate?.calendarType === 'LIST' ? false : true}
      />
      <StyledMenu anchorEl={anchor} handleMenuClose={() => setAnchor(null)} itemComponents={currentItemComponents} />
      <Modal
        open={!!selectedEvent}
        onClose={handleModalClose}
        onConfirm={onModalConfirm}
        customTitle={selectedEvent?.title || ''}
        customMessage={`${selectedEvent?.title} will happen from ${modalTimeText}.`}
        customConfirmLabel={selectedEvent?.joiningLink ? 'Join' : 'Join from Calendar'}
        isReadyToClose={false}
      />
    </div>
  );
}

export default CustomCalendar;
