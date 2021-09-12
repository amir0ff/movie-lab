import React, { createContext, ReactElement, ReactNode, useEffect, useReducer, useRef } from 'react';
import Reducer from './reducer';
import { ContextType, GlobalStateInterface } from './types';

/**
 * React Context-based Global Store with a reducer
 * and persistent saves to sessionStorage/localStorage
 **/
export function GlobalStore({ children }: { children: ReactNode }): ReactElement {
  const [globalState, dispatch] = useReducer(Reducer, initializeState());
  const initialRenderGlobalState = useRef(true);
  const initialRenderPersistenceType = useRef(true);

  useEffect(() => {
    /*
     populate either sessionStorage or localStorage
     data from globalState based on persistenceType
    */
    if (initialRenderGlobalState.current) {
      initialRenderGlobalState.current = false;
      return;
    }
    const getPersistenceType = globalState.persistenceType;
    if (getPersistenceType === 'sessionStorage') {
      sessionStorage.setItem('globalState', JSON.stringify(globalState));
    } else if (getPersistenceType === 'localStorage') {
      localStorage.setItem('globalState', JSON.stringify(globalState));
    }
  }, [globalState]);

  useEffect(() => {
    /*
     purge sessionStorage or localStorage when either is selected
    */
    if (initialRenderPersistenceType.current) {
      initialRenderPersistenceType.current = false;
      return;
    }
    const getPersistenceType = globalState.persistenceType;
    if (getPersistenceType === 'sessionStorage') {
      localStorage.removeItem('globalState');
    } else if (getPersistenceType === 'localStorage') {
      sessionStorage.removeItem('globalState');
    }
  }, [globalState.persistenceType]);

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

  if (typeof (Storage) !== 'undefined') {
  } else {
    throw new Error('You need to enable Storage to run this app.');
  }

  const fromLocalStorage = JSON.parse(localStorage.getItem('globalState') as string);
  const fromSessionStorage = JSON.parse(sessionStorage.getItem('globalState') as string);
  return fromSessionStorage || fromLocalStorage || initialState;
}
