import Validator from "../../validators/validator";
var validator = new Validator();
const { ipcRenderer } = require("electron");
import Collector from "../../models/collector";
import Vue from "vue";

const collector = {
  namespaced: true,
  state: {
    collectors: [],
    collector: new Collector(),
    // counter to maintain a global variable for collectors code repetition
    codeCounter: 0
  },
  getters: {
    collectorsName: state => {
      let collectors = state.collectors;
      let collectorsName = [];
      for (let i = 0; i < collectors.length; i++) {
        collectorsName.push(collectors[i].name);
      }
      return collectorsName;
    }
  },
  mutations: {
    setCollectors(state, collectors) {
      Vue.set(state, "collectors", collectors);
    },
    setCollector(state, collector) {
      Vue.set(state, "collector", null);
      Vue.set(state, "collector", collector);
    },
    setCollectorCode(state, code) {
      state.collector.setCode(code);
    },
    resetStore(state) {
      Vue.set(state, "collector", null);
      Vue.set(state, "collector", new Collector());
      Vue.set(state, "collectors", []);
    }
  },
  actions: {
    // getCollectors({ commit }, collector) {
    //   if (collector.getName() !== "") {
    //     ipcRenderer.send("getCollectors", collector.getName());
    //     ipcRenderer.once("collectors", (event, receivedCollectors) => {
    //       let newCollectors = [];
    //       for (let i = 0; i < receivedCollectors.length; i++) {
    //         let newCollector = new Collector();
    //         newCollector.setCollector(receivedCollectors[i]);
    //         newCollectors.push(newCollector);
    //       }
    //       commit("setCollectors", newCollectors);
    //     });
    //   } else {
    //     let empty = [];
    //     commit("setCollectors", empty);
    //   }
    // },
    // existingCollector({ commit, dispatch }, collector) {
    //   return new Promise(async resolve => {
    //     let foundCollector = await dispatch(
    //       "checkDuplicateCollector",
    //       collector
    //     );
    //     if (foundCollector || collector.hasOwnProperty("id")) {
    //       resolve(foundCollector);
    //     } else {
    //       resolve(false);
    //     }
    //   });
    // },
    // checkDuplicateCollector({ state }, collector) {
    //   return new Promise(resolve => {
    //     let foundCollector = state.collectors.find(function(element) {
    //       let collectorInCollectors = element.name.toString().toLowerCase();
    //       collector.toString().toLowerCase();
    //       return collectorInCollectors === collector;
    //     });
    //     if (foundCollector) {
    //       resolve(foundCollector);
    //     } else {
    //       resolve(null);
    //     }
    //   });
    // },
    // createCollector({ state }) {
    //   return new Promise(resolve => {
    //     //si el dispositivo ya tiene id, entonces ya existe, solo se regresa el id
    //     if (state.collector.getId() != null) {
    //       resolve(state.collector);
    //     } else {
    //       ipcRenderer.send("createCollector", state.collector);
    //       ipcRenderer.once("collectorCreated", (event, createdCollector) => {
    //         resolve(createdCollector);
    //       });
    //     }
    //   });
    // },
    // Crea el código del colector con base en sus iniciales
    createCollectorCode({ dispatch }, collector) {
      return new Promise(async resolve => {
        let names = collector.getName().split(" ");
        let code = "";
        for (let i = 0; i < names.length; i++) {
          const name = names[i];
          let firstLetter = name.charAt(0);
          code = code + firstLetter.toUpperCase();
        }
        let newCode = await dispatch("verifyDuplicateCode", code);
        resolve(newCode);
      });
    },
    // Verifica si el código del colector no existe ya en la bd
    verifyDuplicateCode({ state, commit, dispatch }, code) {
      return new Promise(resolve => {
        ipcRenderer.send("verifyDuplicateCollectorCode", code);
        ipcRenderer.once("collectorCodeVerified", (event, isCodeDuplicated) => {
          if (isCodeDuplicated) {
            state.codeCounter = state.codeCounter + 1;
            let newCode = code + state.codeCounter;
            dispatch("verifyDuplicateCode", newCode);
          } else {
            state.codeCounter = 0;
            resolve(code);
            commit("datacard/setTempCollectorCode", code, { root: true });
            dispatch("datacard/setCollectorCode", {}, { root: true });
          }
        });
      });
    }
  }
};

export default collector;
