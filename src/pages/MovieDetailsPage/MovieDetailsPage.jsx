import { Suspense, useEffect, useState } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';

import { getDataByAxios } from '../../sevices/library';
import css from './MovieDetailsPage.module.css';
import toast from 'react-hot-toast';

const MovieDetailsPage = () => {
  const [movieData, setMovieData] = useState({});
  const { movieId } = useParams();
  const BASE_IMAGE_ENDPOINT = 'https://image.tmdb.org/t/p/w500';
  const location = useLocation();

  useEffect(() => {
    getDataByAxios(`/movie/${movieId}`, 0, '')
      .then(resp => {
        if (resp.status !== 200) {
          throw new Error(resp.statusText);
        } else {
          setMovieData(resp.data);
        }
      })
      .catch(error => toast.error(error.message));
  }, [movieId]);

  const {
    genres,
    original_title,
    overview,
    poster_path,
    release_date,
    vote_average,
  } = movieData;

  const pathToPoster = BASE_IMAGE_ENDPOINT + poster_path;

  return (
    <>
      <Link className={css.linkAdditional} to={location.state}>
        &#8592; Go back
      </Link>
      <div className={css.movieCard}>
        {poster_path && (
          <img src={pathToPoster} alt="Poster" width="280" height="420" />
        )}
        <div>
          <h2>
            {original_title} ({release_date && release_date.slice(0, 4)})
          </h2>
          <p className={css.descrText}>
            User Score: {((vote_average / 10) * 100).toFixed(0)}%
          </p>
          <h3>Owerview</h3>
          <p className={css.descrText}>{overview}</p>
          <h3>Genres</h3>
          {genres && (
            <p className={css.descrText}>
              {genres.map(({ name }) => name).join(',  ')}
            </p>
          )}
        </div>
      </div>
      <div className={css.addtionals}>
        <p className={css.additionalsText}>Additional information</p>
        <ul className={css.additionalsList}>
          <li className={css.additionalsLink}>
            <Link to="cast" state={location.state}>
              Cast
            </Link>
          </li>
          <li className={css.additionalsLink}>
            <Link to="reviews" state={location.state}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
