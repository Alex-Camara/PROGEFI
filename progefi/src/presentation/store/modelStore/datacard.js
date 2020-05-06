import Device from "../../models/device";

const { ipcRenderer } = require("electron");
var moment = require("moment");
import Vue from "vue";
import Datacard from "../../models/datacard";
import VegetationType from "../../models/vegetationType";
import ClimateType from "../../models/climateType";
import LifeStage from "../../models/lifeStage";
import Sex from "../../models/sex";
import Curator from "../../models/curator";
import Model from "../../models/model";
import Collector from "../../models/collector";

const datacard = {
  namespaced: true,
  state: {
    datacard: new Datacard(),
    datacards: [],
    curators: [],
    selectedCurators: [],
    tempCollectorCode: null,
    requiredValues: {
      collectDate: true
    }
  },
  mutations: {
    setDatacard(state, datacard) {
      // debugger;
      Vue.set(state, "datacard", datacard);
    },
    setTempCollectorCode(state, code) {
      state.tempCollectorCode = code;
    },
    setCollectDate(state, collectDate) {
      state.datacard.setCollectDate(null);
      state.datacard.setCollectDate(collectDate);
    },
    setCollectDateValid(state, valid) {
      state.datacard.setCollectDateValid(valid);
    },
    setFormattedDate(state, formattedDate) {
      state.datacard.setFormattedDate(formattedDate);
    },
    setFormattedHour(state, formattedHour) {
      state.datacard.setFormattedHour(formattedHour);
    },
    setCode(state, code) {
      state.datacard.setCode(code);
    },
    setCatalogue(state, catalogue) {
      state.datacard.setCatalogue(catalogue);
    },
    setCollectorCode(state, code) {
      state.datacard.setCollectorCode(code);
    },
    setDatacards(state, datacards) {
      Vue.set(state, "datacards", datacards);
      // debugger;
    },
    async setScientificName(state, scientificName) {
      await state.datacard
        .getCollect()
        .getSpecimen()
        .getSpecies()
        .setScientificName(scientificName);
    },
    setCurators(state, curators) {
      state.datacard.setCurators(curators);
    },
    resetStore(state) {
      Vue.set(state, "datacard", new Datacard());
      Vue.set(state, "datacards", []);
    }
  },
  actions: {
    setCollectDate({ state, commit }, collectDate) {
      let collect = state.datacard.getCollect();
      collect.setCollectDate(collectDate);
      collect.setCollectDateValid({ isValid: true, message: null });
      state.datacard.setCollect(collect);
      commit("setDatacard", state.datacard);
    },
    setCollectHour({ state, dispatch }, collectHour) {
      let collectDate = moment(state.datacard.getCollectDate());
      collectHour = moment(collectHour).format("HH:mm");
      collectHour = collectHour.split(":", 2);
      let hour = collectHour[0];
      let minutes = collectHour[1];
      collectDate = collectDate.set({
        h: hour,
        m: minutes
      });
      collectDate = moment(collectDate).toDate();
      dispatch("setCollectDate", collectDate);
    },
    setCollectorCode({ state, commit }) {
      let collectorId = state.datacard
        .getCollect()
        .getCollector()
        .getId();
      let catalogueId = state.datacard.getCatalogue().getId();
      if (collectorId !== null) {
        ipcRenderer.send(
          "getDatacardsCountByCollector",
          collectorId,
          catalogueId
        );
        ipcRenderer.once("datacardsCountByCollector", (event, count) => {
          count++;
          count = count.toString().padStart(4, "0");
          let code = state.tempCollectorCode + " " + count;
          commit("setCollectorCode", code);
        });
      } else {
        let code = state.tempCollectorCode + " 0001";
        commit("setCollectorCode", code);
      }
    },
    setCatalogue({ state, commit }, catalogue) {
      state.datacard.setCatalogue(catalogue);
      commit("setDatacard", state.datacard);
    },
    async setCurator({ state, commit, dispatch }, curator) {
      //SI EL DISPOSITIVO YA ES UN OBJETO REGISTRADO
      if (curator.hasOwnProperty("id")) {
        curator.valid = { isValid: true, message: null };
        state.datacard.addCurator(curator);
        commit("setDatacard", state.datacard);
      } else {
        //SI EL NOMBRE INTRODUCIDO DEL DISPOSITIVO PERTENECE A UN OBJETO REGISTRADO
        let existingCurator = await dispatch(
          "curator/existingCurator",
          curator,
          { root: true }
        );
        if (existingCurator) {
          existingCurator.setValid = { isValid: true, message: null };
          state.datacard.addCurator(curator);
          commit("setDatacard", state.datacard);
        } else {
          //SI ES UN COLECTOR NUEVO SE VALIDA
          let newCurator = new Curator();
          await newCurator.setName(curator);
          state.datacard.addCurator(curator);
          commit("setDatacard", state.datacard);
        }
      }
    }
  }
};

export default datacard;
