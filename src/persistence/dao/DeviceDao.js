'use strict'

import DeviceDaoImp from '../daoImp/DeviceDaoImp'

class DeviceDao {
    constructor() {
        this.deviceDaoImp = new DeviceDaoImp();
    }
    getDevices(selectedDevice) {
        let devices = Promise.resolve(this.deviceDaoImp.getDevices(selectedDevice))
        return devices;
    }
    getModels(deviceId){
        let models = Promise.resolve(this.deviceDaoImp.getModels(deviceId))
        return models;
    }
    getModel(modelId){
        let model = Promise.resolve(this.deviceDaoImp.getModel(modelId))
        return model;
    }
    createDevice(device){
        let createdDevice = Promise.resolve(this.deviceDaoImp.createDevice(device))
        return createdDevice;
    }
    createModel(model){
        let createdModel = Promise.resolve(this.deviceDaoImp.createModel(model))
        return createdModel;
    }
}

export default DeviceDao;