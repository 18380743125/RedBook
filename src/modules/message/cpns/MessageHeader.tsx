import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import icon_star from 'assets/icon_star.png';
import icon_new_follow from 'assets/icon_new_follow.png';
import icon_comments from 'assets/icon_comments.png';

type Props = {
  unRead: UnRead;
};

function MessageHeader({ unRead }: Props) {
  const UnRead = ({ count }: { count: number }) => {
    return <Text style={styles.countTxt}>{count > 99 ? '99+' : count}</Text>;
  };

  return (
    <View style={styles.root}>
      <View style={styles.item}>
        <View>
          <Image style={styles.itemImg} source={icon_star} />
          {unRead?.unreadFavorate && <UnRead count={unRead.unreadFavorate} />}
        </View>
        <Text style={styles.itemTxt}>赞和收藏</Text>
      </View>

      <View style={styles.item}>
        <View>
          <Image style={styles.itemImg} source={icon_new_follow} />
          {unRead?.newFollow && <UnRead count={unRead.newFollow} />}
        </View>
        <Text style={styles.itemTxt}>新增关注</Text>
      </View>

      <View style={styles.item}>
        <View>
          <Image style={styles.itemImg} source={icon_comments} />
          {unRead?.comment && <UnRead count={unRead.comment} />}
        </View>
        <Text style={styles.itemTxt}>评论和@</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  itemImg: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
  itemTxt: {
    fontSize: 15,
    color: '#333',
    marginTop: 8,
  },
  countTxt: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: '#ff2442',
    width: 32,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    color: 'white',
  },
});

export default MessageHeader;
