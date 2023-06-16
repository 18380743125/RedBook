import { request } from 'utils/request';
import { action, observable } from 'mobx';
import { load } from 'utils/storage';
import Loading from 'components/widget/Loading';

const SIZE = 10;

class HomeStore {
  page = 1;
  @observable homeList: ArticleSimple[] = [];
  @observable refreshing = false;
  @observable hasMore = true;
  @observable categoryList: Category[] = [];

  @action
  resetPage = () => {
    this.page = 1;
    this.hasMore = true;
  };

  requestHomeList = async () => {
    if (this.refreshing) return;
    this.refreshing = true;
    // Loading.show();
    const params = {
      page: this.page,
      size: SIZE,
    };
    try {
      const { data } = await request('homeList', params);
      if (data?.length) {
        if (this.page === 1) this.homeList = data;
        else this.homeList = [...this.homeList, ...data];
        this.page++;
      } else {
        // 数据为空
        if (this.page === 1) this.homeList = [];
        else {
          // 没有更多数据了
          this.hasMore = false;
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.refreshing = false;
      // Loading.hide();
    }
  };

  getCategoryList = async () => {
    const cacheListStr = await load('categoryList');
    if (cacheListStr) {
      const cacheList = JSON.parse(cacheListStr);
      if (cacheList?.length) this.categoryList = cacheList;
    } else {
      this.categoryList = DEFAULT_CATEGORY_LIST;
    }
  };
}

const DEFAULT_CATEGORY_LIST: Category[] = [
  // 默认添加频道
  { name: '推荐', default: true, isAdd: true },
  { name: '视频', default: true, isAdd: true },
  { name: '直播', default: true, isAdd: true },
  { name: '摄影', default: false, isAdd: true },

  { name: '穿搭', default: false, isAdd: true },
  { name: '读书', default: false, isAdd: true },
  { name: '影视', default: false, isAdd: true },
  { name: '科技', default: false, isAdd: true },

  { name: '健身', default: false, isAdd: true },
  { name: '科普', default: false, isAdd: true },
  { name: '美食', default: false, isAdd: true },
  { name: '情感', default: false, isAdd: true },

  { name: '舞蹈', default: false, isAdd: true },
  { name: '学习', default: false, isAdd: true },
  { name: '男士', default: false, isAdd: true },
  { name: '搞笑', default: false, isAdd: true },

  { name: '汽车', default: false, isAdd: true },
  { name: '职场', default: false, isAdd: true },
  { name: '运动', default: false, isAdd: true },
  { name: '旅行', default: false, isAdd: true },

  { name: '音乐', default: false, isAdd: true },
  { name: '护肤', default: false, isAdd: true },
  { name: '动漫', default: false, isAdd: true },
  { name: '游戏', default: false, isAdd: true },

  // 默认添加频道
  { name: '家装', default: false, isAdd: false },
  { name: '心理', default: false, isAdd: false },
  { name: '户外', default: false, isAdd: false },
  { name: '手工', default: false, isAdd: false },

  { name: '减脂', default: false, isAdd: false },
  { name: '校园', default: false, isAdd: false },
  { name: '社科', default: false, isAdd: false },
  { name: '露营', default: false, isAdd: false },

  { name: '文化', default: false, isAdd: false },
  { name: '机车', default: false, isAdd: false },
  { name: '艺术', default: false, isAdd: false },
  { name: '婚姻', default: false, isAdd: false },

  { name: '家居', default: false, isAdd: false },
  { name: '母婴', default: false, isAdd: false },
  { name: '绘画', default: false, isAdd: false },
  { name: '壁纸', default: false, isAdd: false },

  { name: '头像', default: false, isAdd: false },
];

export default HomeStore;
