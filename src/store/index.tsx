import React, { createContext, ReactElement, ReactNode, useEffect, useReducer } from 'react';
import Reducer from './reducer';
import { ContextType, GlobalStateInterface } from './types';

/**
 * React Context-based Global Store with a reducer
 * and persistent saves to sessionStorage/localStorage
 **/
export function GlobalStore({ children }: { children: ReactNode }): ReactElement {
  const [globalState, dispatch] = useReducer(Reducer, initializeState());

  useEffect(() => {
    /*
     populate either sessionStorage or localStorage data from globalState based on
     persistenceType and purge sessionStorage or localStorage when either is selected
    */
    const getPersistenceType = globalState.persistenceType;
    if (getPersistenceType === 'sessionStorage') {
      sessionStorage.setItem('globalState', JSON.stringify(globalState));
      localStorage.removeItem('globalState');
    } else if (getPersistenceType === 'localStorage') {
      localStorage.setItem('globalState', JSON.stringify(globalState));
      sessionStorage.removeItem('globalState');
    }
  }, [globalState]);

  return <globalContext.Provider value={{ globalState, dispatch }}>{children}</globalContext.Provider>;
}

export const globalContext = createContext({} as ContextType);

export const initialState: GlobalStateInterface = {
  favoriteMovies: [],
  isUserAuthenticated: false,
  loggedUser: '',
  persistenceType: 'sessionStorage',
};

function initializeState() {
  /*
   the order in which the the data is compared is very important;
   first try to populate the state from Storage if not return initialState
  */
  const fromLocalStorage = JSON.parse(localStorage.getItem('globalState') as string);
  const fromSessionStorage = JSON.parse(sessionStorage.getItem('globalState') as string);
  return fromSessionStorage || fromLocalStorage || initialState;
}
