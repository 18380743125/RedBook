import React, { useEffect } from 'react';
import { Dimensions, FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { ListRenderItemInfo } from 'react-native';
import { useLocalStore, observer } from 'mobx-react';

import FlowList from 'components/flowlist/FlowList.js'
import ResizeImage from 'components/ResizeImage'

import HomeStore from 'modules/home/HomeStore';
import icon_heart from 'assets/icon_heart.png';
import icon_heart_empty from 'assets/icon_heart_empty.png';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function Home() {
  const store = useLocalStore(() => new HomeStore());
  useEffect(() => {
    store.requestHomeList();
  }, []);

  const refreshData = () => {
    store.resetPage();
    store.requestHomeList();
  };

  const loadMore = () => {
    store.requestHomeList();
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<ArticleSimple>) => {
    return (
      <View style={styles.item}>
        <ResizeImage uri={item.image} />
        <Text style={styles.titleTxt}>{item.title}</Text>
        <View style={styles.nameLayout}>
          <Image style={styles.avatarImage} source={{ uri: item.avatarUrl }} />
          <Text style={styles.nameTxt}>{item.userName}</Text>
          <Image style={styles.heart} source={item.isFavorite ? icon_heart : icon_heart_empty} />
          <Text style={styles.countTxt}>{item.favoriteCount}</Text>
        </View>
      </View>
    );
  };

  const Footer = () => {
    return <Text style={styles.footerTxt}>{store.hasMore ? '' : '没有更多数据'}</Text>;
  };

  return (
    <View style={styles.root}>
      <FlowList
        style={styles.flatList}
        contentContainerStyle={styles.container}
        data={store.homeList}
        renderItem={renderItem}
        ListFooterComponent={<Footer />}
        numColumns={2}
        keyExtractor={(item: ArticleSimple) => item.id + item.title}
        refreshing={store.refreshing}
        onRefresh={refreshData}
        onEndReachedThreshold={0.1}
        onEndReached={loadMore}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  flatList: {
    height: '100%',
    width: '100%',
  },
  container: {
    paddingTop: 6,
  },
  item: {
    width: (SCREEN_WIDTH - 18) >>> 1,
    backgroundColor: 'white',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  titleTxt: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 12,
    marginVertical: 4,
  },
  nameLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  avatarImage: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  nameTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
    flex: 1,
  },
  heart: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  countTxt: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  footerTxt: {
    width: '100%',
    fontSize: 14,
    color: '#999',
    marginVertical: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default observer(Home);
