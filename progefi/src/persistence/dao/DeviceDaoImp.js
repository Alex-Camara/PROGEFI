'use strict'

const Device = require('../models/Device')
const Model = require('../models/DeviceModel')

class DeviceDaoImp {
  async getDevices (selectedDevice) {
    /*const devices = await Device.query()
        return devices;*/

    const devices = await Device.query()
      .where('name', 'like', '%' + selectedDevice + '%')
      .limit(10)

    return devices
  }
  async getModels (deviceId) {
    const models = await Model.query().where('deviceId', deviceId)
    return models
  }
  async createDevice (device) {
    const createdDevice = await Device.query().insert({
      name: device.name
    })
    console.log(createdDevice)
    return createdDevice
  }
  async createModel (model) {
    const createdModel = await Model.query().insert({
      name: model.name,
      deviceId: model.deviceId
    })
    console.log(createdModel)
    return createdModel
  }
}

export default DeviceDaoImp
