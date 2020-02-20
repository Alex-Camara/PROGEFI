import Location from '@/presentation/models/location.js'
const flushPromises = require('flush-promises');
import locationState from '@/presentation/store/modelStore/location.js'
const mutations = locationState.mutations
const actions = locationState.actions

describe('location vuex module', () => {
    let state
    let location = new Location()

    beforeEach(() => {
        state = {
            location
        }
    })

    it('mutation set country', () => {
        let country = 'México'
        let isValid = true
        let message = null
        mutations.setCountry(state, {
            country,
            isValid,
            message
        })
        expect(state.location.getCountry()).toBe(country)
        expect(state.location.getCountryValid()).toStrictEqual({
            isValid,
            message
        })
    })

    it('mutation set country state', () => {
        let countryState = 'Veracruz'
        let isValid = true
        let message = null
        mutations.setCountryState(state, {
            countryState,
            isValid,
            message
        })
        expect(state.location.getCountryState()).toBe(countryState)
        expect(state.location.getCountryStateValid()).toStrictEqual({
            isValid,
            message
        })
    })

    it('mutation set municipality', () => {
        let municipality = 'Xalapa'
        let isValid = true
        let message = null
        mutations.setMunicipality(state, {
            municipality,
            isValid,
            message
        })
        expect(state.location.getMunicipality()).toBe(municipality)
        expect(state.location.getMunicipalityValid()).toStrictEqual({
            isValid,
            message
        })
    })

    it('mutation set locality', () => {
        let locality = 'El castillo'
        let isValid = true
        let message = null
        mutations.setLocality(state, {
            locality,
            isValid,
            message
        })
        expect(state.location.getLocality()).toBe(locality)
        expect(state.location.getLocalityValid()).toStrictEqual({
            isValid,
            message
        })
    })

    it('action set country', async () => {
        state.location.setCountry('México')
        let regex = '^[^_{}+(),.;:!#$%&()\\[\\]=?¡+¿¡*|°@<>~¨^`¬\\d]+$'
        let testValue = 'Guatemala'
        let oldValue = state.location.getCountry()
        let testValueName = 'country'
        let minLimit = 5
        let maxLimit = 50
        let isRequired = true
        let mutationName = 'setCountry'
        let isOldValueValid = false

        let commit = jest.fn();
        let countryExpected = 'Guatemala'
        let isValidExpected = true
        let messageExpected = null

        actions.validate({
            commit
        }, {
            regex,
            testValue,
            oldValue,
            testValueName,
            minLimit,
            maxLimit,
            isRequired,
            mutationName,
            isOldValueValid
        })

        await flushPromises();

        expect(commit).toHaveBeenCalledWith('setCountry', {
            country: countryExpected,
            isValid: isValidExpected,
            message: messageExpected
        })
        expect(commit).toHaveBeenCalledWith('datacard/setCountry', countryExpected, {
            root: true
        })
    })

    it('action set country, it has characters below the permitted minimal limit', async () => {
        state.location.setCountry('México')
        let regex = '^[^_{}+(),.;:!#$%&()\\[\\]=?¡+¿¡*|°@<>~¨^`¬\\d]+$'
        let testValue = 'Me'
        let oldValue = state.location.getCountry()
        let testValueName = 'country'
        let minLimit = 5
        let maxLimit = 50
        let isRequired = true
        let mutationName = 'setCountry'
        let isOldValueValid = true

        let commit = jest.fn();
        let countryExpected = 'Me'
        let isValidExpected = false
        let messageExpected = 'Longitud mínima invalida'

        actions.validate({
            commit
        }, {
            regex,
            testValue,
            oldValue,
            testValueName,
            minLimit,
            maxLimit,
            isRequired,
            mutationName,
            isOldValueValid
        })

        await flushPromises();

        expect(commit).toHaveBeenCalledWith('setCountry', {
            country: countryExpected,
            isValid: isValidExpected,
            message: messageExpected
        })
    })

    it('action set country, it has exceeded maximum limit of characters', async () => {
        state.location.setCountry('México')
        let regex = '^[^_{}+(),.;:!#$%&()\\[\\]=?¡+¿¡*|°@<>~¨^`¬\\d]+$'
        let testValue = 'MeLlanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch'
        let oldValue = state.location.getCountry()
        let testValueName = 'country'
        let minLimit = 5
        let maxLimit = 50
        let isRequired = true
        let mutationName = 'setCountry'
        let isOldValueValid = true

        let commit = jest.fn();
        let countryExpected = 'México'
        let isValidExpected = true
        let messageExpected = 'temporary error'

        actions.validate({
            commit
        }, {
            regex,
            testValue,
            oldValue,
            testValueName,
            minLimit,
            maxLimit,
            isRequired,
            mutationName,
            isOldValueValid
        })

        await flushPromises();

        expect(commit).toHaveBeenCalledWith('setCountry', {
            country: countryExpected,
            isValid: isValidExpected,
            message: messageExpected
        })
    })

    it('action set country empty, the field is required', async () => {
        state.location.setCountry('México')
        let regex = '^[^_{}+(),.;:!#$%&()\\[\\]=?¡+¿¡*|°@<>~¨^`¬\\d]+$'
        let testValue = ''
        let oldValue = state.location.getCountry()
        let testValueName = 'country'
        let minLimit = 5
        let maxLimit = 50
        let isRequired = true
        let mutationName = 'setCountry'
        let isOldValueValid = true

        let commit = jest.fn();
        let countryExpected = ''
        let isValidExpected = false
        let messageExpected = 'Campo requerido'

        actions.validate({
            commit
        }, {
            regex,
            testValue,
            oldValue,
            testValueName,
            minLimit,
            maxLimit,
            isRequired,
            mutationName,
            isOldValueValid
        })

        await flushPromises();

        expect(commit).toHaveBeenCalledWith('setCountry', {
            country: countryExpected,
            isValid: isValidExpected,
            message: messageExpected
        })
    })

})