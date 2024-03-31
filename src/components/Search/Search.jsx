import PropTypes from 'prop-types';
import css from './Search.module.css';

const Search = ({ handleSubmit, handleSearchInputChange, searchText }) => {
  return (
    <form onSubmit={handleSubmit} className={css.searchForm}>
      <label>
        <input
          className={css.searchInput}
          value={searchText}
          name="search"
          type="text"
          placeholder="Search a movie..."
          onChange={handleSearchInputChange}
          autoComplete="off"
        />
      </label>
      <button className={css.searchBtn} type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;

Search.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleSearchInputChange: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
};
