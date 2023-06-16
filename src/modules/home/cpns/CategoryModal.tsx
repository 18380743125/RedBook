import React, { useState, forwardRef, useImperativeHandle, useEffect, useCallback, RefObject } from 'react';
import type { Ref } from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  LayoutAnimation,
  ScrollView,
} from 'react-native';

import icon_arrow from 'assets/icon_arrow.png';
import icon_delete from 'assets/icon_delete.png';
import { save } from 'utils/storage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = {
  categoryList: Category[];
  setCategory: (category: Category) => void;
  categoryRef: RefObject<ScrollView>;
};

function CategoryModal({ categoryList, setCategory, categoryRef }: Props, ref: Ref<any>) {
  const [visible, setVisible] = useState(false);
  const [myList, setMyList] = useState<Category[]>([]);
  const [otherList, setOtherList] = useState<Category[]>([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const list1 = categoryList.filter(item => item.isAdd);
    const list2 = categoryList.filter(item => !item.isAdd);
    setMyList(list1);
    setOtherList(list2);
  }, [categoryList]);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  const onMyItemPress = useCallback(
    (item: Category, index: number) => {
      if (edit) {
        const newMyList = myList.filter(i => i.name !== item.name);
        const newOtherList = [...otherList, { ...item, isAdd: false }];
        LayoutAnimation.easeInEaseOut();
        setMyList(newMyList);
        setOtherList(newOtherList);
      } else {
        setCategory(item);
        hide();
        categoryRef.current?.scrollTo({ x: index * 65 });
      }
    },
    [edit, myList, otherList, setCategory, categoryRef.current],
  );

  const onOtherItemPress = useCallback(
    (item: Category, index: number) => {
      if (!edit) return;
      const newOtherList = otherList.filter(i => i.name !== item.name);
      const newMyList = [...myList, { ...item, isAdd: true }];
      LayoutAnimation.easeInEaseOut();
      setOtherList(newOtherList);
      setMyList(newMyList);
    },
    [edit, myList, otherList],
  );

  const editPress = async () => {
    setEdit((edit: boolean) => {
      if (edit) {
        save('categoryList', JSON.stringify([...myList, ...otherList]));
        return false;
      } else {
        return true;
      }
    });
  };

  const renderMyList = () => {
    return (
      <>
        <View style={styles.row}>
          <Text style={styles.titleTxt}>我的频道</Text>
          <Text style={styles.subTitleTxt}>点击进入频道</Text>
          <TouchableOpacity style={styles.editButton} onPress={editPress}>
            <Text style={styles.editTxt}>{edit ? '完成编辑' : '进入编辑'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={hide}>
            <Image style={styles.closeImg} source={icon_arrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.listContent}>
          {myList.map((item, index) => (
            <TouchableOpacity
              style={[styles.itemButton, item.default ? styles.itemDefault : {}]}
              key={item.name}
              onPress={() => onMyItemPress(item, index)}>
              <Text style={styles.itemTxt}>{item.name}</Text>
              {edit && !item.default && <Image style={styles.deleteImg} source={icon_delete} />}
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  };

  const renderOtherList = () => {
    return (
      <>
        <View style={[styles.row, { marginTop: 32 }]}>
          <Text style={styles.titleTxt}>推荐频道</Text>
          <Text style={styles.subTitleTxt}>点击添加频道</Text>
        </View>
        <View style={styles.listContent}>
          {otherList.map((item, index) => (
            <TouchableOpacity style={styles.itemButton} key={item.name} onPress={() => onOtherItemPress(item, index)}>
              <Text style={styles.itemTxt}>+ {item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  };

  return (
    <Modal transparent={true} visible={visible} statusBarTranslucent={true} animationType="fade" onRequestClose={hide}>
      <View style={styles.root}>
        <View style={styles.content}>
          {renderMyList()}
          {renderOtherList()}
        </View>
        <View style={styles.mask} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  content: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: 48 + (StatusBar.currentHeight || 0),
    paddingBottom: 40,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 17,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 18,
  },
  subTitleTxt: {
    fontSize: 14,
    color: '#999',
    marginLeft: 16,
    flex: 1,
  },
  editButton: {
    paddingHorizontal: 12,
    height: 28,
    backgroundColor: '#eee',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editTxt: {
    fontSize: 13,
    color: '#3050ff',
  },
  closeButton: {
    padding: 12,
  },
  closeImg: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    transform: [{ rotate: '90deg' }],
  },
  listContent: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemButton: {
    width: (SCREEN_WIDTH - 80) >> 2,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    marginLeft: 16,
    marginTop: 12,
  },
  itemDefault: {
    backgroundColor: '#eee',
    borderWidth: 0,
  },
  itemTxt: {
    fontSize: 16,
    color: '#666',
  },
  deleteImg: {
    width: 14,
    height: 14,
    position: 'absolute',
    top: -6,
    right: -6,
  },
  addImg: {
    width: 14,
    height: 14,
    position: 'absolute',
    top: -6,
    right: -6,
  },
  mask: {
    width: '100%',
    flex: 1,
    backgroundColor: '#00000060',
  },
});

export interface CategoryModalRef {
  show: () => void;
  hide: () => void;
}

export default forwardRef(CategoryModal);
