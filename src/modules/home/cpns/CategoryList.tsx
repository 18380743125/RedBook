import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import icon_arrow from 'assets/icon_arrow.png';
import CategoryModal, { CategoryModalRef } from 'modules/home/cpns/CategoryModal';

type Props = {
  categoryList: Category[];
  onCategoryListChanged: (category: Category) => void;
};

function CategoryList({ categoryList, onCategoryListChanged }: Props) {
  const [category, setCategory] = useState<Category | null>(null);

  const modalRef = useRef<CategoryModalRef>(null);

  const myList = categoryList.filter(item => item.isAdd);

  const categoryRef = useRef<ScrollView>(null)

  useEffect(() => {
    setCategory(categoryList?.find(category => category.name === '推荐') || null);
  }, [categoryList]);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} ref={categoryRef} horizontal={true} showsHorizontalScrollIndicator={false}>
        {myList.map(item => (
          <TouchableOpacity
            style={styles.tabItem}
            key={item.name}
            onPress={() => {
              setCategory(item);
              onCategoryListChanged?.(item);
            }}>
            <Text style={item.name === category?.name ? styles.tabItemSelectTxt : styles.tabItemTxt}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.openButton} onPress={() => modalRef.current?.show()}>
        <Image style={styles.openImage} source={icon_arrow} />
      </TouchableOpacity>
      <CategoryModal categoryList={categoryList} ref={modalRef} setCategory={setCategory} categoryRef={categoryRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 1,
  },
  scrollView: {
    flex: 1,
    height: '100%',
  },
  openButton: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openImage: {
    width: 17,
    height: 17,
    transform: [{ rotate: '-90deg' }],
  },
  tabItem: {
    width: 65,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemTxt: {
    fontSize: 16,
    color: '#999',
  },
  tabItemSelectTxt: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default CategoryList;
