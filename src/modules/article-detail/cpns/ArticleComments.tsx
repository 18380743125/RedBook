import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import userStore from 'store/UserStore';
import dayjs from 'dayjs';
import Heart from 'components/Heart';

type Props = {
  detail: Article;
};

function ArticleComments({ detail }: Props) {
  const { userInfo } = userStore;

  const count = detail.comments?.length || 0;
  return (
    <>
      <Text style={styles.commentsCountTxt}>{count ? `共 ${count} 条评论` : '暂无评论'}</Text>
      <View style={styles.inputLayout}>
        <Image style={styles.userAvatarImg} source={{ uri: userInfo.avatar }} />
        <TextInput style={styles.commentInput} placeholder="说点什么吧，万一火了呢" placeholderTextColor="#bbb" />
      </View>

      {!!count && (
        <View style={styles.commentsContainer}>
          {detail.comments?.map((item, index) => (
            <View key={index}>
              <View style={styles.commentItem}>
                <Image style={styles.cavatarImg} source={{ uri: item.avatarUrl }} />

                <View style={styles.contentLayout}>
                  <Text style={styles.nameTxt}>{item.userName}</Text>
                  <Text style={styles.messageTxt}>
                    {item.message}
                    <Text style={styles.timeLocationTxt}>
                      {'  ' + dayjs(item.dateTime).format('MM-DD')} {item.location}
                    </Text>
                  </Text>

                  {/* 子级评论 */}
                  {item.children?.map((j, idx) => (
                    <View key={index + idx}>
                      <View style={[styles.commentItem, { marginTop: 12 }]}>
                        <Image style={styles.cavatarImg} source={{ uri: j.avatarUrl }} />

                        <View style={styles.contentLayout}>
                          <Text style={styles.nameTxt}>{j.userName}</Text>
                          <Text style={styles.messageTxt}>
                            {j.message}
                            <Text style={styles.timeLocationTxt}>
                              {'  ' + dayjs(j.dateTime).format('MM-DD')} {j.location}
                            </Text>
                          </Text>
                        </View>

                        <View style={[styles.countLayout]}>
                          <Heart size={16} value={j.isFavorite} />
                          <Text style={styles.fCount}>{j.favoriteCount}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>

                <View style={styles.countLayout}>
                  <Heart size={16} value={item.isFavorite} />
                  <Text style={styles.fCount}>{item.favoriteCount}</Text>
                </View>
              </View>

              <View style={styles.divider} />
            </View>
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  commentsCountTxt: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
    marginLeft: 16,
  },
  inputLayout: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatarImg: {
    width: 34,
    height: 34,
    borderRadius: 17,
    resizeMode: 'cover',
  },
  commentInput: {
    flex: 1,
    height: 34,
    borderRadius: 17,
    marginLeft: 12,
    backgroundColor: '#f0f0f0',
    color: '#333',
    textAlignVertical: 'center',
    paddingVertical: 0,
    paddingHorizontal: 12,
  },
  commentsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  commentItem: {
    width: '100%',
    flexDirection: 'row',
  },
  cavatarImg: {
    width: 36,
    height: 36,
    resizeMode: 'cover',
    borderRadius: 18,
  },
  contentLayout: {
    flex: 1,
    marginHorizontal: 12,
  },
  nameTxt: {
    fontSize: 12,
    color: '#999',
  },
  messageTxt: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
  },
  timeLocationTxt: {
    fontSize: 12,
    color: '#bbb',
  },
  countLayout: {
    alignItems: 'center',
  },
  fCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  divider: {
    marginLeft: 50,
    marginRight: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
});

export default ArticleComments;
