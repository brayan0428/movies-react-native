import { API_KEY, API_URL, LANG } from "../utils/constants"

export const getNewMoviesApi = (page = 1) => {
    const url = `${API_URL}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`
    return fetch(url).then(result => result.json()).then(data => data)
}

export const getGenresMoviesApi = (genresMovie) => {
    const url = `${API_URL}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`
    return fetch(url).then(result => result.json()).then(({genres}) => {
        const arrGenres = genres.filter(g => genresMovie.includes(g.id))
        return arrGenres
    })
}