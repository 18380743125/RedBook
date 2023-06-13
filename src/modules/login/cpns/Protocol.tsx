import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import icon_selected from 'assets/icon_selected.png';
import icon_unselected from 'assets/icon_unselected.png';

type Props = {
  check: boolean;
  setCheck: (flag: boolean) => void;
};

function Protocol({ check, setCheck }: Props) {
  return (
    <View style={styles.protocolLayout}>
      <TouchableOpacity onPress={() => setCheck(!check)}>
        <Image
          style={styles.radioButton}
          source={check ? icon_selected : icon_unselected}
        />
      </TouchableOpacity>
      <Text style={styles.labelTxt}>我已阅读并同意</Text>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL('https://www.baidu.com').then(() => {});
        }}>
        <Text style={styles.protocolTxt}>《用户协议》和《隐私政策》</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  protocolLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  radioButton: {
    width: 20,
    height: 20,
  },
  labelTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
  },
  protocolTxt: {
    fontSize: 12,
    color: '#1020ff',
  },
});

export default Protocol;
