"use strict";

import UserDaoImp from "../daoImp/UserDaoImp";

class UserDao {
  constructor() {
    this.userDaoImp = new UserDaoImp();
  }
  save(user) {
    let savedUser = Promise.resolve(this.userDaoImp.save(user));
    return savedUser;
  }
  get() {
    let user = Promise.resolve(this.userDaoImp.get());
    return user;
  }
  updateKeepSession(user){
    let updatedUser = Promise.resolve(this.userDaoImp.updateKeepSession(user));
    return updatedUser;
  }
}

export default UserDao;
