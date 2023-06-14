import React, { useEffect, useState } from 'react';
import { Dimensions, Image } from 'react-native';

type Props = {
  uri: string;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function ResizeImage({ uri }: Props) {
  const [height, setHeight] = useState(200);

  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      const showHeight = (((SCREEN_WIDTH - 18) >>> 1) * height) / width;
      setHeight(showHeight);
    });
  }, [uri]);

  return (
    <Image
      style={{
        width: (SCREEN_WIDTH - 18) >>> 1,
        height,
        resizeMode: 'cover',
      }}
      source={{ uri }}
    />
  );
}

export default ResizeImage;
