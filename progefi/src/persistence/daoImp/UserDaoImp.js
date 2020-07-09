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
    let user = await User.query().catch(error => {
        return error;
    });;
    return user;
  }
  async updateKeepSession(userId, keepSession) {
      console.log("user id")
      console.info(userId)
      console.log("user session")
      console.info(keepSession)
    let updatedUser = await User.query()
      .findById(userId)
      .patch({
        keepSession: keepSession
      }).catch(error => {
            return error;
        });;
    return updatedUser;
  }
}

export default UserDaoImp;
