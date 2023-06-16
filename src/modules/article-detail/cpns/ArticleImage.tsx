import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import { ImageSlider } from 'components/slidePager';

type Props = {
  detail: Article;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function ArticleImage({ detail }: Props) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!detail.images?.length) return;
    const image = detail.images[0];
    Image.getSize(image, (width, height) => {
      const showHeight = SCREEN_WIDTH * (height / width);
      setHeight(showHeight);
    });
  }, [detail.images]);

  const data: any = detail.images.map(i => ({ img: i }));
  if (!detail.images?.length) return null;
  return (
    <View style={{ paddingBottom: 30 }}>
      <ImageSlider
        data={data}
        autoPlay={false}
        closeIconColor="white"
        caroselImageStyle={{ height }}
        indicatorContainerStyle={{ bottom: -40 }}
        inActiveIndicatorStyle={styles.inActiveDot}
        activeIndicatorStyle={styles.activeDot}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  activeDot: {
    width: 6,
    height: 6,
    backgroundColor: '#ff2442',
    borderRadius: 3,
  },
  inActiveDot: {
    width: 6,
    height: 6,
    backgroundColor: '#C0C0C0',
    borderRadius: 3,
  },
});

export default ArticleImage
