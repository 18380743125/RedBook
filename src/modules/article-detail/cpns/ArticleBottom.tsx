import React from 'react';
import { StyleSheet, TextInput, View, Image, Text, TouchableOpacity } from 'react-native';
import Heart from 'components/Heart';

import icon_collection from 'assets/icon_collection.png';
import icon_collection_selected from 'assets/icon_collection_selected.png';
import icon_comment from 'assets/icon_comment.png';
import icon_edit_comment from 'assets/icon_edit_comment.png';

type Props = {
  detail: Article;
};

function ArticleBottom({ detail }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.editLayout}>
        <Image style={styles.editImg} source={icon_edit_comment} />
        <TextInput style={styles.bottomCommentInput} placeholder="说点什么" placeholderTextColor={'#333'} />
      </View>
      <Heart size={26} value={detail.isFavorite} />
      <Text style={styles.bottomCount}>{detail.favoriteCount}</Text>

      <TouchableOpacity>
        <Image style={styles.bottomIcon} source={detail.isCollection ? icon_collection_selected : icon_collection} />
      </TouchableOpacity>
      <Text style={styles.bottomCount}>{detail.collectionCount}</Text>

      <Image style={styles.bottomIcon} source={icon_comment} />
      <Text style={styles.bottomCount}>{detail.comments?.length || 0}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  editLayout: {
    height: 40,
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginRight: 12,
  },
  editImg: {
    width: 20,
    height: 20,
    tintColor: '#333',
  },
  bottomCommentInput: {
    height: '100%',
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'center',
    paddingVertical: 0,
  },
  bottomCount: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bottomIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 12,
  },
});

export default ArticleBottom;
