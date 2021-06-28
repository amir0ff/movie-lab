import React, { ReactElement, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { globalContext } from '../../store';
import { Movies } from '../Movies';

export function Favorites(): ReactElement {
  const { globalState } = useContext(globalContext);

  return (
    <Col>
      <Row className="d-flex justify-content-center mt-3">
        {globalState.favoriteMovies.length === 0 ? <span>Please like some movies</span> : null}
      </Row>
      <Movies movies={globalState.favoriteMovies} />
    </Col>
  );
}
