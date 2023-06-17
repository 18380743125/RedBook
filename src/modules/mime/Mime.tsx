import React, { useEffect, useRef, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalStore, observer } from 'mobx-react';

import MimeTitle from 'modules/mime/cpns/MimeTitle';
import MineStore from 'modules/mime/MimeStore';

import userStore from 'store/UserStore';
import MimeInfo from 'modules/mime/cpns/MimeInfo';
import MimeTabs from 'modules/mime/cpns/MimeTabs';
import MimeList from 'modules/mime/cpns/MimeList';
import SlideMenu, { SlideMenuRef } from 'modules/mime/cpns/SlideMenu';

import icon_mine_bg from '../../assets/icon_mine_bg.png';

import icon_location_info from '../../assets/icon_location_info.png';

function Mime() {
  const store = useLocalStore(() => new MineStore());
  const [bgImgHeight, setBgImgHeight] = useState(0);
  const [tab, setTab] = useState(0);
  const slideMenuRef = useRef<SlideMenuRef>(null);

  useEffect(() => {
    store.requestAll();
  }, []);

  return (
    <View style={styles.root}>
      <Image style={[styles.bgImg, { height: bgImgHeight + 64 }]} source={icon_mine_bg} />
      <ScrollView refreshControl={<RefreshControl refreshing={store.refreshing} onRefresh={store.requestAll} />}>
        <MimeTitle slideMenuRef={slideMenuRef} />
        <MimeInfo setBgImgHeight={setBgImgHeight} userInfo={userStore.userInfo} info={store.info} />
        <MimeTabs
          tab={tab}
          onTabChanged={tab => {
            setTab(tab);
          }}
        />
        <MimeList
          tabIndex={tab}
          noteList={store.noteList}
          collectionList={store.collectionList}
          favorateList={store.favorateList}
        />
      </ScrollView>
      <SlideMenu ref={slideMenuRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  bgImg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 400,
  },
});

export default observer(Mime);
