"use strict";

const User = require("../models/User");

class UserDaoImp {
  constructor() {}
  async save(user) {
    return await User.query()
      .insert({
        name: user.name,
        lastName: user.lastName,
        hash: user.hash
      })
      .catch(error => {
        return error;
      });
  }
  async get() {
    let user = await User.query();
    return user;
  }
  async updateKeepSession(user) {
    let updatedUser = await User.query()
      .findById(user.id)
      .patch({
        keepSession: user.keepSession
      });
    return updatedUser;
  }
}

export default UserDaoImp;
