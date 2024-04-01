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
  const [forceUpd, setForceUpd] = useState(location.state);
  console.log('location.state: ', location.state);
  const totalPages = useRef(0);

  let searchText = searchParams.get('search') ?? '';
  let paginationPage = Number(searchParams.get('page')) ?? 0;
  let title = '';

  useEffect(() => {
    if (!forceUpd) return;
    getDataByAxios(`/search/movie`, paginationPage, searchText)
      .then(resp => {
        if (resp.status !== 200) {
          throw new Error(resp.statusText);
        } else {
          totalPages.current = resp.data.total_pages;
          setMovieList(resp.data.results);
          setForceUpd(false);
        }
      })
      .catch(error => toast.error(error.message));
  }, [paginationPage, searchText, forceUpd]);

  const handleSubmit = evt => {
    evt.preventDefault();
    paginationPage = 1;
    let localValue = searchParams.get('search');
    setSearchParams({ search: localValue.trim(), page: 1 });
    setForceUpd(true);
  };

  const handleSearchInputChange = ({ target: { value } }) => {
    setSearchParams({ search: value, page: 0 });
  };

  const onLoadNextPage = () => {
    paginationPage += 1;
    setSearchParams({ search: searchText, page: paginationPage });
    setForceUpd(true);
  };

  const onLoadPreviousPage = () => {
    paginationPage -= 1;
    setSearchParams({ search: searchText, page: paginationPage });
    setForceUpd(true);
  };

  const onToStartPage = () => {
    paginationPage = 1;
    setSearchParams({ search: searchText, page: 1 });
  };

  if (searchText) {
    title = `Preparing to search "${searchText}"`;
  }

  if (paginationPage) {
    title = `Results for "${searchText}" (Page ${paginationPage} of ${totalPages.current})`;
  }

  location.state = true;

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
