import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import selectVegetationType
from '@/presentation/components/selectVegetationType.vue';
import VegetationType from '@/presentation/models/vegetationType.js';
import VegetalFormation from '@/presentation/models/vegetalFormation.js';
const flushPromises = require('flush-promises');

import Buefy from 'buefy';
import {
    Store
} from 'vuex-mock-store';

let methods = {
    showVegetationTypes: jest.fn(),
    addOption: jest.fn(),
};

let vegetalFormation1 = new VegetalFormation();
vegetalFormation1.setVegetalFormation({
    vegetalFormationId: 1,
    vegetalFormationName: 'Bosque',
    vegetalFormationImagePath: 'path',
});
let vegetalFormation2 = new VegetalFormation();
vegetalFormation2.setVegetalFormation({
    vegetalFormationId: 2,
    vegetalFormationName: 'Selva',
    vegetalFormationImagePath: 'path',
})
let vegetalFormations = [vegetalFormation1, vegetalFormation2];

let vegetationType1 = new VegetationType();
vegetationType1.setVegetationType({
    id: 1,
    name: 'bosque de niebla',
});
vegetationType1.setVegetalFormation(vegetalFormation1);
let vegetationType2 = new VegetationType();
vegetationType2.setVegetationType({
    id: 2,
    name: 'matorrales',
});
vegetationType2.setVegetalFormation(vegetalFormation1);
let vegetationTypes = [vegetationType1, vegetationType2];

const store = new Store({
    state: {
        vegetationType: {
            namespaced: true,
            vegetationType: new VegetationType(),
            vegetalFormation: new VegetalFormation(),
            vegetalFormations,
            vegetationTypes,
        },
    },
});

const mocks = {
    $store: store,
};

const localVue = createLocalVue();
localVue.use(Buefy);

afterEach(() => {
    store.reset();
});

describe('selectVegetationType component', () => {
    let wrapper = shallowMount(selectVegetationType, {
        localVue,
        mocks
    });

    it('loads vegetation type and vegetal formation values on component mount', async () => {
        expect(store.dispatch).toHaveBeenCalledWith(
            'vegetationType/getVegetationTypes'
        );
    });

    it('vegetal formation selection triggers method to display the vegetation types', async () => {
        let wrapper = shallowMount(selectVegetationType, {
            localVue,
            mocks,
            methods,
        });

        const vegetalFormationList = wrapper.find(
            '#select_vegetation_vegetal_formation_list_item'
        );
        vegetalFormationList.element.value = vegetalFormation1;
        vegetalFormationList.trigger('click');
        await wrapper.vm.$nextTick();

        expect(methods.showVegetationTypes).toHaveBeenCalled();
    });

    it('vegetal formation selection sets matching vegetation types in component', async () => {
        let res = wrapper.vm.showVegetationTypes(vegetalFormation1);
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.selectedVegetationTypes).toEqual(vegetationTypes)
        expect(wrapper.vm.selectedVegetalFormation).toEqual(vegetalFormation1.getName());
    });

    it('vegetation type selection triggers setVegetationType in store', async () => {
        const vegetationTypeList = wrapper.find("#select_vegetation_type_list_item")
        vegetationTypeList.element.value = vegetationType1
        vegetationTypeList.trigger('click')
        await wrapper.vm.$nextTick()

        expect(store.dispatch).toHaveBeenCalledWith("vegetationType/setVegetationType", vegetationType1)
    })

    it('add option button clicked, triggers method addOption', async () => {
        let wrapper = shallowMount(selectVegetationType, {
            localVue,
            mocks,
            methods,
        });

        const addOptionButton = wrapper.find("#select_vegetation_container_header_addOption")
        addOptionButton.trigger('click')
        await wrapper.vm.$nextTick()

        expect(methods.addOption).toHaveBeenCalled()
    });

});