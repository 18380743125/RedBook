import { observable } from 'mobx';
import Loading from 'components/widget/Loading';
import { request } from 'utils/request';

class ArticleDetailStore {
  @observable detail: Article = {} as Article;

  requestArticle = async (id: number) => {
    Loading.show();
    const param = { id };
    try {
      const { data } = await request('articleDetail', param);
      this.detail = data || {};
    } catch (e) {
      console.log(e);
    } finally {
      Loading.hide();
    }
  };
}

export default ArticleDetailStore;
