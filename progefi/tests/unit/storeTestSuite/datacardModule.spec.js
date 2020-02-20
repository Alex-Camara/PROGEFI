import Datacard from '@/presentation/models/datacard.js';
const flushPromises = require ('flush-promises');
import datacardState from '@/presentation/store/modelStore/datacard.js';
const mutations = datacardState.mutations;
const actions = datacardState.actions;
const moment = require ('moment');

describe ('collector vuex module', () => {
  let state;

  beforeEach (() => {
    state = {};
  });

  it ('action set collector date', () => {
    let date = new Date ();
    let commit = jest.fn ();
    let formattedDate = moment (date).format ('DD/MM/YYYY');
    let formattedHour = moment (date).format ('HH:mm');
    let valid = {isValid: true, message: null};

    actions.setCollectDate ({commit}, date);

    expect (commit).toHaveBeenCalledWith ('setCollectDate', date);
    expect (commit).toHaveBeenCalledWith ('setCollectDateValid', valid);
    expect (commit).toHaveBeenCalledWith ('setFormattedDate', formattedDate);
    expect (commit).toHaveBeenCalledWith ('setFormattedHour', formattedHour);
  });

  it ('action set datacard code', () => {
    let commit = jest.fn ();
    let catalogueCode = 'IIB-MAM';
    let datacardCountInCatalogue = 5;

    let expectedCode = 'IIB-MAM 00005f'

    actions.setDatacardCode ({commit}, {catalogueCode, datacardCountInCatalogue});
    expect (commit).toHaveBeenCalledWith ('setCode', expectedCode);

  });
});
