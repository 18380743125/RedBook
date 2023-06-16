import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import icon_daily from 'assets/icon_daily.png';
import icon_search from 'assets/icon_search.png';

type Props = {
  tab?: number;
  onTabChanged: (tab: number) => void;
};

function HomeTitle({ tab = 0, onTabChanged }: Props) {
  const [tabIndex, setTabIndex] = useState(1);

  useEffect(() => {
    setTabIndex(tab);
  }, [tab]);

  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.dailyButton}>
        <Image style={styles.icon} source={icon_daily} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          setTabIndex(0);
          onTabChanged(0);
        }}>
        <Text style={tabIndex === 0 ? styles.tabTxtSelected : styles.tabTxt}>关注</Text>
        <View style={tabIndex === 0 ? styles.line : {}} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          setTabIndex(1);
          onTabChanged(1);
        }}>
        <Text style={tabIndex === 1 ? styles.tabTxtSelected : styles.tabTxt}>发现</Text>
        <View style={tabIndex === 1 ? styles.line : {}} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          setTabIndex(2);
          onTabChanged(2);
        }}>
        <Text style={tabIndex === 2 ? styles.tabTxtSelected : styles.tabTxt}>重庆</Text>
        <View style={tabIndex === 2 ? styles.line : {}} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.searchButton}>
        <Image style={styles.icon} source={icon_search} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  dailyButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 12,
    marginRight: 40,
  },
  searchButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
    marginLeft: 40,
  },
  icon: {
    width: 26,
    height: 26,
  },
  tabButton: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabTxt: {
    fontSize: 16,
    color: '#999',
  },
  tabTxtSelected: {
    fontSize: 17,
    color: '#333',
  },
  line: {
    width: 28,
    height: 2,
    backgroundColor: '#ff2442',
    borderRadius: 1,
    position: 'absolute',
    bottom: 6,
  },
});

export default HomeTitle;
