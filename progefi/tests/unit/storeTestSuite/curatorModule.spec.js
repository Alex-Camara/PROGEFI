import Curator from '@/presentation/models/curator.js';
const flushPromises = require('flush-promises');
import curatorState from '@/presentation/store/modelStore/curator.js';
const mutations = curatorState.mutations;
const actions = curatorState.actions;

describe('collector vuex module', () => {
    let state;
    let curator = new Curator();
    curator.setName('curador 1')
    let curator2 = new Curator()
    curator2.setName('curador 2')
    let curator3 = new Curator()
    curator3.setName('curador 3')
    let curators = [curator, curator2]
    let selectedCurators = [curator3]

    beforeEach(() => {
        state = {
            curator,
            curators,
            selectedCurators
        };
    });

    it('mutation set curator', () => {
        mutations.setCurator(state, curator);
        expect(state.curator).toBe(curator);
    });

    it('mutation set curators', () => {
        mutations.setCurators(state, curators)
        expect(state.curators).toStrictEqual(curators)
    })

    it('mutation set filtered curators', () => {
        let testCurators = [curator, curator3]
        let expectedCurators = [curator]
        mutations.setCurators(state, testCurators)
        expect(state.curators).toStrictEqual(expectedCurators)
    })

    it('mutation add curator', () => {
        let expectedCurators = [curator3, curator]
        mutations.addCurator(state)
        expect(state.selectedCurators).toStrictEqual(expectedCurators)
    })

    it('mutation delete curator', () => {
        state.selectedCurators = [curator3]
        let expectedCurators = []
        let curatorToDelete = new Curator()
        curatorToDelete.setName('curador 3')
        mutations.deleteCurator(state, curatorToDelete)
        expect(state.selectedCurators).toStrictEqual(expectedCurators)
    })

    it('reset curator vuex module fields', () => {
        mutations.setCurator(state, curator)
        mutations.setCurators(state, curators)

        mutations.resetStore(state)
        expect(state.curator).toStrictEqual(new Curator())
        expect(state.curators).toStrictEqual([])
        expect(state.selectedCurators).toStrictEqual([])
    })

    it('action set curator', async () => {
        let commit = jest.fn();
        let dispatch = jest.fn();
        let curator = new Curator()
        curator.setName('Carlos')
        let minLimit = 2
        let maxLimit = 50
        let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
        state.selectedCurators = []

        actions.validate({
            state,
            commit,
            dispatch
        }, {
            curator,
            minLimit,
            maxLimit,
            regex
        })

        await flushPromises();
        let curatorExpected = new Curator()
        curatorExpected.setName('Carlos')
        curatorExpected.setValid({
            isValid: true,
            message: null
        })
        expect(commit).toHaveBeenCalledWith('setCurator', curatorExpected);
        expect(dispatch).toHaveBeenCalledWith('getCurators', curatorExpected.getName());
    })

    it('action set curator, selected curators limit reached', async () => {
        let commit = jest.fn();
        let dispatch = jest.fn();
        let curator = new Curator()
        curator.setName('Carlos')
        let minLimit = 2
        let maxLimit = 50
        let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
        state.selectedCurators = [curator2, curator3]

        actions.validate({
            state,
            commit,
            dispatch
        }, {
            curator,
            minLimit,
            maxLimit,
            regex
        })

        await flushPromises();
        let curatorExpected = new Curator()
        curatorExpected.setName('curador 1')
        curatorExpected.setValid({
            isValid: false,
            message: 'temporary error'
        })
        expect(commit).toHaveBeenCalledWith('setCurator', curatorExpected);
    })

    it('action set curator empty, field is required', async () => {
    let commit = jest.fn();
    let dispatch = jest.fn();
    let curator = new Curator()
    curator.setName('')
    let minLimit = 2
    let maxLimit = 50
    let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
    state.selectedCurators = []
    
    actions.validate({
    state,
    commit,
    dispatch
    }, {
    curator,
    minLimit,
    maxLimit,
    regex
    })
    
    await flushPromises();
    let curatorExpected = new Curator()
    curatorExpected.setName('')
    curatorExpected.setValid({
    isValid: false,
    message: 'Campo requerido'
    })
    let curatorsExpected = []
    expect(commit).toHaveBeenCalledWith('setCurator', curatorExpected);
    expect(commit).toHaveBeenCalledWith('setCurators', curatorsExpected);
    })

    it('action set curator, minimal limit reached', async () => {
        let commit = jest.fn();
        let dispatch = jest.fn();
        let curator = new Curator()
        curator.setName('C')
        let minLimit = 2
        let maxLimit = 50
        let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
        state.selectedCurators = []

        actions.validate({
            state,
            commit,
            dispatch
        }, {
            curator,
            minLimit,
            maxLimit,
            regex
        })

        await flushPromises();
        let curatorExpected = new Curator()
        curatorExpected.setName('C')
        curatorExpected.setValid({
            isValid: false,
            message: 'Longitud mínima invalida'
        })
        expect(commit).toHaveBeenCalledWith('setCurator', curatorExpected);
        expect(dispatch).toHaveBeenCalledWith('getCurators', curatorExpected.getName());
    })

    it('action set curator, maximal limit reached', async () => {
        let commit = jest.fn();
        let dispatch = jest.fn();
        let curator = new Curator()
        curator.setName('Brhadaranyakopanishadvivekachudamani Erreh Muñoz Castillo ')
        let minLimit = 2
        let maxLimit = 50
        let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
        state.selectedCurators = []
        state.curator.setValid({isValid: true, message: null})

        actions.validate({
            state,
            commit,
            dispatch
        }, {
            curator,
            minLimit,
            maxLimit,
            regex
        })

        await flushPromises();
        let curatorExpected = new Curator()
        curatorExpected.setName('curador 1')
        curatorExpected.setValid({
            isValid: true,
            message: 'temporary error'
        })
        expect(commit).toHaveBeenCalledWith('setCurator', curatorExpected);
    })

    it('action add curator, curator is not in the selectedCurators array', async () => {
        let commit = jest.fn();
        state.selectedCurators = [curator2, curator3]
        state.curator = curator
        actions.addCurator({state, commit})
        await flushPromises();
        expect(commit).toHaveBeenCalledWith('addCurator');
        expect(commit).toHaveBeenCalledWith('setCurator', new Curator());
        expect(commit).toHaveBeenCalledWith('setCurators', []);

    })

    it('action add curator, curator is already in the selectedCurators array', async () => {
        let commit = jest.fn();
        state.selectedCurators = [curator, curator2, curator3]
        state.curator = curator
        actions.addCurator({state, commit})
        await flushPromises();
        expect(commit).not.toHaveBeenCalledWith('addCurator');
        expect(commit).toHaveBeenCalledWith('setCurator', new Curator());
        expect(commit).toHaveBeenCalledWith('setCurators', []);

    })
})