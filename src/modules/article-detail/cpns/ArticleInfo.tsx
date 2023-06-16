import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import hairlineWidth = StyleSheet.hairlineWidth;

type Props = {
  detail: Article;
};

function ArticleInfo({ detail }: Props) {
  const tags = detail.tag.map(i => `# ${i}`).join(' ');
  return (
    <>
      <Text style={styles.articleTitleTxt}>{detail.title}</Text>
      <Text style={styles.descTxt}>{detail.desc}</Text>
      <Text style={styles.tagsTxt}>{tags}</Text>
      <Text style={styles.timeAndLocationTxt}>
        {detail.dateTime} {detail.location}
      </Text>
      <View style={styles.line} />
    </>
  );
}

const styles = StyleSheet.create({
  articleTitleTxt: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },
  descTxt: {
    fontSize: 15,
    color: '#666',
    paddingTop: 6,
    paddingHorizontal: 16,
  },
  tagsTxt: {
    fontSize: 15,
    color: '#3050a0',
    marginTop: 6,
    paddingHorizontal: 16,
  },
  timeAndLocationTxt: {
    fontSize: 13,
    color: '#bbb',
    marginVertical: 16,
    marginLeft: 16,
  },
  line: {
    marginHorizontal: 16,
    height: hairlineWidth,
    backgroundColor: '#eee',
  },
});

export default ArticleInfo;
