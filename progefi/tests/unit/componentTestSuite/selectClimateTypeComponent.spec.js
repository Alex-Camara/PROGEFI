import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import selectClimateType from '@/presentation/components/selectClimateType.vue';
import ClimateType from '@/presentation/models/climateType.js';
import Buefy from 'buefy';
import {
    Store
} from 'vuex-mock-store'

let methods = {
    showDescription: jest.fn(),
    showSelectedDescription: jest.fn(),
    addOption: jest.fn()
}

let climateType1 = new ClimateType()
climateType1.setClimateType({
    id: 1,
    code: 'cw1',
    colorCode: '#223322',
    description: 'descripción 1 ',
})
let climateType2 = new ClimateType()
climateType2.setClimateType({
    id: 2,
    code: 'ce3',
    colorCode: '#89722',
    code: 'CATB',
    description: 'descripción 2 ',
})
let climateTypes = [climateType1, climateType2]

const store = new Store({
    state: {
        climateType: {
            namespaced: true,
            climateType: new ClimateType(),
            climateTypes
        }
    }
})

const mocks = {
    $store: store,
}

const localVue = createLocalVue();
localVue.use(Buefy);

afterEach(() => {
    store.reset()
})

describe('selectClimateType component', () => {
    let wrapper = shallowMount(selectClimateType, {
        localVue,
        mocks,
        methods
    });

    it('loads climateTypes values on component mount', async () => {
        expect(store.dispatch).toHaveBeenCalledWith("climateType/getClimateTypes")
    })

    it('climateType selection triggers setClimateType in store', async () => {
        const climateTypesList = wrapper.find("#select_climate_type_list_bubble")
        climateTypesList.element.value = climateType1
        climateTypesList.trigger('click')
        await wrapper.vm.$nextTick()

        expect(store.dispatch).toHaveBeenCalledWith("climateType/setClimateType", climateType1)
    })

    it('mouse over climateType list element triggers the description of that element to show', async () => {
        const climateTypesList = wrapper.find("#select_climate_type_list_bubble")
        climateTypesList.element.value = climateType1
        climateTypesList.trigger('mouseover')
        await wrapper.vm.$nextTick()

        expect(methods.showDescription).toHaveBeenCalled()
    })

    it('when the mouse leaves the climateType list element, it triggers the description of that element to hide and show the selected element description', async () => {
        // set the selected climate type
        store.state.climateType.climateType = climateType1

        const climateTypesList = wrapper.find("#select_climate_type_list_bubble")
        climateTypesList.element.value = climateType2
        climateTypesList.trigger('mouseover')
        await wrapper.vm.$nextTick()

        climateTypesList.trigger('mouseleave')
        await wrapper.vm.$nextTick()

        expect(methods.showSelectedDescription).toHaveBeenCalled()
    })

    it('add option button clicked, triggers method addOption', async () => {
        const addOptionButton = wrapper.find("#select_climate_type_container_header_addOption")
        addOptionButton.trigger('click')
        await wrapper.vm.$nextTick()

        expect(methods.addOption).toHaveBeenCalled()
    })

    // it('show selected climateType code', async () => {
        // const climateTypesList = wrapper.find("#select_climate_type_list_bubble")
        // climateTypesList.element.value = climateType1
        // climateTypesList.trigger('click')
        // await wrapper.vm.$nextTick()
// 
        // const climateTypeCodeTitle = wrapper.find("select_climate_type_container_header_value")
    // 
        // expect(climateTypeCodeTitle.isVisible()).toBe(true)
    // })

})