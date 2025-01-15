import { createContext, useContext, useState } from "react";

const PreserverContext = createContext(null);

export const usePreserver = ()=> useContext(PreserverContext)

import React from 'react'

function StatePreserver({children}) {
    const [filters,setFilters] = useState({
        stage: [],
        status: [],
        experience: [],
        budget: [],
        rating: [],
        assignee: [],
    });
    const [query,setQuery] = useState('');

  return (
    <PreserverContext.Provider value={{filters,setFilters,query,setQuery}}>
        {children}
    </PreserverContext.Provider>
  )
}

export default StatePreserver
