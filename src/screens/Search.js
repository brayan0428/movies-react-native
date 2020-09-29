import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Searchbar, Title} from 'react-native-paper';
import {getSearchMovies} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants';

const {width} = Dimensions.get('window');

export default function Search({navigation}) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  console.log(movies);

  useEffect(() => {
    if (query.length > 2) {
      getSearchMovies(query).then((response) => setMovies(response.results));
    } else {
      setMovies([]);
    }
  }, [query]);

  return (
    <SafeAreaView>
      <Searchbar
        placeholder="Busca tu película"
        iconColor={Platform.OS == 'ios' && 'transparent'}
        icon="arrow-left"
        style={styles.input}
        onChangeText={(e) => setQuery(e)}
      />
      <ScrollView>
        <View style={styles.container}>
          {movies.map((movie, index) => (
            <Movie {...movie} key={index} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Movie({id, title, poster_path, navigation}) {
  const onNavigation = () => {
    navigation.navigate('Movie', {id});
  };

  return (
    <TouchableWithoutFeedback onPress={onNavigation}>
      <View style={styles.containerMovie}>
        {poster_path ? (
          <Image
            style={styles.img}
            source={{uri: `${BASE_PATH_IMG}/w500${poster_path}`}}
          />
        ) : (
          <Title>{title}</Title>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#15212b',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  containerMovie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
