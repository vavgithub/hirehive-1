import { createContext, useContext, useEffect, useState } from "react";

const PreserverContext = createContext(null);

export const usePreserver = (key) => {
  const { unique, setUnique, ...rest } = useContext(PreserverContext);

  useEffect(() => {
    if (key && key !== unique) {
      setUnique(key);
    }
  }, [key]);

  //Abstracted Unique keyword from local usage
  return rest;
};

import React from "react";

function StatePreserver({ children }) {
  const [unique, setUnique] = useState("");

  //Table Preservations
  const [filters, setFilters] = useState({
    stage: [],
    status: [],
    experience: "",
    budget: [],
    rating: [],
    assignee: [],
  });
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  //Add other preservations

  useEffect(() => {
    setFilters({
      stage: [],
      status: [],
      experience: "",
      budget: [],
      rating: [],
      assignee: [],
    });
    setQuery("");
    setCurrentPage(0);
    setPageSize(10);
    //Add other preservations
  }, [unique]);


  return (
    <PreserverContext.Provider
      value={{
        filters,
        setFilters,
        query,
        setQuery,
        unique,
        setUnique,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
      }}
    >
      {children}
    </PreserverContext.Provider>
  );
}

export default StatePreserver;
