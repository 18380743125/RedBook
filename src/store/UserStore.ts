import { flow } from 'mobx';

import { request } from 'utils/request';
import { save } from 'utils/storage';

class UserStore {
  userInfo: any;
  requestLogin = flow(function* (this: UserStore, phone: string, pwd: string) {
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
    }
  });
}

export default new UserStore();
