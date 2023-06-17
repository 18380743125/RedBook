import React, { useEffect, useRef, useState } from 'react';
import { Image, LayoutAnimation, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import icon_search from 'assets/icon_search.png';
import icon_arrow from 'assets/icon_arrow.png';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

function SearchGoods() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [showBack, setShowBack] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      inputRef.current?.focus();
      setShowBack(true);
    }, 100);
  }, []);

  const onBackPress = () => {
    LayoutAnimation.easeInEaseOut();
    setShowBack(false);
    inputRef.current?.blur();
    setTimeout(() => {
      navigation.goBack();
    }, 10);
  };

  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
      <View style={styles.layout}>
        {showBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Image style={styles.backImg} source={icon_arrow} />
          </TouchableOpacity>
        )}
        <View style={styles.searchLayout}>
          <Image style={styles.searchIcon} source={icon_search} />
          <TextInput style={styles.searchInput} ref={inputRef} placeholder="bm吊带" placeholderTextColor="#999" />
        </View>
        <Text style={[styles.searchTxt, { fontSize: 16, width: 46 }]}>搜索</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  searchLayout: {
    height: 38,
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
  },
  searchIcon: {
    width: 18,
    height: 18,
  },
  searchTxt: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  backButton: {
    height: '100%',
    paddingLeft: 16,
    paddingRight: 8,
    justifyContent: 'center',
  },
  backImg: {
    width: 22,
    height: 22,
    resizeMode: 'cover',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 15,
    color: '#333',
  },
});

export default SearchGoods;
