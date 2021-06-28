import React, { ReactElement, useContext, useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { useDoubleTap } from 'use-double-tap';
import { MovieType } from '../../../../store/types';
import { MovieComponentType } from './types';
import { globalContext } from '../../../../store';
import './styles.scss';

export function Movie({ movie }: MovieComponentType): ReactElement {
  const { globalState, dispatch } = useContext(globalContext);
  const [isMovieLiked, setMovieLiked] = useState(isMovieInFavorites());

  const doubleTap = useDoubleTap(() => {
    if (!isMovieLiked) {
      likeMovie();
    } else {
      unlikeMovie();
    }
  });

  function isMovieInFavorites() {
    return globalState.favoriteMovies.some((likedMovie: MovieType) => likedMovie.imdbID === movie.imdbID);
  }

  function likeMovie() {
    if (!isMovieLiked) {
      setMovieLiked(true);
      dispatch({ type: 'LIKE_MOVIE', payload: movie });
    }
  }

  function unlikeMovie() {
    setMovieLiked(false);
    dispatch({ type: 'UNLIKE_MOVIE', payload: movie.imdbID });
  }

  return (
    <Col className="mb-4 movie-container">
      <Card className="">
        <img src={movie.Poster} alt={movie.Title} {...doubleTap} />
        <Card.Body>
          <h5 className="card-title">{movie.Title}</h5>
          <p className="card-text">{movie.Year}</p>
          <p className="card-text">
            <a href={`https://www.imdb.com/title/${movie.imdbID}/`} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faImdb} size="4x" />
            </a>
            <span className="font-weight-bold">IMDb: </span>
            {movie.imdbID.toUpperCase()}
          </p>
        </Card.Body>
        {!isMovieLiked ? (
          <button type="button" className="btn btn-danger remove-btn" title="Like" onClick={likeMovie}>
            <FontAwesomeIcon icon={faHeart} />
          </button>
        ) : (
          <button type="button" className="btn btn-secondary fav-btn" title="Unlike" onClick={unlikeMovie}>
            <FontAwesomeIcon icon={faHeartBroken} />
          </button>
        )}
      </Card>
    </Col>
  );
}
