import Device from '@/presentation/models/device.js';
import Model from '@/presentation/models/model.js';
const flushPromises = require('flush-promises');
import deviceState from '@/presentation/store/modelStore/device.js';
const mutations = deviceState.mutations;
const actions = deviceState.actions;

describe('device vuex module', () => {
    let state;
    let device = new Device()
    device.setDevice({
        name: 'Apple',
        id: 1
    })
    let device2 = new Device()
    let device3 = new Device()
    let devices = []

    let model = new Model()
    model.setModel({
        name: 'iPhone 6',
        id: 1,
        deviceId: 1
    })
    let model2 = new Model()
    let model3 = new Model()
    let models = []


    beforeEach(() => {
        state = {
            device,
            devices,
            model,
            models
        };
    });

    it('mutation set devices', () => {
        mutations.setDevices(state, devices)
        expect(state.devices).toBe(devices)
    })

    it('mutation set devices', () => {
        mutations.setDevice(state, device2)
        expect(state.device).toBe(device2)
    })

    it('mutation set models', () => {
        mutations.setModels(state, models)
        expect(state.models).toBe(models)
    })

    it('mutation set devices', () => {
        mutations.setModel(state, model2)
        expect(state.model).toBe(model2)
    })

    it('reset device vuex module fields', () => {
        devices.push(device, device2, device3)
        models.push(model, model2, model3)
        mutations.setDevice(state, device)
        mutations.setDevices(state, devices)

        mutations.setModel(state, model2)
        mutations.setModels(state, models)

        mutations.resetStore(state)
        expect(state.device).toStrictEqual(new Device())
        expect(state.devices).toStrictEqual([])
        expect(state.model).toStrictEqual(new Model())
        expect(state.models).toStrictEqual([])
    })

    it('action set device, the device has id attribute', async () => {
        let commit = jest.fn()
        let dispatch = jest.fn()

        let expectedDevice = new Device()
        expectedDevice.setDevice({
            name: 'Apple',
            id: 1
        })
        expectedDevice.setValid({
            isValid: true,
            message: null
        })

        actions.setDevice({
            state,
            commit,
            dispatch
        }, device)

        await flushPromises();

        expect(commit).toHaveBeenCalledWith('setDevice', expectedDevice)
        expect(dispatch).toHaveBeenCalledWith('getModels', 1)
    })

    it('action set device, the parameter is a string but it matches a device name already existing in the state', async () => {
        let commit = jest.fn()
        let dispatch = jest.fn()
        let testDevice = 'Apple'

        let expectedDevice = new Device()
        expectedDevice.setDevice({
            name: 'Apple',
            id: 1
        })
        expectedDevice.setValid({
            isValid: true,
            message: null
        })

        actions.setDevice({
            state,
            commit,
            dispatch
        }, testDevice)

        await flushPromises();

        expect(commit).toHaveBeenCalledWith('setDevice', expectedDevice)
        expect(dispatch).toHaveBeenCalledWith('getModels', 1)
    })

    it('action set device, the parameter is a string and it does not match a device name already existing in the state', async () => {
        let commit = jest.fn()
        let dispatch = jest.fn()
        let regex = '^[a-zA-Z /()]*$'
        let testValueName = 'device'
        let mutationName = 'setDevice'
        let minLimit = 2
        let maxLimit = 50
        let testDevice = 'Motorola'

        let expectedDevice = new Device()
        expectedDevice.setName(testDevice)

        actions.setDevice({
            state,
            commit,
            dispatch
        }, testDevice)

        await flushPromises();

        expect(dispatch).toHaveBeenCalledWith('validate', {
            testValueName,
            regex,
            mutationName,
            minLimit,
            maxLimit,
            testValue: expectedDevice
        })
    })

    it('action set model, the model has id attribute', async () => {
        let commit = jest.fn()
        let dispatch = jest.fn()

        let expectedModel = new Model()
        expectedModel.setModel({
            name: 'iPhone 6',
            id: 1,
            deviceId: 1
        })
        expectedModel.setValid({
            isValid: true,
            message: null
        })

        actions.setModel({
            state,
            commit,
            dispatch
        }, model)

        await flushPromises();

        expect(commit).toHaveBeenCalledWith('setModel', expectedModel)
    })

    it('action set model, the parameter is a string but it matches a model name already existing in the state', async () => {
        let commit = jest.fn()
        let dispatch = jest.fn()
        let testModel = 'iPhone 6'

        let expectedModel = new Model()
        expectedModel.setModel({
            name: 'iPhone 6',
            id: 1,
            deviceId: 1
        })
        expectedModel.setValid({
            isValid: true,
            message: null
        })

        actions.setModel({
            state,
            commit,
            dispatch
        }, testModel)

        await flushPromises();

        expect(commit).toHaveBeenCalledWith('setModel', expectedModel)
    })

    it('action set model, the parameter is a string and it does not match a model name already existing in the state', async () => {
        let commit = jest.fn()
        let dispatch = jest.fn()
        let regex = '^[a-zA-Z0-9 /():_-]*$'
        let testValueName = 'model'
        let mutationName = 'setModel'
        let minLimit = 2
        let maxLimit = 50
        let testModel = 'Galaxy 10'

        let expectedModel = new Model()
        expectedModel.setName(testModel)

        actions.setModel({
            state,
            commit,
            dispatch
        }, testModel)

        await flushPromises();

        expect(dispatch).toHaveBeenCalledWith('validate', {
            testValueName,
            regex,
            mutationName,
            minLimit,
            maxLimit,
            testValue: expectedModel
        })
    })

    it('action set device, it is empty', async () => {
        const commit = jest.fn()
        let testValueName = 'device'
        let mutationName = 'setDevice'

        let testDevice = new Device()
        testDevice.setName(' ')
        testDevice.setValid({
            isValid: false,
            message: 'Campo requerido'
        })

        let regex = '^[a-zA-Z /()]*$'
        let minLimit = 2
        let maxLimit = 50
        await actions.validate({
            state,
            commit
        }, {
            testValueName,
            mutationName,
            testValue: testDevice,
            regex,
            minLimit,
            maxLimit
        })
        await flushPromises();

        expect(commit).toHaveBeenCalledWith('setDevice', testDevice)
    })

    it('action set device, it has characters below the permitted minimal limit', async () => {
        const commit = jest.fn()
        let testValueName = 'device'
        let mutationName = 'setDevice'

        let testDevice = new Device()
        testDevice.setName('j')
        testDevice.setValid({
            isValid: false,
            message: 'Longitud mínima invalida'
        })

        let regex = '^[a-zA-Z /()]*$'
        let minLimit = 2
        let maxLimit = 50
        await actions.validate({
            state,
            commit
        }, {
            testValueName,
            mutationName,
            testValue: testDevice,
            regex,
            minLimit,
            maxLimit
        })
        await flushPromises();

        expect(commit).toHaveBeenCalledWith('setDevice', testDevice)
    })

    it('action set device, it has characters below the permitted minimal limit', async () => {
        const commit = jest.fn()
        let testValueName = 'device'
        let mutationName = 'setDevice'

        let testDevice = new Device()
        testDevice.setName('j')
        testDevice.setValid({
            isValid: false,
            message: 'Longitud mínima invalida'
        })

        let regex = '^[a-zA-Z /()]*$'
        let minLimit = 2
        let maxLimit = 50
        await actions.validate({
            state,
            commit
        }, {
            testValueName,
            mutationName,
            testValue: testDevice,
            regex,
            minLimit,
            maxLimit
        })
        await flushPromises();

        expect(commit).toHaveBeenCalledWith('setDevice', testDevice)
    })

    it('action set device, it has exceeded maximum limit of characters', async () => {
        const commit = jest.fn()
        let testValueName = 'device'
        let mutationName = 'setDevice'

        let testDevice = new Device()
        testDevice.setName('Brhadaranyakopanishadvivekachudamani Erreh Muñoz Castillo ')
        testDevice.setValid({
            isValid: true,
            message: 'temporary error'
        })

        let expectedDevice = device
        expectedDevice.setValid({
            isValid: true,
            message: 'temporary error'
        })

        let regex = '^[a-zA-Z /()]*$'
        let minLimit = 2
        let maxLimit = 50
        await actions.validate({
            state,
            commit
        }, {
            testValueName,
            mutationName,
            testValue: testDevice,
            regex,
            minLimit,
            maxLimit
        })
        await flushPromises();

        expect(commit).toHaveBeenCalledWith('setDevice', expectedDevice)
    })

    it('action set device, it has not permitted characters', async () => {
        const commit = jest.fn()
        let testValueName = 'device'
        let mutationName = 'setDevice'

        let testDevice = new Device()
        testDevice.setName('motorol@')
        testDevice.setValid({
            isValid: true,
            message: 'temporary error'
        })

        let expectedDevice = device
        expectedDevice.setValid({
            isValid: true,
            message: 'temporary error'
        })

        let regex = '^[a-zA-Z /()]*$'
        let minLimit = 2
        let maxLimit = 50
        await actions.validate({
            state,
            commit
        }, {
            testValueName,
            mutationName,
            testValue: testDevice,
            regex,
            minLimit,
            maxLimit
        })
        await flushPromises();

        expect(commit).toHaveBeenCalledWith('setDevice', expectedDevice)
    })

    it('action set model, it is empty', async () => {
        const commit = jest.fn()
        let testValueName = 'model'
        let mutationName = 'setModel'

        let testModel = new Model()
        testModel.setName(' ')
        testModel.setValid({
            isValid: false,
            message: 'Campo requerido'
        })

        let regex = '^[a-zA-Z0-9 /():_-]*$'
        let minLimit = 2
        let maxLimit = 50
        await actions.validate({
            state,
            commit
        }, {
            testValueName,
            mutationName,
            testValue: testModel,
            regex,
            minLimit,
            maxLimit
        })
        await flushPromises();

        expect(commit).toHaveBeenCalledWith('setModel', testModel)
    })

    it('action set model, it has characters below the permitted minimal limit', async () => {
        const commit = jest.fn()
        let testValueName = 'model'
        let mutationName = 'setModel'

        let testModel = new Model()
        testModel.setName('j')
        testModel.setValid({
            isValid: false,
            message: 'Longitud mínima invalida'
        })

        let regex = '^[a-zA-Z0-9 /():_-]*$'
        let minLimit = 2
        let maxLimit = 50
        await actions.validate({
            state,
            commit
        }, {
            testValueName,
            mutationName,
            testValue: testModel,
            regex,
            minLimit,
            maxLimit
        })
        await flushPromises();

        expect(commit).toHaveBeenCalledWith('setModel', testModel)
    })

    it('action set model, it has characters below the permitted minimal limit', async () => {
        const commit = jest.fn()
        let testValueName = 'model'
        let mutationName = 'setModel'

        let testModel = new Model()
        testModel.setName('j')
        testModel.setValid({
            isValid: false,
            message: 'Longitud mínima invalida'
        })

        let regex = '^[a-zA-Z0-9 /():_-]*$'
        let minLimit = 2
        let maxLimit = 50
        await actions.validate({
            state,
            commit
        }, {
            testValueName,
            mutationName,
            testValue: testModel,
            regex,
            minLimit,
            maxLimit
        })
        await flushPromises();

        expect(commit).toHaveBeenCalledWith('setModel', testModel)
    })

    it('action set model, it has exceeded maximum limit of characters', async () => {
        const commit = jest.fn()
        let testValueName = 'model'
        let mutationName = 'setModel'

        let testModel = new Model()
        testModel.setName('Brhadaranyakopanishadvivekachudamani Erreh Muñoz Castillo ')
        testModel.setValid({
            isValid: true,
            message: 'temporary error'
        })

        let expectedModel = model
        expectedModel.setValid({
            isValid: true,
            message: 'temporary error'
        })

        let regex = '^[a-zA-Z0-9 /():_-]*$'
        let minLimit = 2
        let maxLimit = 50
        await actions.validate({
            state,
            commit
        }, {
            testValueName,
            mutationName,
            testValue: testModel,
            regex,
            minLimit,
            maxLimit
        })
        await flushPromises();

        expect(commit).toHaveBeenCalledWith('setModel', expectedModel)
    })

    it('action set model, it has not permitted characters', async () => {
        const commit = jest.fn()
        let testValueName = 'model'
        let mutationName = 'setModel'

        let testModel = new Model()
        testModel.setName('i ph0/&%')
        testModel.setValid({
            isValid: true,
            message: 'temporary error'
        })

        let expectedModel = model
        expectedModel.setValid({
            isValid: true,
            message: 'temporary error'
        })

        let regex = '^[a-zA-Z0-9 /():_-]*$'
        let minLimit = 2
        let maxLimit = 50
        await actions.validate({
            state,
            commit
        }, {
            testValueName,
            mutationName,
            testValue: testModel,
            regex,
            minLimit,
            maxLimit
        })
        await flushPromises();

        expect(commit).toHaveBeenCalledWith('setModel', expectedModel)
    })

});