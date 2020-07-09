import Collect from "../../models/collect";
import Model from "../../models/model";
import Device from "../../models/device";

const { ipcRenderer } = require("electron");
var moment = require("moment");

const metadata = {
  namespaced: true,
  state: {
    hasMetadata: "",
    collect: new Collect()
  },
  mutations: {
    hasMetadata(state, status) {
      state.hasMetadata = status;
    },
    resetMetadata(state) {
      state.collect = new Collect();
    }
  },
  actions: {
    getImageMetadata({ commit, dispatch }) {
      ipcRenderer.send("getImageMetadata");
      ipcRenderer.on("imageMetadata", (event, arg) => {
        commit("hasMetadata", true);
        commit("addDatacard/hasChanged", false, { root: true });
        dispatch("setMetadata", arg);
      });

      ipcRenderer.on("imageMetadataFailed", () => {
        commit("hasMetadata", false);
        commit("addDatacard/hasChanged", false, { root: true });
      });
    },
    async setMetadata({ state }, arg) {
      if (arg.longitude !== null){
        await state.collect.setLongitude(arg.longitude);
      }
      if (arg.latitude !== null){
        await state.collect.setLatitude(arg.latitude);
      }
      if (arg.altitude !== null){
        await state.collect.setAltitude(arg.altitude);
      }
      if (arg.device !== null){
        let metadataDevice = new Device();
        await metadataDevice.setName(arg.device);
        let metadataModel = new Model();
        await metadataModel.setDevice(metadataDevice);
        await metadataModel.setName(arg.model);
        await state.collect.setModel(metadataModel);

      }
      if (arg.collectHour !== null){
        let date = moment(arg.collectHour).format("YYYY-MM-DD[T]HH:mm:ss");
        date = moment(date).toDate();
        state.collect.setCollectDate(date);
      }
    }
  }
};

export default metadata;
