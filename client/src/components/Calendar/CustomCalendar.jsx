import React from 'react'
import { useQuery } from "@tanstack/react-query";
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import { fetchCalendarDetails } from '../../services/admin.candidate.service';
import './calendar.css';

// import dayGridPlugin from '@fullcalendar/daygrid'; // Optional, for month view toggle
// import interactionPlugin from '@fullcalendar/interaction'; // Optional, for click/drag

function CustomCalendar() {
    const { data , isLoading } = useQuery({
        queryKey : ['interview-details'],
        queryFn : fetchCalendarDetails
    })
    console.log(data)

    const events = [
    {
        title: 'Team Standup',
        start: '2025-06-10T09:00:00',
        description: 'Daily sync meeting with dev team',
    },
    {
        title: 'Team Standup',
        start: '2025-06-10T11:00:00',
        description: 'Daily sync meeting with dev team',
    },
    {
        title: 'Client Demo',
        start: '2025-06-11T14:00:00',
        description: 'Present project to client',
    },
    {
        title: 'Release Deadline',
        start: '2025-06-12',
        description: 'Final build release',
    },
    ];

    const renderEventContent = (eventInfo) => {
    return (
        <div className="p-2 border border-blue-200 bg-blue-50 rounded-md shadow-sm">
        <div className="text-blue-800 font-semibold text-sm">
            {eventInfo.event.title}
        </div>
        <div className="text-gray-500 text-xs">
            {eventInfo.timeText}
        </div>
        {eventInfo.event.extendedProps.description && (
            <div className="text-gray-400 text-xs italic">
            {eventInfo.event.extendedProps.description}
            </div>
        )}
        </div>
    );
    };

  return (
    <div>
    <FullCalendar
        plugins={[listPlugin]}
        initialView="listWeek"
        headerToolbar={{
          left: 'prev today next',
          center: '',
          right: '',
        }}
        events={events}
        eventContent={renderEventContent}
        height="auto"
      />
    </div>
  )
}

export default CustomCalendar
