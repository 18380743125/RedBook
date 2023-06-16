import { action, flow, observable } from 'mobx';

import { request } from 'utils/request';
import { save } from 'utils/storage';
import Loading from 'components/widget/Loading';

class UserStore {
  @observable userInfo: any;

  @action
  setUserInfo = (info: any) => {
    this.userInfo = info;
  };

  requestLogin = flow(function* (this: UserStore, phone: string, pwd: string) {
    Loading.show();
    const params = {
      name: phone,
      pwd,
    };
    try {
      const { data } = yield request('login', params);
      if (data) {
        this.userInfo = data;
        yield save('userInfo', JSON.stringify(data));
        return true;
      }
      this.userInfo = null;
      return false;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      Loading.hide();
    }
  });
}

export default new UserStore();
