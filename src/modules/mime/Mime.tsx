import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Mime() {
  return (
    <View style={styles.root}>
      <Text>Mime</Text>
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

export default Mime;
