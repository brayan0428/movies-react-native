import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {IconButton, Modal,  Text} from 'react-native-paper';
import YouTube from 'react-native-youtube';
import {getMoviesVideoApi} from '../api/movies';

export default function ModalVideo({show, setShow, idVideo}) {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    getMoviesVideoApi(idVideo).then((response) => {
      const videos = response.results;
      if (videos.length > 0) {
        const videoInfo = videos.find((v) => v.site === 'YouTube');
        if (videoInfo) {
          setVideo(videoInfo.key);
        }
      }
    });
  }, []);

  return (
    <Modal visible={show} contentContainerStyle={styles.modal}>
      {video ? (
        <YouTube
          videoId={video}
          apiKey="AIzaSyBcpEq6BMlVzHWoA4Jo-PqHgCrtQQh-38k"
          style={{height: 300, alignSelf: 'stretch'}}
        />
      ) : <Text style={styles.text}>No hay video</Text>}
      <IconButton
        icon="close"
        style={styles.close}
        onPress={() => setShow(false)}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#000',
    height: '120%',
    alignItems: 'center',
  },
  close: {
    backgroundColor: '#1ea1f2',
    position: 'absolute',
    bottom: 100,
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  text: {
      fontSize: 22,
      fontWeight:"bold"
  }
});
