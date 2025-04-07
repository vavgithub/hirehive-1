import React from 'react'

export const NotificationIcon = function ({count}) {
  return (
    <div className='relative' >
        {count > 0 && <div className='absolute right-1 bg-blue-100  w-5 h-5 flex justify-center items-center rounded-md text-xs text-white ' >{count}</div>}
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M24.1144 33.804C23.8996 34.1678 23.5911 34.4697 23.2201 34.6796C22.849 34.8895 22.4282 35 22 35C21.5718 35 21.151 34.8895 20.7799 34.6796C20.4089 34.4697 20.1004 34.1678 19.8856 33.804M29.3333 18.2013C29.3333 16.2914 28.5607 14.4597 27.1854 13.1092C25.8102 11.7587 23.9449 11 22 11C20.0551 11 18.1898 11.7587 16.8146 13.1092C15.4393 14.4597 14.6667 16.2914 14.6667 18.2013C14.6667 26.6028 11 29.0032 11 29.0032H33C33 29.0032 29.3333 26.6028 29.3333 18.2013Z"
                stroke="#808389" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M29.3333 18.2013C29.3333 16.2914 28.5607 14.4597 27.1854 13.1092C25.8102 11.7587 23.9449 11 22 11C20.0551 11 18.1898 11.7587 16.8146 13.1092C15.4393 14.4597 14.6667 16.2914 14.6667 18.2013C14.6667 26.6028 11 29.0032 11 29.0032H33C33 29.0032 29.3333 26.6028 29.3333 18.2013Z"
                fill="#808389" fillOpacity="0.3" stroke="#808389" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
  )
}

export const NotificationIconActive = function ({count}) {
  return (
    <div className='relative' >
        {count > 0 && <div className='absolute right-1 bg-blue-100  w-5 h-5 flex justify-center items-center rounded-md text-xs text-white ' >{count}</div>}
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M24.1144 33.804C23.8996 34.1678 23.5911 34.4697 23.2201 34.6796C22.849 34.8895 22.4282 35 22 35C21.5718 35 21.151 34.8895 20.7799 34.6796C20.4089 34.4697 20.1004 34.1678 19.8856 33.804M29.3333 18.2013C29.3333 16.2914 28.5607 14.4597 27.1854 13.1092C25.8102 11.7587 23.9449 11 22 11C20.0551 11 18.1898 11.7587 16.8146 13.1092C15.4393 14.4597 14.6667 16.2914 14.6667 18.2013C14.6667 26.6028 11 29.0032 11 29.0032H33C33 29.0032 29.3333 26.6028 29.3333 18.2013Z"
                stroke="#18E9D0" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M29.3333 18.2013C29.3333 16.2914 28.5607 14.4597 27.1854 13.1092C25.8102 11.7587 23.9449 11 22 11C20.0551 11 18.1898 11.7587 16.8146 13.1092C15.4393 14.4597 14.6667 16.2914 14.6667 18.2013C14.6667 26.6028 11 29.0032 11 29.0032H33C33 29.0032 29.3333 26.6028 29.3333 18.2013Z"
                fill="#18E9D0" fillOpacity="0.3" stroke="#18E9D0" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
  )
}

