import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import Heart from 'components/Heart';
import Empty from 'components/Empty';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import icon_no_note from 'assets/icon_no_note.webp';
import icon_no_collection from 'assets/icon_no_collection.webp';
import icon_no_favorate from 'assets/icon_no_favorate.webp';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const EMPTY_CONFIG = [
  { icon: icon_no_note, tips: '快去发布今日的好心情吧～' },
  { icon: icon_no_collection, tips: '快去收藏你喜欢的作品吧～' },
  { icon: icon_no_favorate, tips: '喜欢点赞的人运气不会太差哦～' },
];

type Props = {
  tabIndex: number;
  noteList: ArticleSimple[];
  collectionList: ArticleSimple[];
  favorateList: ArticleSimple[];
};

function MimeList({ tabIndex, noteList, collectionList, favorateList }: Props) {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const currentList = [noteList, collectionList, favorateList][tabIndex];

  if (!currentList?.length) {
    const config = EMPTY_CONFIG[tabIndex];
    return <Empty icon={config.icon} tips={config.tips} />;
  }

  const onArticlePress = (item: ArticleSimple) => {
    navigation.push('ArticleDetail', { id: item.id });
  };

  return (
    <View style={styles.listContainer}>
      {currentList.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.item}
            key={`${item.id}-${index}`}
            activeOpacity={0.8}
            onPress={() => onArticlePress(item)}>
            <Image style={styles.itemImg} source={{ uri: item.image }} />
            <Text style={styles.titleTxt}>{item.title}</Text>
            <View style={styles.nameLayout}>
              <Image style={styles.avatarImg} source={{ uri: item.avatarUrl }} />
              <Text style={styles.nameTxt}>{item.userName}</Text>
              <Heart value={item.isFavorite} onValueChanged={(value: boolean) => {}} />
              <Text style={styles.countTxt}>{item.favoriteCount}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },
  item: {
    width: (SCREEN_WIDTH - 18) >> 1,
    backgroundColor: 'white',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
  titleTxt: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 10,
    marginVertical: 4,
  },
  nameLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  nameTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
    flex: 1,
  },
  heart: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  countTxt: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  itemImg: {
    width: (SCREEN_WIDTH - 18) >> 1,
    height: 240,
  },
});

export default MimeList;
