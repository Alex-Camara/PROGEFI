import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import selectLifeStage from '@/presentation/components/selectLifeStage.vue';
import LifeStage from '@/presentation/models/lifeStage.js';
import SpeciesData from '@/presentation/models/speciesData.js';
import Buefy from 'buefy';
import {
    Store
} from 'vuex-mock-store'

let methods = {
    addOption: jest.fn()
}

let LifeStage1 = new LifeStage()
LifeStage1.setLifeStage({
    id: 1,
    name: 'juvenil',
    iconPath: '/path/to/icon'
})
let LifeStage2 = new LifeStage()
LifeStage2.setLifeStage({
    id: 2,
    name: 'adulto',
    iconPath: '/path/to/icon'
})
let lifeStages = [LifeStage1, LifeStage2]

const store = new Store({
    state: {
        speciesData: {
            namespaced: true,
            speciesData: new SpeciesData(),
            lifeStages
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

describe('selectLifeStage component', () => {
    let wrapper = shallowMount(selectLifeStage, {
        localVue,
        mocks,
        methods
    });

    it('loads lifeStages values on component mount', async () => {
        expect(store.dispatch).toHaveBeenCalledWith("speciesData/getLifeStages")
    })

    it('life stage selection triggers setLifeStage in store', async () => {
        const LifeStageList = wrapper.find("#lifeStage_helper_list_item")
        LifeStageList.element.value = LifeStage1
        LifeStageList.trigger('click')
        await wrapper.vm.$nextTick()

        expect(store.dispatch).toHaveBeenCalledWith("speciesData/setLifeStage", LifeStage1)
    })

    it('add option button clicked, triggers method addOption', async () => {
        const addOptionButton = wrapper.find("#lifeStage_helper_container_header_addOption")
        addOptionButton.trigger('click')
        await wrapper.vm.$nextTick()

        expect(methods.addOption).toHaveBeenCalled()
    })
})