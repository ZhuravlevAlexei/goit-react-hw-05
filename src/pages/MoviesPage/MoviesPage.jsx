import { useEffect, useState, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getDataByAxios } from '../../sevices/library';
import Search from '../../components/Search/Search';
import toast from 'react-hot-toast';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [movieList, setMovieList] = useState([]);
  const [searchText, setSearchText] = useState(
    searchParams.get('search') ?? ''
  );
  const totalPages = useRef(0);

  let paginationPage = Number(searchParams.get('page')) ?? 0;
  let title = '';

  useEffect(() => {
    getDataByAxios(`/search/movie`, paginationPage, searchText)
      .then(resp => {
        if (resp.status !== 200) {
          throw new Error(resp.statusText);
        } else {
          totalPages.current = resp.data.total_pages;
          setMovieList(resp.data.results);
        }
      })
      .catch(error => toast.error(error.message));
  }, [paginationPage, searchText]);

  const handleSubmit = evt => {
    evt.preventDefault();
    paginationPage = 1;
    let localValue = searchParams.get('search');
    setSearchParams({ search: localValue.trim(), page: 1 });
    setSearchText(localValue.trim());
  };

  const handleSearchInputChange = ({ target: { value } }) => {
    setSearchParams({ search: value, page: paginationPage });
  };

  const onLoadNextPage = () => {
    paginationPage = paginationPage + 1;
    setSearchParams({ search: searchText, page: paginationPage });
  };

  const onLoadPreviousPage = () => {
    paginationPage = paginationPage - 1;
    setSearchParams({ search: searchText, page: paginationPage });
  };

  const onToStartPage = () => {
    paginationPage = 1;
    setSearchParams({ search: searchText, page: 1 });
  };

  if (movieList.length === 0) {
    title = 'No matches';
  } else {
    title = `Search "${searchText}" (Page ${paginationPage} of ${totalPages.current})`;
  }

  return (
    <div>
      <Search
        handleSubmit={handleSubmit}
        handleSearchInputChange={handleSearchInputChange}
        searchText={searchParams.get('search') ?? ''}
      />
      {searchText && <h3>{title}</h3>}
      {movieList.length !== 0 && (
        <MovieList
          location={location}
          movieList={movieList}
          paginationPage={paginationPage}
          totalPages={totalPages.current}
          onLoadNextPage={onLoadNextPage}
          onLoadPreviousPage={onLoadPreviousPage}
          onToStartPage={onToStartPage}
        />
      )}
    </div>
  );
};

export default MoviesPage;
