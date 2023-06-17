import React, { useEffect } from 'react';
import { Dimensions, FlatList, Image, ListRenderItem, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { useLocalStore, observer } from 'mobx-react';
import ShopStore from 'modules/shop/ShopStore';

import ShopTitle from 'modules/shop/cpns/ShopTitle';
import ShopHeader from 'modules/shop/cpns/ShopHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = (SCREEN_WIDTH - 18) >> 1;

function Shop() {
  const store = useLocalStore(() => new ShopStore());
  useEffect(() => {
    store.top10Category();
    store.requestGoodsList();
  }, []);

  const renderItem = ({ item, index }: ListRenderItemInfo<GoodsSimple>) => {
    return (
      <View style={styles.item}>
        <Image style={styles.img} source={{ uri: item.image }} />
        <Text style={styles.titleTxt}>{item.title}</Text>
        {!!item.promotion && <Text style={styles.promotion}>{item.promotion}</Text>}
        <Text style={styles.prefix}>
          ￥<Text style={styles.price}>{item.price}</Text>
          {!!item.originPrice && <Text style={styles.originPrice}> 原价: {item.originPrice}</Text>}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <ShopTitle />
      <FlatList
        style={{ flex: 1 }}
        keyExtractor={item => `${item.id}`}
        data={store.goodsList}
        extraData={[store.categoryList]}
        renderItem={renderItem}
        numColumns={2}
        ListHeaderComponent={<ShopHeader categoryList={store.categoryList} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  item: {
    width: ITEM_WIDTH,
    borderRadius: 8,
    overflow: 'hidden',
    marginLeft: 6,
    marginBottom: 6,
  },
  img: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  titleTxt: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
  },
  prefix: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  originPrice: {
    color: '#999',
    fontSize: 12,
    fontWeight: 'normal',
  },
  promotion: {
    width: 80,
    fontSize: 12,
    color: '#999',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 4,
    marginBottom: 2,
  },
});

export default observer(Shop);
