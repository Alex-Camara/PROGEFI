import User from "../../models/user";
import Vue from "vue";

const user = {
  namespaced: true,
  state: {
    user: new User()
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  }
};

export default user;
