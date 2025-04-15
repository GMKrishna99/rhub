import React from 'react';
import {Image, View, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'pinar';

const {width} = Dimensions.get('window');

const ImageCarousel = ({data}) => (
  <Carousel autoplay loop showsControls={false} width={width} height={200}>
    {data.map((uri, index) => (
      <View key={index} style={styles.slide}>
        <Image source={{uri}} style={styles.image} />
      </View>
    ))}
  </Carousel>
);

const styles = StyleSheet.create({
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: 200,
    borderRadius: 10,
  },
});

export default ImageCarousel;
