'use strict'

import DeviceDaoImp from '../../persistence/dao/DeviceDaoImp'

class DeviceDao {
    constructor() {
        this.deviceDaoImp = new DeviceDaoImp();
    }
    getDevices() {
        let devices = Promise.resolve(this.deviceDaoImp.getDevices())
        return devices;
    }
    getModels(deviceId){
        let models = Promise.resolve(this.deviceDaoImp.getModels(deviceId))
        return models;
    }
}

export default DeviceDao;