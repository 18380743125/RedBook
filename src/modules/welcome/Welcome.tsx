import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import icon_main_logo from '../../assets/icon_main_logo.png';
import { StackNavigationProp } from '@react-navigation/stack';
import { load } from 'utils/storage';

function Welcome() {
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    const startLogin = () => {
      navigation.replace('Login');
    };
    setTimeout(async () => {
      const cacheUserInfo = await load('userInfo');
      if (cacheUserInfo) {
        return navigation.replace('MainTab');
      } else {
        startLogin();
      }
    }, 3000);
  }, []);

  return (
    <View style={styles.root}>
      <Image style={styles.main_logo} source={icon_main_logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  main_logo: {
    width: 200,
    height: 115,
    marginTop: 200,
    resizeMode: 'contain',
  },
});

export default Welcome;
