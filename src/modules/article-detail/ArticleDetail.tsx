import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useLocalStore, observer } from 'mobx-react';

import ArticleDetailStore from 'modules/article-detail/ArticleDetailStore';

import ArticleTitle from 'modules/article-detail/cpns/ArticleTitle';
import ArticleImage from 'modules/article-detail/cpns/ArticleImage';
import ArticleInfo from 'modules/article-detail/cpns/ArticleInfo';
import ArticleComments from 'modules/article-detail/cpns/ArticleComments';
import ArticleBottom from 'modules/article-detail/cpns/ArticleBottom';

type RouteParams = {
  ArticleDetail: {
    id: number;
  };
};

function ArticleDetail() {
  const { params } = useRoute<RouteProp<RouteParams, 'ArticleDetail'>>();
  const { detail, requestArticle } = useLocalStore(() => new ArticleDetailStore());

  useEffect(() => {
    requestArticle(params.id);
  }, []);

  return Object.keys(detail).length ? (
    <View style={styles.root}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <ArticleTitle detail={detail} />
        <ArticleImage detail={detail} />
        <ArticleInfo detail={detail} />
        <ArticleComments detail={detail} />
      </ScrollView>
      <ArticleBottom detail={detail} />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});

export default observer(ArticleDetail);
