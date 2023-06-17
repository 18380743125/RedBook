import React, { RefObject, useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import icon_group from 'assets/icon_group.png';
import FloatMenu, { FloatMenuRef } from 'modules/message/cpns/FloatMenu';

function MessageTitle() {
  const floatRef = useRef<FloatMenuRef>();

  return (
    <View style={styles.root}>
      <Text style={styles.messageTxt}>消息</Text>
      <TouchableOpacity
        style={styles.groupButton}
        onPress={e => {
          const { pageY } = e.nativeEvent;
          floatRef.current?.show(pageY + 56);
        }}>
        <Image style={styles.iconGroup} source={icon_group} />
        <Text style={styles.groupTxt}>群聊</Text>
      </TouchableOpacity>
      <FloatMenu ref={floatRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageTxt: {
    fontSize: 18,
    color: '#333',
  },
  groupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
  },
  iconGroup: {
    height: 16,
    width: 16,
  },
  groupTxt: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
  },
});

export default MessageTitle;
