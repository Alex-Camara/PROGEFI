import Location from '@/presentation/models/location.js';
const flushPromises = require('flush-promises');
import coordinateState from '@/presentation/store/modelStore/coordinate.js';
const mutations = coordinateState.mutations;
const actions = coordinateState.actions;

describe('collector vuex module', () => {
  let state;
  let location = new Location();

  beforeEach(() => {
    state = {
      location,
      requiredValues: {
        longitude: true,
        latitude: true,
        altitude: true,
      },
    };
  });

  it('mutation set location', () => {
    mutations.setLocation(state, location);
    expect(state.location).toBe(location);
  });

  it('mutation set longitude', () => {
    let longitude = 12.121456;
    let isValid = true;
    let message = null;
    location.setLongitude(longitude);
    location.setLongitudeValid({
      isValid: isValid,
      message: message,
    });

    mutations.setLongitude(state, {
      longitude,
      isValid,
      message,
    });
    expect(state.location.getLongitude).toBe(location.getLongitude);
  });

  it('mutation set latitude', () => {
    let latitude = 90.121456;
    let isValid = true;
    let message = null;
    location.setLatitude(latitude);
    location.setLatitudeValid({
      isValid: isValid,
      message: message,
    });

    mutations.setLatitude(state, {
      latitude,
      isValid,
      message,
    });
    expect(state.location.getLatitude).toBe(location.getLatitude);
  });

  it('mutation set altitude', () => {
    let altitude = 2000.344;
    let isValid = true;
    let message = null;
    location.setAltitude(altitude);
    location.setAltitudeValid({
      isValid: isValid,
      message: message,
    });

    mutations.setAltitude(state, {
      altitude,
      isValid,
      message,
    });
    expect(state.location.getAltitude).toBe(location.getAltitude);
  });

  it('reset collector vuex module fields', () => {
    let longitude = 12.121456;
    let latitude = 90.121456;
    let altitude = 2000.344;
    location.setLongitude(longitude);
    location.setLatitude(latitude);
    location.setAltitude(altitude);

    state.location = location;

    mutations.resetStore(state);
    expect(state.location).toStrictEqual(new Location());
  });

  it('action set Latitude correctly', async () => {
    let commit = jest.fn();
    let testValue = 12.88;
    let oldValue = null;
    let testValueName = 'latitude';
    let minLimit = -180;
    let maxLimit = 180;
    let decimalMaxLimit = 999999;
    let isRequired = state.requiredValues.latitude;
    let mutationName = 'setLatitude';

    actions.validate({
      commit,
    }, {
      testValue,
      oldValue,
      testValueName,
      minLimit,
      maxLimit,
      decimalMaxLimit,
      isRequired,
      mutationName,
    });

    await flushPromises();
    let latitudeObject = {
      isValid: true,
      message: null,
      latitude: testValue,
    };
    expect(commit).toHaveBeenCalledWith('setLatitude', latitudeObject);
  });

  it('action set longitude correctly', async () => {
    let commit = jest.fn();
    let testValue = 15.444445;
    let oldValue = null;
    let testValueName = 'longitude';
    let minLimit = -180;
    let maxLimit = 180;
    let decimalMaxLimit = 999999;
    let isRequired = state.requiredValues.longitude;
    let mutationName = 'setLongitude';

    actions.validate({
      commit,
    }, {
      testValue,
      oldValue,
      testValueName,
      minLimit,
      maxLimit,
      decimalMaxLimit,
      isRequired,
      mutationName,
    });

    await flushPromises();
    let longitudeObject = {
      isValid: true,
      message: null,
      longitude: testValue,
    };
    expect(commit).toHaveBeenCalledWith('setLongitude', longitudeObject);
  });

  it('action set altitude correctly', async () => {
    let commit = jest.fn();
    let testValue = 2000.145;
    let oldValue = null;
    let testValueName = 'altitude';
    let minLimit = -100;
    let maxLimit = 8000;
    let decimalMaxLimit = 999999;
    let isRequired = state.requiredValues.altitude;
    let mutationName = 'setAltitude';

    actions.validate({
      commit,
    }, {
      testValue,
      oldValue,
      testValueName,
      minLimit,
      maxLimit,
      decimalMaxLimit,
      isRequired,
      mutationName,
    });

    await flushPromises();
    let altitudeObject = {
      isValid: true,
      message: null,
      altitude: testValue,
    };
    expect(commit).toHaveBeenCalledWith('setAltitude', altitudeObject);
  });

  it('action set altitude, it has not permitted characters', async () => {
    let commit = jest.fn();
    let testValue = 'n';
    let oldValue = '12';
    let testValueName = 'altitude';
    let minLimit = -100;
    let maxLimit = 8000;
    let decimalMaxLimit = 999999;
    let isRequired = state.requiredValues.altitude;
    let mutationName = 'setAltitude';

    actions.validate({
      commit
    }, {
      testValue,
      oldValue,
      testValueName,
      minLimit,
      maxLimit,
      decimalMaxLimit,
      isRequired,
      mutationName,
    });

    await flushPromises();
    let altitudeObject = {
      isValid: true,
      message: 'temporary error',
      altitude: oldValue,
    };
    expect(commit).toHaveBeenCalledWith('setAltitude', altitudeObject);
  });

  it('action set altitude, inferior limit surpassed', async () => {
    let commit = jest.fn();
    let testValue = '-101';
    let oldValue = '12';
    let testValueName = 'altitude';
    let minLimit = -100;
    let maxLimit = 8000;
    let decimalMaxLimit = 999999;
    let isRequired = state.requiredValues.altitude;
    let mutationName = 'setAltitude';

    actions.validate({
      commit
    }, {
      testValue,
      oldValue,
      testValueName,
      minLimit,
      maxLimit,
      decimalMaxLimit,
      isRequired,
      mutationName,
    });

    await flushPromises();
    let altitudeObject = {
      isValid: true,
      message: 'temporary error',
      altitude: oldValue,
    };
    expect(commit).toHaveBeenCalledWith('setAltitude', altitudeObject);
  });

  it('action set altitude, superior limit surpassed', async () => {
    let commit = jest.fn();
    let testValue = '8001';
    let oldValue = '12';
    let testValueName = 'altitude';
    let minLimit = -100;
    let maxLimit = 8000;
    let decimalMaxLimit = 999999;
    let isRequired = state.requiredValues.altitude;
    let mutationName = 'setAltitude';

    actions.validate({
      commit
    }, {
      testValue,
      oldValue,
      testValueName,
      minLimit,
      maxLimit,
      decimalMaxLimit,
      isRequired,
      mutationName,
    });

    await flushPromises();
    let altitudeObject = {
      isValid: true,
      message: 'temporary error',
      altitude: oldValue,
    };
    expect(commit).toHaveBeenCalledWith('setAltitude', altitudeObject);
  });

  it('action set altitude, superior decimal limit surpassed', async () => {
    let commit = jest.fn();
    let testValue = '12.1000000';
    let oldValue = '12';
    let testValueName = 'altitude';
    let minLimit = -100;
    let maxLimit = 8000;
    let decimalMaxLimit = 999999;
    let isRequired = state.requiredValues.altitude;
    let mutationName = 'setAltitude';

    actions.validate({
      commit
    }, {
      testValue,
      oldValue,
      testValueName,
      minLimit,
      maxLimit,
      decimalMaxLimit,
      isRequired,
      mutationName,
    });

    await flushPromises();
    let altitudeObject = {
      isValid: true,
      message: 'temporary error',
      altitude: oldValue,
    };
    expect(commit).toHaveBeenCalledWith('setAltitude', altitudeObject);
  });

  it('action set latitude, it has not permitted characters', async () => {
    let commit = jest.fn();
    let testValue = 'n';
    let oldValue = 12;
    let testValueName = 'latitude';
    let minLimit = -180;
    let maxLimit = 180;
    let decimalMaxLimit = 999999;
    let isRequired = state.requiredValues.latitude;
    let mutationName = 'setLatitude';

    actions.validate({
      commit,
    }, {
      testValue,
      oldValue,
      testValueName,
      minLimit,
      maxLimit,
      decimalMaxLimit,
      isRequired,
      mutationName,
    });

    await flushPromises();
    let latitudeObject = {
      isValid: true,
      message: 'temporary error',
      latitude: oldValue,
    };
    expect(commit).toHaveBeenCalledWith('setLatitude', latitudeObject);
  });

  it('action set latitude, inferior limit surpassed', async () => {
    let commit = jest.fn();
    let testValue = '-181';
    let oldValue = 12;
    let testValueName = 'latitude';
    let minLimit = -180;
    let maxLimit = 180;
    let decimalMaxLimit = 999999;
    let isRequired = state.requiredValues.latitude;
    let mutationName = 'setLatitude';

    actions.validate({
      commit,
    }, {
      testValue,
      oldValue,
      testValueName,
      minLimit,
      maxLimit,
      decimalMaxLimit,
      isRequired,
      mutationName,
    });

    await flushPromises();
    let latitudeObject = {
      isValid: true,
      message: 'temporary error',
      latitude: oldValue,
    };
    expect(commit).toHaveBeenCalledWith('setLatitude', latitudeObject);
  });

  it('action set latitude, superior limit surpassed', async () => {
    let commit = jest.fn();
    let testValue = '181';
    let oldValue = 12;
    let testValueName = 'latitude';
    let minLimit = -180;
    let maxLimit = 180;
    let decimalMaxLimit = 999999;
    let isRequired = state.requiredValues.latitude;
    let mutationName = 'setLatitude';

    actions.validate({
      commit,
    }, {
      testValue,
      oldValue,
      testValueName,
      minLimit,
      maxLimit,
      decimalMaxLimit,
      isRequired,
      mutationName,
    });

    await flushPromises();
    let latitudeObject = {
      isValid: true,
      message: 'temporary error',
      latitude: oldValue,
    };
    expect(commit).toHaveBeenCalledWith('setLatitude', latitudeObject);
  });

  it('action set latitude, superior decimal limit surpassed', async () => {
    let commit = jest.fn();
    let testValue = '12.1000000';
    let oldValue = 12;
    let testValueName = 'latitude';
    let minLimit = -180;
    let maxLimit = 180;
    let decimalMaxLimit = 999999;
    let isRequired = state.requiredValues.latitude;
    let mutationName = 'setLatitude';

    actions.validate({
      commit,
    }, {
      testValue,
      oldValue,
      testValueName,
      minLimit,
      maxLimit,
      decimalMaxLimit,
      isRequired,
      mutationName,
    });

    await flushPromises();
    let latitudeObject = {
      isValid: true,
      message: 'temporary error',
      latitude: oldValue,
    };
    expect(commit).toHaveBeenCalledWith('setLatitude', latitudeObject);
  });

  it('action set latitude, only - character entered', async () => {
    let commit = jest.fn();
    let testValue = '-';
    let oldValue = 12;
    let testValueName = 'latitude';
    let minLimit = -180;
    let maxLimit = 180;
    let decimalMaxLimit = 999999;
    let isRequired = state.requiredValues.latitude;
    let mutationName = 'setLatitude';

    actions.validate({
      commit,
    }, {
      testValue,
      oldValue,
      testValueName,
      minLimit,
      maxLimit,
      decimalMaxLimit,
      isRequired,
      mutationName,
    });

    await flushPromises();
    let latitudeObject = {
      isValid: false,
      message: 'Ingresa un número',
      latitude: testValue,
    };
    expect(commit).toHaveBeenCalledWith('setLatitude', latitudeObject);
  });

  it('action set latitude to empty, not error because not required field', async () => {
    let commit = jest.fn();
    let testValue = '';
    let oldValue = 12;
    let testValueName = 'latitude';
    let minLimit = -180;
    let maxLimit = 180;
    let decimalMaxLimit = 999999;
    let isRequired = false;
    let mutationName = 'setLatitude';

    actions.validate({
      commit,
    }, {
      testValue,
      oldValue,
      testValueName,
      minLimit,
      maxLimit,
      decimalMaxLimit,
      isRequired,
      mutationName,
    });

    await flushPromises();
    let latitudeObject = {
      isValid: true,
      message: 'temporary error',
      latitude: testValue,
    };
    expect(commit).toHaveBeenCalledWith('setLatitude', latitudeObject);
  });

  it('action set latitude to empty, error because is a required field', async () => {
    let commit = jest.fn();
    let testValue = '';
    let oldValue = 12;
    let testValueName = 'latitude';
    let minLimit = -180;
    let maxLimit = 180;
    let decimalMaxLimit = 999999;
    let isRequired = true;
    let mutationName = 'setLatitude';

    actions.validate({
      commit,
    }, {
      testValue,
      oldValue,
      testValueName,
      minLimit,
      maxLimit,
      decimalMaxLimit,
      isRequired,
      mutationName,
    });

    await flushPromises();
    let latitudeObject = {
      isValid: false,
      message: 'Campo requerido',
      latitude: testValue,
    };
    expect(commit).toHaveBeenCalledWith('setLatitude', latitudeObject);
  });
});