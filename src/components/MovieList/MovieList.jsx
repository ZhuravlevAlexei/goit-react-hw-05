import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import css from './MovieList.module.css';

const MovieList = ({
  location,
  movieList,
  paginationPage,
  totalPages,
  onLoadNextPage,
  onLoadPreviousPage,
  onToStartPage,
}) => {
  return (
    <>
      <ul>
        {movieList.map(({ id, title }) => (
          <li key={id} className={css.listTxt}>
            <Link to={`/movies/${id}`} state={location}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <div className={css.buttonWrap}>
        {movieList.length !== 0 && paginationPage < totalPages && (
          <Button btnName={'Next page'} onClick={onLoadNextPage} />
        )}
        {movieList.length !== 0 && paginationPage > 1 && (
          <>
            <Button btnName={'Previous page'} onClick={onLoadPreviousPage} />
            <Button btnName={'Start page'} onClick={onToStartPage} />
          </>
        )}
      </div>
    </>
  );
};

MovieList.propTypes = {
  location: PropTypes.object.isRequired,
  movieList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  paginationPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onLoadNextPage: PropTypes.func.isRequired,
  onLoadPreviousPage: PropTypes.func.isRequired,
  onToStartPage: PropTypes.func.isRequired,
};

export default MovieList;

// an example for the future

// there is a react-router-prop-types package
// you can install and use.It exports a location PropType
// declaration with the pathname prop already required.

// export const location = PropTypes.shape({
//   hash: PropTypes.string.isRequired,
//   key: PropTypes.string, // only in createBrowserHistory and createMemoryHistory
//   pathname: PropTypes.string.isRequired,
//   search: PropTypes.string.isRequired,
//   state: PropTypes.oneOfType([
//     PropTypes.array,
//     PropTypes.bool,
//     PropTypes.number,
//     PropTypes.object,
//     PropTypes.string,
//   ]), // only in createBrowserHistory and createMemoryHistory
// });

// import { location } from 'react-router-prop-types';

// Dashboard.propTypes = {
//   // ... the other prop types
//   location: location.isRequired,
// };
