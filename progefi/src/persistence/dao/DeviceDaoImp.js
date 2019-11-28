'use strict'

const Device = require('../models/Device')
const Model = require('../models/DeviceModel')

class DeviceDaoImp {
    async getDevices() {
        const devices = await Device.query()
        return devices;
    }
    async getModels(deviceId) {
        const models = await Model.query().where('deviceId', deviceId)
        return models;
    }
}

export default DeviceDaoImp;