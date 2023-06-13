import React, { useContext } from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { LoginContext } from '../loginContext';
import Protocol from './Protocol';

import icon_arrow from 'assets/icon_arrow.png';
import icon_wx_small from 'assets/icon_wx_small.png';
import main_icon from 'assets/icon_main_logo.png';

type Props = {
  setLoginType: (type: 'quick' | 'input') => void;
};

function QuickLogin({ setLoginType }: Props) {
  const { check, setCheck } = useContext(LoginContext);
  return (
    <View style={styles.root}>
      <Protocol check={check} setCheck={setCheck} />

      <TouchableOpacity
        style={styles.otherLoginBtn}
        activeOpacity={0.6}
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
          setLoginType('input');
        }}>
        <Text style={styles.otherLoginTxt}>其他登录方式</Text>
        <Image style={styles.icon_arrow} source={icon_arrow} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.wxLoginButton} activeOpacity={0.7}>
        <Image style={styles.icon_wx} source={icon_wx_small} />
        <Text style={styles.wxTxt}>微信登录</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.oneKeyLoginButton} activeOpacity={0.7}>
        <Text style={styles.oneKeyLoginTxt}>一键登录</Text>
      </TouchableOpacity>

      <Image style={styles.main_icon} source={main_icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    paddingHorizontal: 56,
  },
  otherLoginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 100,
  },
  otherLoginTxt: {
    fontSize: 14,
    color: '#303080',
  },
  icon_arrow: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginLeft: 6,
    marginTop: 2,
    transform: [{ rotate: '180deg' }],
  },
  wxLoginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#05c160',
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_wx: {
    width: 35,
    height: 35,
  },
  wxTxt: {
    fontSize: 16,
    color: 'white',
    marginLeft: 2,
  },
  oneKeyLoginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#ff2442',
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  oneKeyLoginTxt: {
    fontSize: 16,
    color: 'white',
  },
  main_icon: {
    width: 180,
    height: 95,
    resizeMode: 'contain',
    position: 'absolute',
    top: 160,
  },
});

export default QuickLogin;
