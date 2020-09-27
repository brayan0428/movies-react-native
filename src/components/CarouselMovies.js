import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Title} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {BASE_PATH_IMG} from '../utils/constants';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.3);

export default function CarouselMovies({movies, navigation}) {
  return (
    <Carousel
      renderItem={(item) => <RenderItem movie={item} navigation={navigation}/>}
      data={movies}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1}
      firstItem={1}
    />
  );
}

function RenderItem({movie, navigation}) {
  const {id, title, poster_path} = movie.item;
  const urlImage = `${BASE_PATH_IMG}/w500${poster_path}`;

  const onNavigation = () => {
    navigation.navigate("Movie", {id})
  }

  return (
    <TouchableWithoutFeedback onPress={onNavigation}>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: urlImage}} />
        <Title numberOfLines={1} style={styles.title}>
          {title}
        </Title>
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
    width: '85%',
    height: 170,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    marginHorizontal: 10,
    marginTop: 10,
  },
});
