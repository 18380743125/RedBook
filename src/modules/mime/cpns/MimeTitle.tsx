import React, { RefObject } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import icon_menu from 'assets/icon_menu.png';
import icon_shop_car from 'assets/icon_shop_car.png';
import icon_share from 'assets/icon_share.png';
import { SlideMenuRef } from 'modules/mime/cpns/SlideMenu';

type Props = {
  slideMenuRef: RefObject<SlideMenuRef>;
};

function MimeTitle({ slideMenuRef }: Props) {
  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => {
          slideMenuRef.current?.show();
        }}>
        <Image style={styles.menuImg} source={icon_menu} />
      </TouchableOpacity>
      <View style={{ flex: 1 }} />

      <TouchableOpacity>
        <Image style={[styles.menuImg, styles.rightMenuImg]} source={icon_shop_car} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image style={[styles.menuImg, styles.rightMenuImg]} source={icon_share} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    height: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  menuImg: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  rightMenuImg: {
    marginHorizontal: 12,
    tintColor: 'white',
  },
});

export default MimeTitle;
