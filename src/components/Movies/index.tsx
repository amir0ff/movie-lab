import React, { ReactElement } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Movie } from './components/Movie';
import { MoviesComponentType } from './types';
import './styles.scss';

export function Movies({ movies }: MoviesComponentType): ReactElement {
  return (
    <Container className="main-movies-container">
      <Row className="d-flex mt-4 flex-wrap justify-content-start align-items-start">
        {movies.map((movie: any, index: number) => {
          return <Movie key={movie.imdbID + index} movie={movie} />;
        })}
      </Row>
    </Container>
  );
}
