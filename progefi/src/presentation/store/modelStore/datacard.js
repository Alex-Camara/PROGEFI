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
    setVegetationType({ state, commit }, vegetationType) {
      if (!vegetationType.hasOwnProperty("id")) {
        let newVegetationType = new VegetationType();
        newVegetationType.setValid({ isValid: true, message: null });
        newVegetationType.setName(vegetationType.name);
        newVegetationType.valid = { isValid: true, message: null };
        state.datacard.getCollect().setVegetationType(newVegetationType);
        commit("setDatacard", state.datacard);
      } else {
        vegetationType.setValid({ isValid: true, message: null });
        state.datacard.getCollect().setVegetationType(vegetationType);
        commit("setDatacard", state.datacard);
      }
    },
    setClimateType({ state }, climateType) {
      if (!climateType.hasOwnProperty("id")) {
        let newClimateType = new ClimateType();
        newClimateType.setValid({ isValid: true, message: null });
        newClimateType.setCode(climateType.code);
        state.datacard.getCollect().setClimateType(newClimateType);
        // commit("setDatacard", state.datacard);
      } else {
        climateType.setValid({ isValid: true, message: null });
        state.datacard.getCollect().setClimateType(climateType);
        // commit("setDatacard", state.datacard);
      }
    },
    setLifeStage({ state, commit }, lifeStage) {
      if (!lifeStage.hasOwnProperty("id")) {
        let newLifeStage = new LifeStage();
        newLifeStage.setValid({ isValid: true, message: null });
        newLifeStage.setName(lifeStage.name);
        newLifeStage.valid = { isValid: true, message: null };
        state.datacard
          .getCollect()
          .getSpecimen()
          .setLifeStage(newLifeStage);
        commit("setDatacard", state.datacard);
      } else {
        lifeStage.setValid({ isValid: true, message: null });
        state.datacard
          .getCollect()
          .getSpecimen()
          .setLifeStage(lifeStage);
        commit("setDatacard", state.datacard);
      }
    },
    setSex({ state, commit }, sex) {
      if (!sex.hasOwnProperty("id")) {
        let newSex = new Sex();
        newSex.setValid({ isValid: true, message: null });
        newSex.setName(sex.name);
        newSex.valid = { isValid: true, message: null };
        state.datacard
          .getCollect()
          .getSpecimen()
          .setSex(newSex);
        commit("setDatacard", state.datacard);
      } else {
        sex.setValid({ isValid: true, message: null });
        state.datacard
          .getCollect()
          .getSpecimen()
          .setSex(sex);
        commit("setDatacard", state.datacard);
      }
    },
    // Se general el código de la ficha con base en el código del catálogo y la cuenta actual de fichas
    // en ese catálogo
    // setDatacardCode({ commit }, { catalogueCode, datacardCountInCatalogue }) {
    //   let codeWithZeroes = datacardCountInCatalogue.toString().padStart(5, "0");
    //   codeWithZeroes = codeWithZeroes + "f";
    //   let datacardCode = catalogueCode + " " + codeWithZeroes;
    //   commit("setCode", datacardCode);
    // },
    // async setCollector({ state, commit, dispatch }, collector) {
    //   return new Promise(async resolve => {
    //     //SI EL COLECTOR YA ES UN OBJETO REGISTRADO
    //     if (collector.hasOwnProperty("id")) {
    //       collector.valid = { isValid: true, message: null };
    //       state.datacard.getCollect().setCollector(collector);
    //       commit("setDatacard", state.datacard);
    //       commit("setTempCollectorCode", collector.getCode());
    //       dispatch("setCollectorCode");
    //       resolve(collector);
    //     } else {
    //       //SI EL NOMBRE INTRODUCIDO DEL COLECTOR PERTENECE A UN OBJETO REGISTRADO
    //       let existingCollector = await Collector.getExisting(collector)
    //       if (existingCollector.length > 0) {
    //         existingCollector.setValid = { isValid: true, message: null };
    //         state.datacard.getCollect().setCollector(existingCollector);
    //         commit("setDatacard", state.datacard);
    //         commit("setTempCollectorCode", existingCollector.getCode());
    //         dispatch("setCollectorCode");
    //         resolve(existingCollector);
    //       } else {
    //         //SI ES UN COLECTOR NUEVO SE VALIDA
    //         let newCollector = state.datacard.getCollect().getCollector();
    //         await newCollector.setName(collector);
    //         // dispatch("collector/getCollectors", newCollector, { root: true });
    //         await newCollector.generateCode();
    //         state.datacard.getCollect().setCollector(newCollector);
    //         commit("datacard/setTempCollectorCode", newCollector.getCode(), {
    //           root: true
    //         });
    //         dispatch("datacard/setCollectorCode", {}, { root: true });
    //         resolve(newCollector);
    //       }
    //     }
    //   });
    // },
    // setDevice({ state, commit, dispatch }, device) {
    //   return new Promise(async resolve => {
    //     //SI EL DISPOSITIVO YA ES UN OBJETO REGISTRADO
    //     if (device.hasOwnProperty("id")) {
    //       device.valid = { isValid: true, message: null };
    //       state.datacard
    //         .getCollect()
    //         .getModel()
    //         .setDevice(device);
    //       // commit("setDatacard", state.datacard);
    //       dispatch("setModel", state.datacard.getCollect().getModel());
    //       resolve(device);
    //     } else {
    //       //SI EL NOMBRE INTRODUCIDO DEL DISPOSITIVO PERTENECE A UN OBJETO REGISTRADO
    //       let existingDevice = await Device.getExisting(device)
    //       if (existingDevice) {
    //         existingDevice.setValid = { isValid: true, message: null };
    //         state.datacard
    //           .getCollect()
    //           .getModel()
    //           .setDevice(existingDevice);
    //         // commit("setDatacard", state.datacard);
    //         dispatch("setModel", state.datacard.getCollect().getModel());
    //         resolve(existingDevice);
    //       } else {
    //         //SI ES UN COLECTOR NUEVO SE VALIDA
    //         let newDevice = new Device();
    //         await newDevice.setName(device);
    //         state.datacard
    //           .getCollect()
    //           .getModel()
    //           .setDevice(newDevice);
    //         // commit("setDatacard", state.datacard);
    //         resolve(newDevice);
    //       }
    //     }
    //   });
    // },
    // async setModel({ state, commit, dispatch }, model) {
    //   //Para que no se pierda el valor de device
    //   // let device = state.datacard
    //   //   .getCollect()
    //   //   .getModel()
    //   //   .getDevice();
    //   //SI EL DISPOSITIVO YA ES UN OBJETO REGISTRADO
    //   if (model.hasOwnProperty("id")) {
    //     model.valid = { isValid: true, message: null };
    //     state.datacard.getCollect().setModel(model);
    //     // state.datacard
    //     //   .getCollect()
    //     //   .getModel()
    //     //   .setDevice(device);
    //     // commit("setDatacard", state.datacard);
    //   } else {
    //     //SI EL NOMBRE INTRODUCIDO DEL DISPOSITIVO PERTENECE A UN OBJETO REGISTRADO
    //     let device = state.datacard
    //       .getCollect()
    //       .getModel()
    //       .getDevice();
    //     let existingModel = await Model.getExisting(model, device.getId())
    //     if (existingModel) {
    //       existingModel.setValid = { isValid: true, message: null };
    //       state.datacard.getCollect().setModel(existingModel);
    //       // state.datacard
    //       //   .getCollect()
    //       //   .getModel()
    //       //   .setDevice(device);
    //       // commit("setDatacard", state.datacard);
    //     } else {
    //       //SI ES UN COLECTOR NUEVO SE VALIDA
    //       let newModel = state.datacard.getCollect().getModel();
    //       await newModel.setName(model);
    //       state.datacard.getCollect().setModel(newModel);
    //       // state.datacard
    //       //   .getCollect()
    //       //   .getModel()
    //       //   .setDevice(device);
    //       // commit("setDatacard", state.datacard);
    //     }
    //   }
    // },
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
