import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import icon_search from 'assets/icon_search.png';
import icon_shop_car from 'assets/icon_shop_car.png';
import icon_orders from 'assets/icon_orders.png';
import icon_menu_more from 'assets/icon_menu_more.png';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

function ShopTitle() {
  const navigation = useNavigation<StackNavigationProp<any>>()
  const onSearchPress = () => {
    navigation.push('SearchGoods')
  }
  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.searchLayout} onPress={onSearchPress}>
        <Image style={styles.searchIcon} source={icon_search} />
        <Text style={styles.searchTxt}>bm吊带</Text>
      </TouchableOpacity>
      <Image style={styles.menuIcon} source={icon_shop_car} />
      <Image style={styles.menuIcon} source={icon_orders} />
      <Image style={styles.menuIcon} source={icon_menu_more} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchLayout: {
    height: 38,
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  searchIcon: {
    width: 18,
    height: 18,
  },
  searchTxt: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  menuIcon: {
    width: 22,
    height: 22,
    marginHorizontal: 6,
  },
});

export default ShopTitle;
