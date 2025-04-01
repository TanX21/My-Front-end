// src/context/SearchContext.js

import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  // Log the context values here if needed
  // console.log('Search Context:', { searchQuery, updateSearchQuery });

  return (
    <SearchContext.Provider value={{ searchQuery, updateSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
