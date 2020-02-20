import Vuex from 'vuex';
import {
    mount,
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import generalDataForm from '@/presentation/components/generalDataForm.vue';
import Datacard from '@/presentation/models/datacard.js';
import Catalogue from '@/presentation/models/catalogue.js';
import Project from '@/presentation/models/project.js';
import Device from '@/presentation/models/device.js';
import Model from '@/presentation/models/model.js';
import Collection from '@/presentation/models/collection.js';
import Collector from '@/presentation/models/collector.js';
import Buefy from 'buefy';
import {
    Store
} from 'vuex-mock-store'

let collection2 = new Collection()
collection2.setId(0)
let collection3 = new Collection()
collection3.setId(1)
let collections = [collection2, collection3]

let catalogue2 = new Catalogue()
catalogue2.setCatalogue({
    id: 1,
    datacardCount: 10,
    name: 'Catalogue 2',
    code: 'CATA',
    collectionId: 1
})
let catalogue3 = new Catalogue()
catalogue2.setCatalogue({
    id: 2,
    datacardCount: 5,
    name: 'Catalogue 3',
    code: 'CATB',
    collectionId: 1
})
let catalogues = [catalogue2, catalogue3]

let collector2 = new Collector()
collector2.setCollector({
    id: 1,
    name: 'Rodrigo Matrínez Alba',
    code: 'RMA',
    createdDatacards: 0
})
let collector3 = new Collector()
collector3.setCollector({
    id: 2,
    name: 'Irvin Coronado Pérez',
    code: 'ICP',
    createdDatacards: 0
})
let collectors = [collector2, collector3]

let project1 = new Project()
project1.setId(1)
let project2 = new Project()
project2.setId(2)
let projects = [project1, project2]

const store = new Store({
    state: {
        datacard: {
            namespaced: true,
            datacard: new Datacard()
        },
        catalogue: {
            namespaced: true,
            catalogue: new Catalogue(),
            catalogues
        },
        collection: {
            namespaced: true,
            collection: collection3,
            collections
        },
        collector: {
            namespaced: true,
            collector: new Collector(),
            collectors
        },
        device: {
            namespaced: true,
            device: new Device(),
            model: new Model()
        },
        project: {
            namespaced: true,
            project: new Project(),
            projects
        },
        metadata: {
            namespaced: true,
            state: {
                hasMetadata: false,
                device: null,
                model: null,
                collectDate: null,
                collectHour: null,
                formattedDate: null,
                formattedHour: null,
                longitude: null,
                latitude: null,
                altitude: null
            },
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

describe('generalDataForm component', () => {
    let wrapper = shallowMount(generalDataForm, {
        localVue,
        mocks
    });

    beforeEach(() => {

    });

    it('loads initial values on component mount', async () => {
        expect(store.dispatch).toHaveBeenCalledWith('project/getProjects')
        expect(store.dispatch).toHaveBeenCalledWith('collection/getCollections')
        // expect(store.dispatch).toHaveBeenCalledWith('catalogue/resetStore', collection3.getId())
    })

    it('input collection triggers setCollection in store', async () => {
        const collectionSelect = wrapper.find("#colection_select")

        collectionSelect.setValue(collection2)
        await wrapper.vm.$nextTick()

        expect(store.commit).toHaveBeenCalledWith('catalogue/resetStore')
        expect(store.dispatch).toHaveBeenCalledWith('collection/setCollection', collection2)
        // expect(store.dispatch).toHaveBeenCalledWith('collection/getCollections')
        expect(store.dispatch).toHaveBeenCalledWith('catalogue/getCatalogues', collection2.getId())
    })

    it('input catalogue triggers setCatalaogue in store', async () => {
        const catalogueSelect = wrapper.find("#catalogue_select")

        catalogueSelect.setValue(catalogues[0])
        catalogueSelect.trigger('change')
        await wrapper.vm.$nextTick()

        expect(store.commit).toHaveBeenCalledWith('catalogue/setCatalogue', catalogues[0])
        // expect(store.dispatch).toHaveBeenCalledWith('collection/setCollection', collection2)
        // expect(store.dispatch).toHaveBeenCalledWith('catalogue/getCatalogues', collection2.getId())
        // 
    })

    it('input catalogue triggers setCatalaogue in store', async () => {
        const catalogueSelect = wrapper.find("#catalogue_select")

        catalogueSelect.setValue(catalogues[0])
        catalogueSelect.trigger('change')
        await wrapper.vm.$nextTick()

        expect(store.commit).toHaveBeenCalledWith('catalogue/setCatalogue', catalogues[0])
        expect(store.commit).toHaveBeenCalledWith('datacard/setCatalogueId', catalogues[0].getId())
        expect(store.dispatch).toHaveBeenCalledWith('datacard/setDatacardCode', {
            catalogueCode: catalogues[0].getCode(),
            datacardCountInCatalogue: catalogues[0].getDatacardCount()
        })
        expect(store.dispatch).toHaveBeenCalledWith('datacard/setCollectorCode')
    })

    it('input project triggers setProject in store', async () => {
        const projectSelect = wrapper.find("#project_select")

        projectSelect.setValue(projects[0])
        await wrapper.vm.$nextTick()

        expect(store.commit).toHaveBeenCalledWith('project/setProject', projects[0])
        expect(store.commit).toHaveBeenCalledWith('datacard/setProjectId', projects[0].getId())
    })

    it('input collector triggers setCollector in store', async () => {
        const collectorInput = wrapper.find("#collector_select")

        collectorInput.setValue('Martín')
        await wrapper.vm.$nextTick()

        expect(store.dispatch).toHaveBeenCalledWith('collector/setCollector', 'Martín')
    })

    it('input device triggers setDevice in store', async () => {
        const deviceInput = wrapper.find("#device_select")

        deviceInput.setValue('Nokia')
        await wrapper.vm.$nextTick()

        expect(store.dispatch).toHaveBeenCalledWith('device/setDevice', 'Nokia')
    })

    it('input model triggers setModel in store', async () => {
        const modelInput = wrapper.find("#model_select")

        modelInput.setValue('iPhone 6')
        await wrapper.vm.$nextTick()

        expect(store.dispatch).toHaveBeenCalledWith('device/setModel', 'iPhone 6')
    })

    // it('close autocompletes when clicked in the area', async () => {
        // const containerDiv = wrapper.find("#generalDataForm_content")
// 
        // containerDiv.trigger('click')
        // await wrapper.vm.$nextTick()
// 
        // expect(methods.closeAutocompletes).toHaveBeenCalled()
    // })
})