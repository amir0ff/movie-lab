import React, { ReactElement, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap';
import { faDatabase, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { globalContext } from '../../store';
import './styles.scss';
import logo from './logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Header(): ReactElement {
  const { globalState, dispatch } = useContext(globalContext);
  const history = useHistory();

  async function handleLogout() {
    await dispatch({ type: 'PURGE_STATE' });
    return history.push('/login');
  }

  return (
    <Navbar collapseOnSelect expand="md" variant="dark" className="header">
      <Navbar.Brand>
        <img src={logo} alt="logo" className="logo" />
        <span className="brand">
          Movie<span className="font-weight-bold">Lab</span>
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/search" activeClassName="active" className="mr-3">
            <span>Search</span>
          </NavLink>
          <NavLink to="/favorites" activeClassName="active">
            <span>Favorites</span>
          </NavLink>
        </Nav>
        {globalState.loggedUser ? (
          <Nav>
            <DropdownButton variant="info" menuAlign="right" size="sm" title={globalState.loggedUser} id="user-menu">
              <Dropdown.Item>
                <FontAwesomeIcon icon={faDatabase} />
                {globalState.persistenceType === 'sessionStorage' ? 'Session Storage' : 'Local Storage'}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="1" onClick={handleLogout}>
                <FontAwesomeIcon icon={faPowerOff} /> Logout
              </Dropdown.Item>
            </DropdownButton>
          </Nav>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
}
