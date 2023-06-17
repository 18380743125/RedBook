import React, { useState, forwardRef, useImperativeHandle, useEffect, useCallback, RefObject } from 'react';
import type { Ref } from 'react';
import { Modal, StyleSheet, View, Dimensions, TouchableOpacity, Image, Text } from 'react-native';

import icon_group from 'assets/icon_group.png';
import icon_create_group from 'assets/icon_create_group.png';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = {};

function FloatMenu({}: Props, ref: Ref<any>) {
  const [visible, setVisible] = useState(false);
  const [y, setY] = useState(100);

  const show = (pageY: number) => {
    setY(pageY);
    setVisible(true);
  };
  const hide = () => setVisible(false);

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  return (
    <Modal transparent={true} visible={visible} statusBarTranslucent={true} animationType="fade" onRequestClose={hide}>
      <TouchableOpacity style={styles.root} onPress={hide}>
        <View style={[styles.content, { position: 'absolute', right: 16, top: y }]}>
          <TouchableOpacity style={styles.menuItem}>
            <Image style={styles.iconMenu} source={icon_group} />
            <Text style={styles.menuTxt}>群聊广场</Text>
          </TouchableOpacity>

          <View style={styles.line} />

          <TouchableOpacity style={styles.menuItem}>
            <Image style={styles.iconMenu} source={icon_create_group} />
            <Text style={styles.menuTxt}>创建群聊</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000030',
  },
  content: {
    width: 160,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    width: '100%',
    paddingLeft: 20,
  },
  iconMenu: {
    width: 28,
    height: 28,
  },
  menuTxt: {
    fontSize: 17,
    color: '#333',
    marginLeft: 10,
  },
  line: {
    marginLeft: 20,
    marginRight: 16,
    height: 1,
    backgroundColor: '#eee',
  },
});

export interface FloatMenuRef {
  show: (pageY: number) => void;
  hide: () => void;
}

export default forwardRef(FloatMenu);
