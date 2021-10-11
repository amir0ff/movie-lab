import React, { ReactElement, useContext } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Search } from '../components/Search';
import { Favorites } from '../components/Favorites';
import { Login } from '../components/Login';
import { Header } from '../components/Header';
import { PrivateRoute } from './PrivateRoute';
import { globalContext } from '../store';

export function RouterView(): ReactElement {
  const { globalState } = useContext(globalContext);
  const location = useLocation();
  const { pathname } = location;

  return (
    <Container fluid className="p-0">
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <PrivateRoute exact path="/search" pathname={pathname} component={Search} />
          <PrivateRoute exact path="/favorites" pathname={pathname} component={Favorites} />
          <Route exact path="/login">
            {globalState.isUserAuthenticated ? <Redirect to="/favorites" from={pathname} /> : <Login />}
          </Route>
        </Switch>
    </Container>
  );
}
