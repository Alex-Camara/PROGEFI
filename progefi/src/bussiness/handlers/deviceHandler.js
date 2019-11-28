"use strict";
import DeviceDao from '../dao/DeviceDao.js'

class DeviceHandler {
    constructor(){
        this.deviceDao = new DeviceDao()
    }
    async getDevices(result) {
        let devices = await this.deviceDao.getDevices();
        result(devices);
    }
    async getModels(deviceId, result) {
        let models = await this.deviceDao.getModels(deviceId);
        result(models);
    }
}

export default DeviceHandler;