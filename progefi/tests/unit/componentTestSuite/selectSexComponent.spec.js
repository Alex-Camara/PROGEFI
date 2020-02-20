import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import selectSex from '@/presentation/components/selectSex.vue';
import SpeciesData from '@/presentation/models/speciesData.js';
import Sex from '@/presentation/models/sex.js';
import Buefy from 'buefy';
import {
    Store
} from 'vuex-mock-store'

let methods = {
    addOption: jest.fn()
}

let sex1 = new Sex()
sex1.setSex({
    id: 1,
    name: 'macho',
    iconPath: '/path/to/icon'
})
let sex2 = new Sex()
sex2.setSex({
    id: 2,
    name: 'hembra',
    iconPath: '/path/to/icon'
})
let sexes = [sex1, sex2]

const store = new Store({
    state: {
        speciesData: {
            namespaced: true,
            speciesData: new SpeciesData(),
            sexes
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

describe('selextSex component', () => {
    let wrapper = shallowMount(selectSex, {
        localVue,
        mocks,
        methods
    });

    it('loads sex values on component mount', async () => {
        expect(store.dispatch).toHaveBeenCalledWith("speciesData/getSexes")
    })

    it('sex selection triggers setSex in store', async () => {
        const sexList = wrapper.find("#sex_helper_list_item")
        sexList.element.value = sex1
        sexList.trigger('click')
        await wrapper.vm.$nextTick()

        expect(store.dispatch).toHaveBeenCalledWith("speciesData/setSex", sex1)
    })

    it('add option button clicked, triggers method addOption', async () => {
        const addOptionButton = wrapper.find("#sex_helper_container_header_addOption")
        addOptionButton.trigger('click')
        await wrapper.vm.$nextTick()

        expect(methods.addOption).toHaveBeenCalled()
    })
})