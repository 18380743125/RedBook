import React, { useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { useLocalObservable } from "mobx-react";
import HomeStore from "modules/home/HomeStore";

function Home() {
  const store = useLocalObservable(() => new HomeStore())
  useEffect(() => {
    store.requestHomeList()
  }, [])
  return (
    <View style={styles.root}>
      <Text>首页</Text>
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
  },
});

export default Home;
