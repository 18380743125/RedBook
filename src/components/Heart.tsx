import { Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';

import icon_heart from 'assets/icon_heart.png';
import icon_heart_empty from 'assets/icon_heart_empty.png';
import { useEffect, useRef, useState } from 'react';
import React from 'react';

type Props = {
  value: boolean;
  size?: number;
  onValueChanged?: (value: boolean) => void;
};

function Heart({ value, size = 16, onValueChanged }: Props) {
  const [isFavorite, setIsFavorite] = useState(value);

  const scale = useRef(new Animated.Value(0)).current;
  const alpha = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsFavorite(value);
  }, []);

  const heartPress = () => {
    setIsFavorite(!isFavorite);
    onValueChanged?.(!isFavorite);
    if (!isFavorite) {
      alpha.setValue(1);
      const scaleAnim = Animated.timing(scale, {
        toValue: 1.6,
        duration: 300,
        useNativeDriver: false,
      });
      const alphaAnim = Animated.timing(alpha, {
        toValue: 0,
        duration: 400,
        delay: 100,
        useNativeDriver: false,
      });

      Animated.parallel([scaleAnim, alphaAnim]).start();
    } else {
      scale.setValue(0);
      alpha.setValue(0);
    }
  };

  return (
    <TouchableOpacity onPress={heartPress}>
      <Image
        style={[styles.iconHeart, size ? { width: size, height: size } : {}]}
        source={isFavorite ? icon_heart : icon_heart_empty}
      />
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size >>> 1,
          borderWidth: size / 20,
          position: 'absolute',
          borderColor: '#ff2442',
          transform: [{ scale }],
          opacity: alpha,
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconHeart: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
});

export default Heart;
