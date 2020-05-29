"use strict";

import UserDao from "../../persistence/dao/UserDao";

class UserHandler {
  constructor() {
    this.userDao = new UserDao();
  }
  save(user, result) {
    const bcrypt = require("bcrypt");
    const saltRounds = 10;
    let self = this;

    bcrypt.hash(user.password, saltRounds, async function(err, hash) {
      user.hash = hash;
      let savedUser = await self.userDao.save(user);
      result(savedUser);
    });
  }
  async get(result) {
    let user = await this.userDao.get();
    result(user);
  }
  async validateCredentials(user, result) {
    const bcrypt = require("bcrypt");
    let storedUser= await this.userDao.get();
    storedUser = storedUser[0];
    if (storedUser.hasOwnProperty("nativeError")){
      result(storedUser);
    }
    let validUserName = (user.name === storedUser.name);
    if (validUserName) {
      let validPassword = await bcrypt.compare(
          user.password,
        storedUser.hash
      );
      if (validPassword) {
        user.id = storedUser.id;
        user.credentialsValid = true;
        if (user.keepSession){
          await this.userDao.updateKeepSession(user);
        }
        result(user);
      } else {
        user.credentialsValid = false;
        result(user);
      }
    } else {
      user.credentialsValid = false;
      result(user);
    }
  }
}

export default UserHandler;
