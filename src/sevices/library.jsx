import axios from 'axios';
import { toast } from 'react-hot-toast';

export async function getDataByAxios(
  ENDPOINT,
  paginationPage = 1,
  searchText = ''
) {
  try {
    const BASE_URL = `https://api.themoviedb.org/3`;

    let URL = BASE_URL + ENDPOINT + `?include_adult=false&language=en-US`;
    const axiosConfig = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZGZhZmQwOGMwMDFmZDMyNjJkYzNmZTIzNTA0ZmEwNSIsInN1YiI6IjY0M2E0OTk1MzEyMzQ1MDRjNGQ4MmNhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gg9n2ywUncYKufSDUyoeH5lMDCKTXBfCUwhmMMZYBBk',
      },
    };

    if (searchText) {
      URL = URL + `&query=${searchText.trim()}`;
    }
    if (paginationPage) {
      URL = URL + `&page=${paginationPage}`;
    }

    const resp = await axios.get(URL, axiosConfig);

    return resp;
  } catch (error) {
    toast.error(error.message);
  }
}

// correct URL example from HW5:   https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1'
// my themoviedb API keys
//API Key (v3 auth)  6dfafd08c001fd3262dc3fe23504fa05

//Example API Request  https://api.themoviedb.org/3/movie/550?api_key=6dfafd08c001fd3262dc3fe23504fa05
// auth with ?api_key
// const MY_THEMOVIEDB_API_KEY = '6dfafd08c001fd3262dc3fe23504fa05';
// let URL =
//   BASE_URL +
//   ENDPOINT +
//   `?api_key=${MY_THEMOVIEDB_API_KEY}` +
//   '&include_adult=false&language=en-US';
// const resp = await axios.get(URL);

//API Read Access Token (v4 auth)
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZGZhZmQwOGMwMDFmZDMyNjJkYzNmZTIzNTA0ZmEwNSIsInN1YiI6IjY0M2E0OTk1MzEyMzQ1MDRjNGQ4MmNhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gg9n2ywUncYKufSDUyoeH5lMDCKTXBfCUwhmMMZYBBk
