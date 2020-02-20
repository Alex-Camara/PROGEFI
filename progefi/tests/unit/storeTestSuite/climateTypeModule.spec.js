import ClimateType from '@/presentation/models/climateType.js'
import climateTypeState from '@/presentation/store/modelStore/climateType.js'
const mutations = climateTypeState.mutations
const actions = climateTypeState.actions
// const { ipcRendered, ipcMain } = require('electron')

describe('climateType vuex module', () => {
  let state
  let climateType = new ClimateType()
  let climateType2 = new ClimateType()
  let climateType3 = new ClimateType()
  let climateTypes = [climateType, climateType2, climateType3]

  beforeEach(() => {
    state = {
      climateType: null,
      climateTypes: []
    }
  })

  it('mutation set climateType', () => {
    mutations.setClimateType(state, climateType)
    expect(state.climateType).toBe(climateType)
  })
  it('mutation set climateTypes', () => {
    mutations.setClimateTypes(state, climateTypes)
    expect(state.climateTypes).toBe(climateTypes)
  })
  it('reset climateType vuex module fields', () => {
    mutations.setClimateType(state, climateType)
    mutations.setClimateTypes(state, climateTypes)
    mutations.resetStore(state)
    expect(state.climateType).toStrictEqual(new ClimateType())
    expect(state.climateTypes).toStrictEqual([])
  })

})
