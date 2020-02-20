import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import selectTemplate from '@/presentation/components/selectTemplate.vue';
import Template from '@/presentation/models/template.js';
import Buefy from 'buefy';
import {
    Store
} from 'vuex-mock-store'

let template1 = new Template()
template1.setId(1)

let template2 = new Template()
template2.setId(2)
let templates = [template1, template2]

const store = new Store({
    state: {
        template: {
            namespaced: true,
            template: new Template(),
            templates
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

describe('selectTemplate component', () => {
    let wrapper = shallowMount(selectTemplate, {
        localVue,
        mocks
    });

    it('loads template names values on component mount', async () => {
        expect(store.dispatch).toHaveBeenCalledWith("template/getTemplates")
    })

    it('template selection triggers setTemplate in store', async () => {
        const templatesList = wrapper.find("#template_select")
        templatesList.element.value = template1
        templatesList.trigger('change')
        await wrapper.vm.$nextTick()

        expect(store.dispatch).toHaveBeenCalledWith("template/getTemplate", template1)
    })
})