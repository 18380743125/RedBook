import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import icon_arrow from 'assets/icon_arrow.png';
import icon_share from 'assets/icon_share.png';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  detail: Article;
};

function ArticleTitle({ detail }: Props) {
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <View style={styles.titleLayout}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image style={styles.backImg} source={icon_arrow} />
      </TouchableOpacity>
      <Image style={styles.avatarImg} source={{ uri: detail.avatarUrl }} />
      <Text style={styles.userNameTxt}>{detail.userName}</Text>
      <TouchableOpacity>
        <Text style={styles.followTxt}>关注</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={styles.shareImg} source={icon_share} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titleLayout: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
  backImg: {
    width: 20,
    height: 20,
  },
  avatarImg: {
    height: 36,
    width: 36,
    resizeMode: 'cover',
    borderRadius: 18,
  },
  userNameTxt: {
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  followTxt: {
    paddingHorizontal: 16,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ff2442',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    color: '#ff2442',
  },
  shareImg: {
    width: 28,
    height: 28,
    paddingHorizontal: 16,
    marginRight: 16,
    marginLeft: 8,
  },
});

export default ArticleTitle;
