import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function HomeTab() {
  return (
    <View style={styles.root}>
      <Text>HomeTab</Text>
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

export default HomeTab;
