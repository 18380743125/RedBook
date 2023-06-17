import { action, observable } from "mobx";
import { request } from 'utils/request';
import Loading from 'components/widget/Loading';

const SIZE = 10;

class ShopStore {
  page = 1;
  @observable goodsList: GoodsSimple[] = [];
  @observable categoryList: GoodsCategory[] = [];
  @observable refreshing = false;

  requestGoodsList = async () => {
    if (this.refreshing) return;
    const params = {
      page: this.page,
      size: SIZE,
    };
    Loading.show();
    try {
      const { data } = await request('goodsList', params);
      if (data?.length) {
        if (this.page === 1) {
          this.goodsList = data;
        } else {
          this.goodsList = [...this.goodsList, ...data];
        }
        this.page++;
      } else {
        if (this.page === 1) this.goodsList = [];
        else {
          // 没有更多了
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      Loading.hide();
    }
  };

  top10Category = async () => {
    try {
      const { data } = await request('top10Category');
      this.categoryList = data || [];
    } catch (e) {
      console.log(e);
    }
  };
}

export default ShopStore;
