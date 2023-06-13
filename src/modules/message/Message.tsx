import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Message() {
  return (
    <View style={styles.root}>
      <Text>Message</Text>
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

export default Message;
