import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {IconButton, Title, Text} from 'react-native-paper';
import {getMoviesByIdApi} from '../api/movies';
import ModalVideo from '../components/ModalVideo';
import {BASE_PATH_IMG} from '../utils/constants';
import startDark from '../assets/img/starDark.png'
import startLight from '../assets/img/starLight.png'
import useTheme from '../hooks/useTheme';
import { Rating } from 'react-native-ratings';

export default function Movie({route}) {
  const [movie, setMovie] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const id = route.params.id;

  useEffect(() => {
    getMoviesByIdApi(id).then((response) => setMovie(response));
  }, []);

  if (!movie) return null;

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MovieImage posterPath={movie.poster_path} />
        <MovieTrailer setShow={setShowVideo}/>
        <MovieTitle {...movie}/>
        <MovieRatings voteAverage={movie.vote_average} voteCount={movie.vote_count} />
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={[styles.overview, {marginBottom: 30}]}>Fecha de lanzamiento: {movie.release_date}</Text>
      </ScrollView>
      <ModalVideo show={showVideo} setShow={setShowVideo} idVideo={id}/>
    </>
  );
}

function MovieTrailer({setShow}) {
  return (
    <View style={styles.containerIconTrailer}>
      <IconButton
        style={styles.iconTrailer}
        icon="play"
        color="#000"
        size={30}
        onPress={() => setShow(true)}
      />
    </View>
  );
}
function MovieImage({posterPath}) {
  return (
    <View style={styles.containerPoster}>
      <Image
        style={styles.poster}
        source={{uri: `${BASE_PATH_IMG}/w500${posterPath}`}}
      />
    </View>
  );
}

function MovieTitle({title, genres}){
    return (
        <View style={styles.titleContainer}>
            <Title style={styles.titleText}>{title}</Title>
            <View style={styles.genresContainer}>
                {
                    genres.map(g => <Text style={styles.genreText} key={g.id}>{g.name}</Text>)
                }
            </View>
        </View>
    )
}

function MovieRatings ({voteAverage, voteCount})  {
  const media = voteAverage / 2
  const { darkTheme } = useTheme()
  return (
    <View style={styles.containerRaiting}> 
      <Rating
        readonly={true}
        type="custom"
        ratingImage={darkTheme ? startDark : startLight}
        ratingColor="yellow"
        ratingBackgroundColor={darkTheme ? "#192734" : "#f0f0f0"}
        startingValue={media}
        imageSize={20}
        style={{ marginRight: 15 }}
      />
      <Text style={{ fontSize: 16, marginRight: 5 }}>{media}</Text>
      <Text style={{ fontSize: 12, color: '#8697a5', marginLeft : 15 }}>{voteCount} votos</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  containerPoster: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  poster: {
    width: '100%',
    height: 500,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  containerIconTrailer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  iconTrailer: {
    backgroundColor: '#fff',
    marginTop: -40,
    marginRight: 30,
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  titleContainer: {
      marginHorizontal: 25
  },
  titleText: {
      fontSize: 22,
      fontWeight: "bold"
  },
  genresContainer: {
      flexDirection: "row"
  },
  genreText: {
      marginRight: 10
  },
  containerRaiting: {
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    marginTop : 10
  },
  overview: {
    marginHorizontal: 25,
    marginVertical: 10,
    textAlign: "justify"
  }
});
