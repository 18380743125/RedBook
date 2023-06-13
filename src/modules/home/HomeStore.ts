import { request } from 'utils/request';

const SIZE = 10
class HomeStore {
  page = 1
  size = 10
  requestHomeList = async () => {
    const params = {
      page: this.page,
      size: SIZE
    }
    try {
      const { data } = await request('homeList', params);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
}

export default HomeStore
