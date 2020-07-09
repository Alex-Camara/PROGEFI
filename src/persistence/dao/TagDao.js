"use strict";

import TagDaoImp from "../daoImp/TagDaoImp";

class TagDao {
  constructor() {
    this.tagDaoImp = new TagDaoImp();
  }
  save(tag) {
    return Promise.resolve(this.tagDaoImp.save(tag));
  }
}

export default TagDao;
