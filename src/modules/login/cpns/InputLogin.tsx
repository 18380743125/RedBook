import React, { useContext, useState } from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { LoginContext } from '../loginContext';
import { formatPhone, replaceBlank } from 'utils/string-util';
import userStore from 'store/UserStore';

import Protocol from './Protocol';

import icon_triangle from 'assets/icon_triangle.png';
import icon_eye_open from 'assets/icon_eye_open.png';
import icon_eye_close from 'assets/icon_eye_close.png';
import icon_exchange from 'assets/icon_exchange.png';
import icon_wx from 'assets/icon_wx.png';
import icon_qq from 'assets/icon_qq.webp';
import icon_close_modal from 'assets/icon_close_modal.png';

type Props = {
  setLoginType: (type: 'quick' | 'input') => void;
};

function InputLogin({ setLoginType }: Props) {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { check, setCheck } = useContext(LoginContext);
  const [eyeOpen, setEyeOpen] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const canLogin = phone.length === 13 && password.length > 5;

  const onLoginPress = async () => {
    if(!check) {
      return ToastAndroid.show('请勾选用户协议', ToastAndroid.LONG);
    }
    const flag = await userStore.requestLogin(replaceBlank(phone), password);
    if (flag) navigation.replace('MainTab');
    else ToastAndroid.show('登录失败，请检查用户名和密码', ToastAndroid.LONG);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.pwdLogin}>密码登录</Text>
      <Text style={styles.tip}>未注册的手机号登录成功后将自动注册</Text>
      <View style={styles.phoneLayout}>
        <Text style={styles.pre86}>+86</Text>
        <Image style={styles.triangle} source={icon_triangle} />
        <TextInput
          style={styles.phoneInput}
          keyboardType="number-pad"
          placeholderTextColor="#bbb"
          placeholder="请输入手机号码"
          autoFocus={false}
          maxLength={13}
          value={phone}
          onChangeText={text => {
            setPhone(formatPhone(text, phone));
          }}
        />
      </View>

      <View style={styles.pwdLayout}>
        <TextInput
          style={[styles.phoneInput, styles.pwdInput]}
          keyboardType="number-pad"
          secureTextEntry={!eyeOpen}
          placeholderTextColor="#bbb"
          placeholder="请输入密码"
          autoFocus={false}
          maxLength={18}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => {
            setEyeOpen(!eyeOpen);
          }}>
          <Image style={styles.icon_eye} source={eyeOpen ? icon_eye_open : icon_eye_close} />
        </TouchableOpacity>
      </View>

      <View style={styles.changeLayout}>
        <Image style={styles.icon_exchange} source={icon_exchange} />
        <Text style={styles.codeLoginTxt}>验证码登录</Text>
        <Text style={styles.forgetPwdTxt}>忘记密码?</Text>
      </View>

      <TouchableOpacity
        style={canLogin ? styles.loginButton : [styles.loginButton, styles.loginButtonDisable]}
        activeOpacity={canLogin ? 0.7 : 1}
        onPress={onLoginPress}>
        <Text style={styles.loginTxt}>登录</Text>
      </TouchableOpacity>

      <Protocol check={check} setCheck={setCheck} />

      <View style={styles.wxQQLayout}>
        <Image style={styles.icon_wx} source={icon_wx} />
        <Image style={styles.icon_qq} source={icon_qq} />
      </View>

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
          setLoginType('quick');
        }}>
        <Image style={styles.closeImg} source={icon_close_modal} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 46,
  },
  pwdLogin: {
    fontSize: 26,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 56,
  },
  tip: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 8,
  },
  phoneLayout: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 28,
  },
  pre86: {
    fontSize: 22,
    color: '#bbb',
  },
  triangle: {
    width: 12,
    height: 6,
    marginLeft: 4,
  },
  phoneInput: {
    flex: 1,
    height: 60,
    backgroundColor: 'transparent',
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize: 18,
    color: '#333',
    marginLeft: 8,
  },
  pwdLayout: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 8,
  },
  pwdInput: {
    marginLeft: 0,
    marginRight: 16,
  },
  icon_eye: {
    width: 24,
    height: 24,
  },
  changeLayout: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon_exchange: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
  codeLoginTxt: {
    fontSize: 14,
    color: '#303080',
    flex: 1,
  },
  forgetPwdTxt: {
    fontSize: 14,
    color: '#303080',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#ff2442',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  loginButtonDisable: {
    backgroundColor: '#ddd',
  },
  loginTxt: {
    fontSize: 20,
    color: 'white',
  },
  wxQQLayout: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
  },
  icon_wx: {
    width: 56,
    height: 56,
    marginRight: 40,
  },
  icon_qq: {
    width: 56,
    height: 56,
    marginLeft: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 24,
    left: 36,
  },
  closeImg: {
    width: 26,
    height: 26,
  },
});

export default InputLogin;
