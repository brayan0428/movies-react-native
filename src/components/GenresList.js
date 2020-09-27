import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text, Title} from 'react-native-paper';
import {getGenresListApi, getMoviesByGenreApi} from '../api/movies';
import CarouselMovies from './CarouselMovies';

export default function GenresList({navigation}) {
  const [genresList, setGenresList] = useState([]);
  const [genreSelected, setGenreSelected] = useState(28);
  const [moviesList, setMoviesList] = useState([])

  useEffect(() => {
    getGenresListApi().then((genres) => setGenresList(genres));
  }, []);

  useEffect(() => {
    getMoviesByGenreApi(genreSelected).then(result => setMoviesList(result.results))
  }, [genreSelected])

  return (
    <>
      <Title style={styles.title}>Películas por Género</Title>
      <ScrollView
        style={styles.genres}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {genresList.map((g) => (
          <Text
            key={g.id}
            style={[styles.genre, { color: g.id !== genreSelected ? '#8697a5' : '#fff' }]}
            onPress={() => setGenreSelected(g.id)}>
            {g.name}
          </Text>
        ))}
      </ScrollView>
      <CarouselMovies movies={moviesList} navigation={navigation}/>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
    marginHorizontal: 16,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genres: {
    paddingHorizontal: 18,
    marginVertical: 10,
    marginBottom: 15
  },
  genre: {
    marginRight: 10,
  },
});
