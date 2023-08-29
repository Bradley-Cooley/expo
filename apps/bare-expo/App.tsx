import { VideoView, useVideoPlayer } from '@expo/video';
import React, { useCallback, useEffect, useRef } from 'react';
import { PixelRatio, ScrollView, StyleSheet, View } from 'react-native';

import Button from 'native-component-list/src/components/Button';

export default function VideoScreen() {
  const ref = useRef<VideoView>(null);

  const enterFullscreen = useCallback(() => {
    ref.current?.enterFullscreen();
  }, [ref]);

  const player = useVideoPlayer(
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  );

  const togglePlayer = useCallback(() => {
    if (player.isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  }, [player]);

  const replaceItem = useCallback(() => {
    player.replace(
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    );
  }, []);

  useEffect(() => {
    player.play();
  }, []);

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <VideoView
        nativeRef={ref}
        style={styles.video}
        player={player}
        nativeControls={false}
        contentFit="contain"
        contentPosition={{ dx: 0, dy: 0 }}
        allowsFullscreen
        canControlPlayback
        volumeControls={false}
        showsTimecodes={false}
        requiresLinearPlayback
      />

      <VideoView
        nativeRef={ref}
        style={styles.video}
        player={player}
        nativeControls
        contentFit="contain"
        contentPosition={{ dx: 0, dy: 0 }}
        allowsFullscreen
        canControlPlayback
        volumeControls={false}
        showsTimecodes={false}
        requiresLinearPlayback
      />

      <View style={styles.buttons}>
        <Button style={styles.button} title="Toggle" onPress={togglePlayer} />
        <Button style={styles.button} title="Replace" onPress={replaceItem} />
        <Button style={styles.button} title="Enter fullscreen" onPress={enterFullscreen} />
      </View>
    </ScrollView>
  );
}
VideoScreen.navigationOptions = {
  title: 'Video',
};

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 50,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 10,
    alignItems: 'center',
  },
  video: {
    width: 400,
    height: 300,
    borderBottomWidth: 1.0 / PixelRatio.get(),
    borderBottomColor: '#cccccc',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    margin: 15,
  },
});
