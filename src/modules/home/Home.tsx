import React, { useEffect, useRef } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from 'react-native';
import type { ListRenderItemInfo } from 'react-native';
import { useLocalStore, observer } from 'mobx-react';

import FlowList from 'components/flowlist/FlowList.js';
import ResizeImage from 'components/ResizeImage';

import HomeStore from 'modules/home/HomeStore';
import Heart from 'components/Heart';
import HomeTitle from 'modules/home/cpns/HomeTitle';

import CategoryList from 'modules/home/cpns/CategoryList';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function Home() {
  const store = useLocalStore(() => new HomeStore());
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    store.requestHomeList();
    store.getCategoryList();
  }, []);

  const refreshData = () => {
    store.resetPage();
    store.requestHomeList();
  };

  const loadMore = () => {
    store.requestHomeList();
  };

  const onTabChanged = (tab: number) => {};

  const onCategoryListChanged = (category: Category) => {
    console.log(category);
  };

  const onArticlePress = (article: ArticleSimple) => {
    navigation.push('ArticleDetail', { id: article.id });
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<ArticleSimple>) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => onArticlePress(item)}>
        <ResizeImage uri={item.image} />
        <Text style={styles.titleTxt}>{item.title}</Text>
        <View style={styles.nameLayout}>
          <Image style={styles.avatarImage} source={{ uri: item.avatarUrl }} />
          <Text style={styles.nameTxt}>{item.userName}</Text>
          <Heart value={item.isFavorite} onValueChanged={value => {}} />
          <Text style={styles.countTxt}>{item.favoriteCount}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const Footer = () => {
    return <Text style={styles.footerTxt}>{store.hasMore ? '' : '没有更多数据'}</Text>;
  };

  return (
    <View style={styles.root}>
      <HomeTitle tab={1} onTabChanged={onTabChanged} />
      <FlowList
        style={styles.flatList}
        contentContainerStyle={styles.container}
        data={store.homeList}
        renderItem={renderItem}
        ListHeaderComponent={
          <CategoryList categoryList={store.categoryList} onCategoryListChanged={onCategoryListChanged} />
        }
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
    // paddingTop: 6
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
