import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { launchImageLibrary } from 'react-native-image-picker';

import Home from 'modules/home/Home';
import Shop from 'modules/shop/Shop';
import Mime from 'modules/mime/Mime';
import Message from 'modules/message/Message';

import icon_tab_publish from 'assets/icon_tab_publish.png';

const BottomTab = createBottomTabNavigator();

function MainTab() {
  const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const { routes, index } = state;
    const onPublishPress = () => {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 1,
          includeBase64: true,
        },
        res => {
          const { assets } = res;
          if (!assets?.length) return console.log('选择图片失败！');
          const first = assets[0];
          const { uri, width, height, fileSize, fileName, type } = first;
        },
      );
    };
    return (
      <View style={styles.tabBarContainer}>
        {routes.map((route, idx) => {
          const { options } = descriptors[route.key];
          const { title } = options;
          const focus = index === idx;
          if (idx === 2) {
            return (
              <TouchableOpacity style={styles.tabItem} key={title} activeOpacity={0.7} onPress={onPublishPress}>
                <Image style={styles.iconTabPublish} source={icon_tab_publish} />
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              style={styles.tabItem}
              key={title}
              onPress={() => {
                navigation.navigate(route.name);
              }}>
              <Text
                style={{
                  fontSize: focus ? 18 : 16,
                  color: focus ? '#333' : '#999',
                  fontWeight: focus ? 'bold' : 'normal',
                }}>
                {title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <BottomTab.Navigator tabBar={props => <TabBar {...props} />}>
        <BottomTab.Screen name="Home" component={Home} options={{ title: '首页', headerShown: false }} />
        <BottomTab.Screen name="Shop" component={Shop} options={{ title: '购物', headerShown: false }} />
        <BottomTab.Screen name="Publish" component={Shop} options={{ title: '发布', headerShown: false }} />
        <BottomTab.Screen name="Message" component={Message} options={{ title: '消息', headerShown: false }} />
        <BottomTab.Screen name="Mime" component={Mime} options={{ title: '我的', headerShown: false }} />
      </BottomTab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  tabBarContainer: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabItem: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTabPublish: {
    width: 56,
    height: 38,
    resizeMode: 'contain',
  },
});

export default MainTab;
