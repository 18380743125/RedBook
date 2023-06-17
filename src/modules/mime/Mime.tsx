import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import MimeTitle from 'modules/mime/cpns/MimeTitle';

import icon_mine_bg from '../../assets/icon_mine_bg.png';
import icon_location_info from '../../assets/icon_location_info.png';
import icon_qrcode from '../../assets/icon_qrcode.png';
import icon_add from '../../assets/icon_add.png';
import icon_male from '../../assets/icon_male.png';
import icon_female from '../../assets/icon_female.png';
import icon_setting from '../../assets/icon_setting.png';
import icon_no_note from '../../assets/icon_no_note.webp';
import icon_no_collection from '../../assets/icon_no_collection.webp';
import icon_no_favorate from '../../assets/icon_no_favorate.webp';

function Mime() {
  return (
    <View style={styles.root}>
      <Image style={styles.bgImg} source={icon_mine_bg} />
      <MimeTitle />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  bgImg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 400
  },
});

export default Mime;
