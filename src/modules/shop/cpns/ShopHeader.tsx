import React from 'react';
import { StyleSheet, View, Text, Image } from "react-native";

type Props = {
  categoryList: GoodsCategory[];
};

function ShopHeader({ categoryList }: Props) {
  return (
    <View style={styles.root}>
      {categoryList.map(item => (
        <View style={styles.item} key={item.id}>
          <Image style={styles.itemImg} source={{uri: item.image}} />
          <Text style={styles.nameTxt}>{item.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '20%',
    alignItems: 'center',
    paddingVertical: 16
  },
  itemImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  nameTxt: {
    fontSize: 14,
    color: '#333',
    marginTop: 6
  }
});

export default ShopHeader;
