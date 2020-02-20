const {ipcRenderer} = require ('electron');
var moment = require ('moment');
import Vue from 'vue';
import Datacard from '../../models/datacard';

const datacard = {
  namespaced: true,
  state: {
    datacard: new Datacard (),
    tempCollectorCode: null,
    requiredValues: {
      collectDate: true,
    },
  },
  mutations: {
    setTempCollectorCode (state, code) {
      state.tempCollectorCode = code;
    },
    setCollectDate (state, collectDate) {
      state.datacard.setCollectDate (null);
      state.datacard.setCollectDate (collectDate);
    },
    setCollectDateValid (state, valid) {
      state.datacard.setCollectDateValid (valid);
    },
    setFormattedDate (state, formattedDate) {
      state.datacard.setFormattedDate (formattedDate);
    },
    setFormattedHour (state, formattedHour) {
      state.datacard.setFormattedHour (formattedHour);
    },
    setCode (state, code) {
      state.datacard.setCode (code);
    },
    setCatalogueId (state, catalogueId) {
      state.datacard.setCatalogueId (catalogueId);
    },
    setCollectorId (state, collectorId) {
      state.datacard.setCollectorId (collectorId);
    },
    setLatitude (state, latitude) {
      state.datacard.setLatitude (latitude);
    },
    setLongitude (state, longitude) {
      state.datacard.setLongitude (longitude);
    },
    setAltitude (state, altitude) {
      state.datacard.setAltitude (altitude);
    },
    setCountry (state, country) {
      state.datacard.setCountry (country);
    },
    setCountryState (state, countryState) {
      state.datacard.setCountryState (countryState);
    },
    setMunicipality (state, municipality) {
      state.datacard.setMunicipality (municipality);
    },
    setLocality (state, locality) {
      state.datacard.setLocality (locality);
    },
    setProjectId (state, projectId) {
      state.datacard.setProjectId (projectId);
    },
    setClimateType (state, climateType) {
      state.datacard.setClimateType (climateType);
    },
    setClimateTypeId (state, climateTypeId) {
      state.datacard.setClimateTypeId (climateTypeId);
    },
    setVegetationType (state, vegetationType) {
      state.datacard.setVegetationType (vegetationType);
    },
    setVegetationTypeId (state, vegetationTypeId) {
      state.datacard.setVegetationTypeId (vegetationTypeId);
    },
    setLifeStage (state, lifeStage) {
      state.datacard.setLifeStage (lifeStage);
    },
    setLifeStageId (state, lifeStageId) {
      state.datacard.setLifeStageId (lifeStageId);
    },
    setSex (state, sex) {
      state.datacard.setSex (sex);
    },
    setSexId (state, sexId) {
      state.datacard.setSexId (sexId);
    },
    setScientificName (state, scientificName) {
      state.datacard.setScientificName (scientificName);
    },
    setCommonName (state, commonName) {
      state.datacard.setCommonName (commonName);
    },
    setGenus (state, genus) {
      state.datacard.setGenus (genus);
    },
    setFamily (state, family) {
      state.datacard.setFamily (family);
    },
    setOrder (state, order) {
      state.datacard.setOrder (order);
    },
    setPhylum (state, phylum) {
      state.datacard.setPhylum (phylum);
    },
    setSpeciesClass (state, speciesClass) {
      state.datacard.setSpeciesClass (speciesClass);
    },
    setKingdom (state, kingdom) {
      state.datacard.setKingdom (kingdom);
    },
    setObservations (state, observations) {
      state.datacard.setObservations (observations);
    },
    setCollectorCode (state, code) {
      state.datacard.setCollectorCode (code);
    },
    resetStore (state) {
      Vue.set (state, 'datacard', new Datacard ());
    },
  },
  actions: {
    getDatacards ({commit}, catalogueId) {
      ipcRenderer.send ('getDatacards', catalogueId);
      ipcRenderer.on ('datacards', (event, count) => {
        count++;
        count = count.toString ().padStart (4, '0');
        let code = state.tempCollectorCode + ' ' + count;
        commit ('setCollectorCode', code);
      });
    },
    setObservations (state, observations) {
      state.datacard.setObservations (observations);
    },
    setCollectDate ({commit}, collectDate) {
      commit ('setCollectDate', collectDate);
      commit ('setCollectDateValid', {isValid: true, message: null});

      let formattedDate = moment (collectDate).format ('DD/MM/YYYY');
      let formattedHour = moment (collectDate).format ('HH:mm');

      commit ('setFormattedDate', formattedDate);
      commit ('setFormattedHour', formattedHour);
    },
    setCollectHour ({state, dispatch}, collectHour) {
      let collectDate = moment (state.datacard.getCollectDate ());
      collectHour = moment (collectHour).format ('HH:mm');
      collectHour = collectHour.split (':', 2);
      let hour = collectHour[0];
      let minutes = collectHour[1];
      collectDate = collectDate.set ({h: hour, m: minutes});
      collectDate = moment (collectDate).toDate ();
      dispatch ('setCollectDate', collectDate);
    },
    setCollectorCode({state, commit}) {
      if (state.datacard.getCollectorId () != null) {
        ipcRenderer.send (
          'getDatacardsCountByCollector',
          state.datacard.getCollectorId (),
          state.datacard.getCatalogueId ()
        );
        ipcRenderer.on ('datacardsCountByCollector', (event, count) => {
          count++;
          count = count.toString ().padStart (4, '0');
          let code = state.tempCollectorCode + ' ' + count;
          commit ('setCollectorCode', code);
        });
      } else {
        let code = state.tempCollectorCode + ' 0001';
        commit ('setCollectorCode', code);
      }
    },
    // Se general el código de la ficha con base en el código del catálogo y la cuenta actual de fichas
    // en ese catálogo
    setDatacardCode ({commit}, {catalogueCode, datacardCountInCatalogue}) {
      let codeWithZeroes = datacardCountInCatalogue
        .toString ()
        .padStart (5, '0');
      codeWithZeroes = codeWithZeroes + 'f';
      let datacardCode = catalogueCode + ' ' + codeWithZeroes;
      commit ('setCode', datacardCode);
    },
    createDatacard ({}, datacard) {
      return new Promise ((resolve, reject) => {
        ipcRenderer.send ('createDatacard', datacard);
        ipcRenderer.on ('datacardCreated', event => {
          resolve ();
        });
      });
    },
  },
};

export default datacard;
