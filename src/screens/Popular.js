import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, Text, Title} from 'react-native-paper';
import {getPopularMovies} from '../api/movies';
import defaultImage from '../assets/img/default_image.png';
import {BASE_PATH_IMG} from '../utils/constants';
import startDark from '../assets/img/starDark.png';
import startLight from '../assets/img/starLight.png';
import useTheme from '../hooks/useTheme';
import {Rating} from 'react-native-ratings';

export default function Popular({navigation}) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(true);
  const {darkTheme} = useTheme();

  useEffect(() => {
    getPopularMovies(page).then((response) => {
      const totalPages = response.total_pages;
      if (page < totalPages) {
        setMovies([...movies, ...response.results]);
      } else {
        setShowBtn(false);
      }
    });
  }, [page]);

  return (
    <ScrollView>
      {movies.map((m, index) => (
        <Movie key={index} movie={m} navigation={navigation} />
      ))}
      {showBtn && (
        <Button
          mode="contained"
          style={styles.btnLoad}
          onPress={() => setPage(page + 1)}
          labelStyle={{color: darkTheme ? '#fff' : '#000'}}>
          Cargar más...
        </Button>
      )}
    </ScrollView>
  );
}

function Movie({movie, navigation}) {
  const {
    id,
    poster_path,
    title,
    release_date,
    vote_count,
    vote_average,
  } = movie;

  const onNavigation = () => {
    navigation.navigate('Movie', {id});
  };

  return (
    <TouchableWithoutFeedback onPress={onNavigation}>
      <View style={styles.containerMovie}>
        <View>
          <Image
            style={styles.image}
            source={
              poster_path
                ? {uri: `${BASE_PATH_IMG}/w500${poster_path}`}
                : defaultImage
            }
          />
        </View>
        <View style={styles.containerInfo}>
          <Title>{title}</Title>
          <Text>{release_date}</Text>
          <MovieRatings voteCount={vote_count} voteAverage={vote_average} />
          <Text>{vote_count} votos</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function MovieRatings({voteAverage, voteCount}) {
  const media = voteAverage / 2;
  const {darkTheme} = useTheme();
  return (
    <View style={styles.containerRaiting}>
      <Rating
        readonly={true}
        type="custom"
        ratingImage={darkTheme ? startDark : startLight}
        ratingColor="yellow"
        ratingBackgroundColor={darkTheme ? '#192734' : '#f0f0f0'}
        startingValue={media}
        imageSize={20}
        style={{marginRight: 15}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerMovie: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 20,
  },
  containerInfo: {
    marginVertical: 5,
    marginLeft: 15,
  },
  containerRaiting: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  btnLoad: {
    marginVertical: 15,
    backgroundColor: 'transparent',
  },
});
