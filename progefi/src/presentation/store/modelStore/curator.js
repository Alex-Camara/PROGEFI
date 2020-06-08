import Vue from "vue";
import Curator from "../../models/curator";

const curator = {
  namespaced: true,
  state: {
    curators: [],
    selectedCurators: [],
    curator: new Curator(),
    selectedCuratorsName: ""
  },
  getters: {
    selectedCuratorsName: state => {
      let curators = state.selectedCurators;
      let curatorsName = [];
      state.selectedCuratorsName = "";
      for (let i = 0; i < curators.length; i++) {
        curatorsName.push(curators[i].getName());
        state.selectedCuratorsName += curators[i].getName() + " | ";
      }

      return curatorsName;
    }
  },
  mutations: {
    setCurators(state, curators) {
      let filteredCurators = [];
      for (let i = 0; i < curators.length; i++) {
        const element = curators[i];
        let foundCurator = state.selectedCurators.find(
          x => x.name === element.getName()
        );
        if (!foundCurator) {
          filteredCurators.push(element);
        }
      }
      state.curators = filteredCurators;
    },
    setCurator(state, curator) {
      Vue.set(state, "curator", null);
      Vue.set(state, "curator", curator);
    },
    addCurator(state) {
      return new Promise((resolve) => {
        state.selectedCurators.push(state.curator);
        resolve()
      })
    },
    deleteCurator(state, curator) {
      return new Promise((resolve) => {
      var index = state.selectedCurators.findIndex(x => x.name === curator);
      state.selectedCurators.splice(index, 1);
        resolve()
      })
    },
    reset(state) {
      Vue.set(state, "curator", new Curator());
      Vue.set(state, "curators", []);
      Vue.set(state, "selectedCurators", []);
      Vue.set(state, "selectedCuratorsName", "");
    }
  },
  actions: {
    async getCurators({ commit }, curator) {
      commit("setCurators", await Curator.getAllByName(curator));

    },
    existingCurator({ state }, curator) {
      return new Promise(async resolve => {
        let foundCurator = state.curators.find(
          x => x.name === curator.name
        );
        if (foundCurator) {
          resolve(foundCurator);
        } else {
          resolve(false);
        }
      });
    },
    //
    async setCurator({ commit, state, dispatch }, curator) {
      if (state.selectedCurators.length > 1) {
        state.curator.setValid({ isValid: false, message: "temporary error" });
        commit("setCurator", state.curator);
        commit("setCurators", []);
        return;
      }

      if (curator.hasOwnProperty("id")) {
        curator.valid = { isValid: true, message: null };
        commit("setCurator", curator);
        dispatch("getCurators", curator.getName());
      } else {
        let existingCurator = await dispatch("existingCurator", curator);
        if (existingCurator) {
          existingCurator.setValid = { isValid: true, message: null };
          commit("setCurator", existingCurator);
          dispatch("getCurators", existingCurator.getName());
        } else {
          let newCurator = new Curator();
          await newCurator.setName(curator);
          commit("setCurator", newCurator);
          dispatch("getCurators", newCurator.getName());
        }
      }
    },
    addCurator({ state, commit }) {
      return new Promise(async (resolve) => {
        let foundCurator = state.selectedCurators.find(function (element) {
          let curatorInCurators = element.name.toString().toLowerCase();
          let curator = state.curator.name.toString().toLowerCase();
          return curatorInCurators === curator;
        });
        //debugger;
        if (!foundCurator) {
          await commit("addCurator");
          commit("setCurator", new Curator());
          commit("setCurators", []);
          resolve(state.selectedCurators);
        } else {
          commit("setCurator", new Curator());
          commit("setCurators", []);
        }
      })
    },
    async deleteCurator({state, commit}, curator) {
      await commit("deleteCurator", curator);
      return state.selectedCurators
    }
  }
};

export default curator;
