import Collector from '@/presentation/models/collector.js'
const flushPromises = require('flush-promises');
import collectorState from '@/presentation/store/modelStore/collector.js'
const mutations = collectorState.mutations
const actions = collectorState.actions

describe('collector vuex module', () => {
  let state
  let collector = new Collector()
  let collector2 = new Collector()
  let collector3 = new Collector()
  let collectors = [collector, collector2, collector3]

  beforeEach(() => {
    state = {
      collector: null,
      collectors: []
    }
  })

  it('mutation set collector', () => {
    mutations.setCollector(state, collector)
    expect(state.collector).toBe(collector)
  })

  it('mutation set collectors', () => {
    mutations.setCollectors(state, collectors)
    expect(state.collectors).toBe(collectors)
  })

  it('reset collector vuex module fields', () => {
    mutations.setCollector(state, collector)
    mutations.setCollectors(state, collectors)

    mutations.resetStore(state)
    expect(state.collector).toStrictEqual(new Collector())
    expect(state.collectors).toStrictEqual([])
  })

  it('action returns id from existing collector', async () => {
    collector.setName('Romeo')
    collector.setId(1)
    state.collector = collector
    let collectorId = await actions.createCollector({ state })
    expect(collectorId).toBe(1)
  })

  it('action set collectors to empty if incoming string is blank', async () => {
    const commit = jest.fn()
    let emptyArray = []
    collector.setName('')
    await actions.getCollectors({ commit }, collector)
    expect(commit).toHaveBeenCalledWith('setCollectors', emptyArray)
  })

  it('action set collector correctly', async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    state.collector = collector
    collector.setRequired(true)

    collector.setName('Romeo Cámara')
    let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
    let minLimit = 2
    let maxLimit = 50
    await actions.validate(
      { state, commit, dispatch },
      { collector, regex, minLimit, maxLimit }
    )
    await flushPromises();
    collector.setValid({ isValid: true, message: null })
    expect(commit).toHaveBeenCalledWith('setCollector', collector)
  })

  it('action set collector, it is empty', async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    state.collector = collector
    collector.setRequired(true)

    collector.setName(' ')
    let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
    let minLimit = 2
    let maxLimit = 50
    await actions.validate(
      { state, commit, dispatch },
      { collector, regex, minLimit, maxLimit }
    )
    await flushPromises();
    collector.setValid({ isValid: false, message: 'Campo requerido' })
    expect(commit).toHaveBeenCalledWith('setCollector', collector)
  })

  it('action set collector, it has not permitted characters', async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    state.collector = collector
    collector.setRequired(true)

    collector.setName('Al3jandro ')
    let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
    let minLimit = 2
    let maxLimit = 50
    await actions.validate(
      { state, commit, dispatch },
      { collector, regex, minLimit, maxLimit }
    )
    await flushPromises();
    collector.setValid({ isValid: true, message: 'temporary error' })
    expect(commit).toHaveBeenCalledWith('setCollector', collector)
  })

  it('action set collector, it has exceeded maximum limit of characters', async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    state.collector = collector
    collector.setRequired(true)

    collector.setName('Brhadaranyakopanishadvivekachudamani Erreh Muñoz Castillo ')
    let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
    let minLimit = 2
    let maxLimit = 50
    await actions.validate(
      { state, commit, dispatch },
      { collector, regex, minLimit, maxLimit }
    )
    await flushPromises();
    collector.setValid({ isValid: true, message: 'temporary error' })
    expect(commit).toHaveBeenCalledWith('setCollector', collector)
  })

  it('action set collector, it has characters below the permitted minimal limit', async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    state.collector = collector
    collector.setRequired(true)

    collector.setName('i')
    let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
    let minLimit = 2
    let maxLimit = 50
    await actions.validate(
      { state, commit, dispatch },
      { collector, regex, minLimit, maxLimit }
    )
    await flushPromises();
    collector.setValid({ isValid: false, message: 'Longitud mínima invalida' })
    expect(commit).toHaveBeenCalledWith('setCollector', collector)
  })
})