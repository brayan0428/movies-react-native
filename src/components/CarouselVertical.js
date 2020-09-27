import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {Text, Title} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {getGenresMoviesApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);

export default function CarouselVertical({movies, navigation}) {
  return (
    <Carousel
      layout={'default'}
      data={movies}
      renderItem={(item) => <RenderItem movie={item} navigation={navigation}/>}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
    />
  );
}

function RenderItem({movie, navigation}) {
  const [genres, setGenres] = useState(null);
  const {id, title, poster_path, genre_ids} = movie.item;
  const urlImage = `${BASE_PATH_IMG}/w500${poster_path}`;

  const onNavigation = () => {
    navigation.navigate("Movie", {id})
  }

  useEffect(() => {
    getGenresMoviesApi(genre_ids).then((data) => setGenres(data));
  }, []);

  return (
    <TouchableWithoutFeedback onPress={onNavigation}>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: urlImage}} />
        <Title style={styles.title}>{title}</Title>
        <View style={styles.genres}>
          {genres && genres.map((g, index) => (
            <Text key={g.id} style={styles.genre}>
                {g.name} {index !== genres.length - 1 && ', '}
            </Text>)
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: 450,
    borderRadius: 20,
  },
  title: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  genres: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  genre: {
    fontSize: 12,
    color: '#8997a5',
  },
});
