const {
    ipcRenderer
} = require('electron')

const template = {
    namespaced: true,
    state: {
        templates: [],
        template: {
            height: 800,
            width: 1250,
            backgroundColor: "#000000",
            fontColor: "#FFFFFF",
            tags: [
                { tag: "altitude", tagValue: "altitude", tagBefore: null, tagAfter: 'msnm', valueName: null },
                { tag: "device", tagValue: "device", tagBefore: null, tagAfter: null, valueName: 'name' },
                { tag: "longitude", tagValue: "longitude", tagBefore: null, tagAfter: null, valueName: null },
                { tag: "latitude", tagValue: "latitude", tagBefore: null, tagAfter: null, valueName: null },
                { tag: "vegetationType", tagValue: "vegetationType", tagBefore: null, tagAfter: null, valueName: 'name' },
                { tag: "climateType", tagValue: "climateType", tagBefore: null, tagAfter: null, valueName: 'code' },
                { tag: "collection", tagValue: "collection", tagBefore: null, tagAfter: null, valueName: 'name' },
                { tag: "institute", tagValue: "institute", tagBefore: null, tagAfter: null, valueName: 'researchArea' },
                { tag: "catalogue", tagValue: "catalogue", tagBefore: 'Catálogo:', tagAfter: null, valueName: 'name' },
                { tag: "collector", tagValue: "collector", tagBefore: null, tagAfter: null, valueName: 'name' },
                { tag: "model", tagValue: "model", tagBefore: null, tagAfter: null, valueName: 'name' },
                { tag: "collectDate", tagValue: "formattedDate", tagBefore: null, tagAfter: null, valueName: null },
                { tag: "collectHour", tagValue: "formattedHour", tagBefore: null, tagAfter: null, valueName: null },
                { tag: "scientificName", tagValue: "scientificName", tagBefore: null, tagAfter: null, valueName: null },
                { tag: "sex", tagValue: "sex", tagBefore: null, tagAfter: null, valueName: 'name' },
                { tag: "lifeStage", tagValue: "lifeStage", tagBefore: null, tagAfter: null, valueName: 'name' },
                { tag: "country", tagValue: "country", tagBefore: null, tagAfter: null, valueName: null },
                { tag: "countryState", tagValue: "countryState", tagBefore: null, tagAfter: null, valueName: null },
                { tag: "municipality", tagValue: "municipality", tagBefore: null, tagAfter: null, valueName: null },
                { tag: "locality", tagValue: "locality", tagBefore: null, tagAfter: null, valueName: null },
                { tag: "curator", tagValue: "selectedCuratorsName", tagBefore: 'Curador:', tagAfter: null, valueName: null }
            ],
            layout: [
                { x: 25, y: 0, w: 90, h: 10, i: "collection", name: '', style: { 'background-color': 'rgb(0, 172, 193, 0.8)', 'font-size': '20px', 'text-align': 'center' } },
                { x: 9, y: 10, w: 12, h: 40, i: "instituteLogo", name: '', style: { 'background-color': 'rgb(255, 183, 77,0.8)' } },
                { x: 30, y: 4, w: 60, h: 200, i: "photocollect", name: '', style: { 'background-color': 'rgb(255, 183, 77,0.8)' } },
                { x: 0, y: 50, w: 30, h: 10, i: "institute", name: '', style: { 'background-color': "rgb(0, 151, 167,0.8)", 'text-align': 'center', 'font-weight': 'bold' } },
                { x: 0, y: 60, w: 30, h: 5, i: "space1", name: '', style: { 'background-color': "rgb(77, 208, 225,0.8)" } },
                { x: 0, y: 65, w: 10, h: 10, i: "lifeStage", name: '', style: { 'background-color': 'rgb(156, 204, 101, 0.8)' } },
                { x: 10, y: 65, w: 10, h: 10, i: "sex", name: '', style: { 'background-color': "rgb(124, 179, 66,0.8)" } },
                { x: 0, y: 75, w: 25, h: 10, i: "longitude", name: '', style: { 'background-color': "rgb(100, 181, 246,0.8)" } },
                { x: 0, y: 85, w: 25, h: 10, i: "latitude", name: '', style: { 'background-color': "rgb(66, 165, 245, 0.8)" } },
                { x: 0, y: 95, w: 30, h: 5, i: "space2", name: '', style: { 'background-color': "rgb(77, 208, 225,0.8)" } },
                { x: 0, y: 100, w: 12, h: 10, i: "altitude", name: '', style: { 'background-color': "rgb(30, 136, 229,0.8)" } },
                { x: 12, y: 100, w: 10, h: 10, i: "climateType", name: '', style: { 'background-color': "rgb(21, 101, 192, 0.8)" } },
                { x: 0, y: 110, w: 30, h: 10, i: "vegetationType", name: '', style: { 'background-color': "rgb(21, 101, 192, 0.8)" } },
                { x: 0, y: 120, w: 30, h: 5, i: "space3", name: '', style: { 'background-color': "rgb(77, 208, 225,0.8)" } },
                { x: 0, y: 125, w: 15, h: 10, i: "locality", name: '', style: { 'background-color': "rgb(25, 118, 210, 0.8)" } },
                { x: 15, y: 125, w: 15, h: 10, i: "municipality", name: '', style: { 'background-color': "rgb(41, 121, 255,0.8)" } },
                { x: 0, y: 135, w: 15, h: 10, i: "countryState", name: '', style: { 'background-color': "rgb(13, 71, 161, 0.8)" } },
                { x: 15, y: 135, w: 15, h: 10, i: "country", name: '', style: { 'background-color': "rgb(33, 150, 243,0.8)" } },
                { x: 0, y: 145, w: 30, h: 5, i: "space4", name: '', style: { 'background-color': "rgb(77, 208, 225,0.8)" } },
                { x: 0, y: 150, w: 10, h: 10, i: "collectDate", name: '', style: { 'background-color': "rgb(251, 140, 0, 0.8)" } },
                { x: 10, y: 150, w: 10, h: 10, i: "collectHour", name: '', style: { 'background-color': "rgb(255, 167, 38,0.8)" } },
                { x: 0, y: 160, w: 30, h: 5, i: "space5", name: '', style: { 'background-color': "rgb(77, 208, 225, 0.8)" } },
                { x: 0, y: 165, w: 10, h: 10, i: "device", name: '', style: { 'background-color': "rgb(230, 81, 0,0.8)" } },
                { x: 10, y: 165, w: 15, h: 10, i: "model", name: '', style: { 'background-color': "rgb(255, 167, 38, 0.8)" } },
                { x: 0, y: 175, w: 30, h: 10, i: "collector", name: '', style: { 'background-color': "rgb(255, 145, 0,0.8)" } },
                { x: 0, y: 185, w: 30, h: 10, i: "curator", name: '', style: { 'background-color': "rgb(230, 81, 0, 0.8)" } },
                { x: 70, y: 190, w: 20, h: 10, i: "catalogue", name: '', style: { 'background-color': "rgb(230, 81, 0, 0.8)" } },
                { x: 30, y: 190, w: 20, h: 10, i: "scientificName", name: '', style: { 'background-color': "rgb(104, 159, 56, 0.8)", 'font-style': 'italic' } }
            ]/*,
            tagColors: []*/
        }
    },
    mutations: {
        setTemplates(state, templates) {
            state.templates = templates;
        },
        setTemplate(state, template) {
            state.template = template;
        }/*,
        setTagColors(state, template) {
            for (let i = 0; i < state.layout.length; i++) {
                state.template.tagColors = state.layout[i].style["background-color"];
            }
        },*/
    }/*,
    actions: {
        getTemplates({ commit }) {
            //commit("setActiveStep", 0);
            //commit("setPhotoCollectNull");
        },
        getTemplate({ commit }) {
            commit("setTagColors");
        }
    }*/
}

export default template;