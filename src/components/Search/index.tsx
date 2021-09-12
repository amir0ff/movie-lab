import React, { ReactElement, useEffect, useState } from 'react';
import { Col, Container, FormControl, InputGroup, Row, Spinner } from 'react-bootstrap';
import { getMovieByTitle } from '../../utils/OMDbAPI';
import { Movies } from '../Movies';
import './styles.scss';

export function Search(): ReactElement {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cachedSearchTerm, setCachedSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // debounce the GET request by some time before the user decides the search term
    // as the user types the states gets updated and clears the previous set timer
    const withDebounce = setTimeout(() => {
      if (searchTerm !== cachedSearchTerm && searchTerm !== '') {
        return getMovie(searchTerm);
      }
    }, 600);
    return () => clearTimeout(withDebounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.currentTarget.value);
  }

  async function getMovie(searchTerm: string) {
    setIsLoading(true);
    setCachedSearchTerm(searchTerm);
    await getMovieByTitle(searchTerm)
      .then((res: any) => {
        const data = res.data;
        if (data.Response === 'True') {
          setMovies(data.Search);
          setError('');
          setIsLoading(false);
        } else if (data.Response === 'False') {
          setError(data.Error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setIsLoading(false);
      });
  }

  return (
    <Container fluid="xl" className="mt-4 search-container">
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="d-flex justify-content-center mt-3">
          <InputGroup>
            <FormControl placeholder="Search by title" className="rounded-0" onChange={handleChange} />
            {isLoading ? (
              <Spinner animation="border" role="status">
                <span className="d-none">Loading...</span>
              </Spinner>
            ) : null}
          </InputGroup>
        </Col>
        <Col md={{ span: 6, offset: 3 }} className="d-flex justify-content-center mt-3">
          <p className="error-message">{error}</p>
        </Col>
      </Row>
      <Movies movies={movies} />
    </Container>
  );
}
