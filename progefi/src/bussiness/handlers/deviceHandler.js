"use strict";
import DeviceDao from '../dao/DeviceDao.js'

class DeviceHandler {
    constructor(){
        this.deviceDao = new DeviceDao()
    }
    async getDevices(selectedDevice, result) {
        let devices = await this.deviceDao.getDevices(selectedDevice);
        result(devices);
    }
    async getModels(deviceId, result) {
        let models = await this.deviceDao.getModels(deviceId);
        result(models);
    }
    async createDevice(device, result) {
        let createdDevice = await this.deviceDao.createDevice(device);
        result(createdDevice);
    }
    async createModel(model, result) {
        let createdModel = await this.deviceDao.createModel(model);
        result(createdModel);
    }
}

export default DeviceHandler;