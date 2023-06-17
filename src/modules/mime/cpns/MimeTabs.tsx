import React, { Ref, useState, forwardRef, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

type Props = {
  tab: number,
  onTabChanged: (a: number) => void
}

function MimeTabs({ tab, onTabChanged}: Props, ref: Ref<any>) {
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    setTabIndex(tab)
  }, [tab])

  return (
    <View style={styles.titleLayout}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          setTabIndex(0);
          onTabChanged(0)
        }}>
        <Text style={tabIndex === 0 ? styles.tabTxtSelected : styles.tabTxt}>笔记</Text>
        {tabIndex === 0 && <View style={styles.line} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          setTabIndex(1);
          onTabChanged(1)
        }}>
        <Text style={tabIndex === 1 ? styles.tabTxtSelected : styles.tabTxt}>收藏</Text>
        {tabIndex === 1 && <View style={styles.line} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          setTabIndex(2);
          onTabChanged(2)
        }}>
        <Text style={tabIndex === 2 ? styles.tabTxtSelected : styles.tabTxt}>赞过</Text>
        {tabIndex === 2 && <View style={styles.line} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titleLayout: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    width: 28,
    height: 28,
  },
  line: {
    width: 28,
    height: 2,
    backgroundColor: '#ff2442',
    borderRadius: 1,
    position: 'absolute',
    bottom: 6,
  },
  tabButton: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  tabTxt: {
    fontSize: 17,
    color: '#999',
  },
  tabTxtSelected: {
    fontSize: 17,
    color: '#333',
  },
});

export default forwardRef(MimeTabs);
