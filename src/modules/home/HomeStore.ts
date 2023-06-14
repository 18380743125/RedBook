import { request } from 'utils/request';
import { action, observable } from 'mobx';

const SIZE = 10;

class HomeStore {
  page = 1;
  @observable homeList: ArticleSimple[] = [];
  @observable refreshing = false;
  @observable hasMore = true

  @action
  resetPage = () => {
    this.page = 1;
    this.hasMore = true
  };

  requestHomeList = async () => {
    if (this.refreshing) return;
    this.refreshing = true;
    const params = {
      page: this.page,
      size: SIZE,
    };
    try {
      const { data } = await request('homeList', params);
      if (data?.length) {
        if (this.page === 1) this.homeList = data;
        else this.homeList = [...this.homeList, ...data];
        this.page++
      } else {
        // 数据为空
        if (this.page === 1) this.homeList = [];
        else {
          // 没有更多数据了
          this.hasMore = false
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.refreshing = false;
    }
  };
}

export default HomeStore;
