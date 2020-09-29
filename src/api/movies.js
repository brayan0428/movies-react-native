import {API_KEY, API_URL, LANG} from '../utils/constants';

export const getNewMoviesApi = (page = 1) => {
  const url = `${API_URL}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`;
  return fetch(url)
    .then((result) => result.json())
    .then((data) => data);
};

export const getGenresMoviesApi = (genresMovie) => {
  const url = `${API_URL}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;
  return fetch(url)
    .then((result) => result.json())
    .then(({genres}) => {
      const arrGenres = genres.filter((g) => genresMovie.includes(g.id));
      return arrGenres;
    });
};

export const getGenresListApi = () => {
  const url = `${API_URL}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.genres);
};

export const getMoviesByGenreApi = (idGenres) => {
  const url = `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${idGenres}&language=${LANG}`;

  return fetch(url)
  .then((response) => response.json())
  .then((data) => data);
}

export const getMoviesByIdApi = (id) => {
  const url = `${API_URL}/movie/${id}?api_key=${API_KEY}&language=${LANG}`;

  return fetch(url)
  .then((response) => response.json())
  .then((data) => data);
}

export const getMoviesVideoApi = (id) => {
  const url = `${API_URL}/movie/${id}/videos?api_key=${API_KEY}&language=${LANG}`;

  return fetch(url)
  .then((response) => response.json())
  .then((data) => data);
}

export const getPopularMovies = (page = 1) => {
  const url = `${API_URL}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`;

  return fetch(url)
  .then((response) => response.json())
  .then((data) => data);
}

export const getSearchMovies = (query) => {
  const url = `${API_URL}/search/movie?api_key=${API_KEY}&language=${LANG}&query=${query}`;

  return fetch(url)
  .then((response) => response.json())
  .then((data) => data);
}