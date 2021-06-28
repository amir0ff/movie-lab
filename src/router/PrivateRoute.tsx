import React, { ReactElement, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { globalContext } from '../store';
import { PrivateRouteComponentType } from './types';

export function PrivateRoute({ component: Component, path, exact, pathname }: PrivateRouteComponentType): ReactElement {
  const { globalState } = useContext(globalContext);

  return (
    <Route {...path} {...exact}>
      {globalState.isUserAuthenticated ? <Component /> : <Redirect to="/login" from={pathname} />}
    </Route>
  );
}
