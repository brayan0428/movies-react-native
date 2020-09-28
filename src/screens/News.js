import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {getNewMoviesApi} from '../api/movies';
import useTheme from '../hooks/useTheme';
import {BASE_PATH_IMG} from '../utils/constants';

const {width} = Dimensions.get('window');

export default function News({navigation}) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(true);
  const {darkTheme} = useTheme();

  useEffect(() => {
    getNewMoviesApi(page).then((response) => {
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
      <View style={styles.container}>
        {movies.map((m, index) => (
          <Movie key={index} movie={m} navigation={navigation} />
        ))}
      </View>
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
  const {id, title, poster_path} = movie;

  const onNavigation = () => {
    navigation.navigate('Movie', {id});
  };

  return (
    <TouchableWithoutFeedback onPress={onNavigation}>
      <View style={styles.containerMovie}>
        {poster_path ? (
          <Image
            style={styles.image}
            source={{uri: `${BASE_PATH_IMG}/w500${poster_path}`}}
          />
        ) : (
          <Text>{title}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerMovie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  btnLoad: {
    marginVertical: 15,
    backgroundColor: 'transparent',
  },
});
