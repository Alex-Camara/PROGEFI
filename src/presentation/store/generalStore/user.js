import User from "../../models/user";

const user = {
  namespaced: true,
  state: {
    user: new User()
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    reset(state){
      state.user = new User();
    }
  }
};

export default user;
