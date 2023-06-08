import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LoginContext } from './loginContext';
import QuickLogin from './cpns/QuickLogin';
import InputLogin from './cpns/InputLogin';

function Login() {
  const [loginType, setLoginType] = useState<'quick' | 'input'>('quick');
  const [check, setCheck] = useState<boolean>(false);

  return (
    <View style={allStyles.root}>
      <LoginContext.Provider value={{ check, setCheck }}>
        {loginType === 'quick' ? (
          <QuickLogin setLoginType={setLoginType} />
        ) : (
          <InputLogin setLoginType={setLoginType} />
        )}
      </LoginContext.Provider>
    </View>
  );
}

const allStyles = StyleSheet.create({
  root: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  main_logo: {
    width: 200,
    height: 115,
    marginTop: 200,
    resizeMode: 'contain',
  },
});

export default Login;
