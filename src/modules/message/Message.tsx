import React, { RefObject, useEffect, useRef } from 'react';
import { FlatList, Image, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { useLocalStore, observer } from 'mobx-react';
import MessageStore from 'modules/message/MessageStore';

import MessageTitle from 'modules/message/cpns/MessageTitle';
import MessageHeader from 'modules/message/cpns/MessageHeader';
import Empty from 'components/Empty';

import icon_to_top from 'assets/icon_to_top.png';
import icon_no_collection from 'assets/icon_no_collection.webp';

function Message() {
  const store = useLocalStore(() => new MessageStore());

  useEffect(() => {
    store.requestMessageList();
    store.requestUnRead();
  }, []);

  const renderItem = ({ item, index }: ListRenderItemInfo<MessageListItem>) => {
    return (
      <View style={styles.item}>
        <Image style={styles.avatarImg} source={{ uri: item.avatarUrl }} />
        <View style={styles.contentLayout}>
          <Text style={styles.nameTxt}>{item.name}</Text>
          <Text style={styles.lastMessageTxt}>{item.lastMessage}</Text>
        </View>
        <View style={styles.rightLayout}>
          <Text>{item.lastMessageTime}</Text>
          <Image style={styles.iconTop} source={icon_to_top} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <MessageTitle />
      <FlatList
        style={{ flex: 1 }}
        keyExtractor={item => `${item.id}`}
        data={store.messageList}
        extraData={[store.unread]}
        renderItem={renderItem}
        ListHeaderComponent={<MessageHeader unRead={store.unread} />}
        ListEmptyComponent={<Empty icon={icon_no_collection} tips="暂无消息" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  item: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  avatarImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    resizeMode: 'cover',
  },
  contentLayout: {
    flex: 1,
    marginHorizontal: 12,
  },
  nameTxt: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  lastMessageTxt: {
    fontSize: 15,
    color: '#999',
    marginTop: 4,
  },
  rightLayout: {
    alignItems: 'flex-end',
  },
  timeTxt: {
    fontSize: 12,
    color: '#999',
  },
  iconTop: {
    width: 8,
    height: 16,
    marginTop: 6,
    marginRight: 4,
    resizeMode: 'contain',
  },
});

export default observer(Message);
