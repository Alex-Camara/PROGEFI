import router from "../../router/router";

const menu = {
  namespaced: true,
  state: {
    items: [
      {
        name: "UIShowCollections",
        params: "",
        title: "Colección",
        classObject: {
          "is-active": false,
          disabled_item: false
        }
      },
      {
        name: "UIShowCatalogues",
        params: { selectedCatalogue: null },
        title: "Catálogos",
        classObject: {
          "is-active": false,
          disabled_item: false
        }
      },
      {
        name: "UIShowDataCards",
        params: { selectedCatalogue: null },
        title: "Fichas de fotocolecta",
        classObject: {
          "is-active": false,
          disabled_item: false
        }
      },
      {
        name: "UIShowTemplates",
        params: "",
        title: "Plantillas",
        classObject: {
          "is-active": false,
          disabled_item: false
        }
      },
      {
        name: "UITrackDatacard",
        params: "",
        title: "Rastreo",
        classObject: {
          "is-active": false,
          disabled_item: false
        }
      }
    ],
    selectedItem: null,
    listClass: ""
  },
  mutations: {
    setItem(state, item) {
      if (router.currentRoute.name !== item.name) {
        router.push({ name: item.name, params: item.params });
        for (var i = 0; i < state.items.length; i++) {
          state.items[i].classObject["is-active"] = false;
        }
        item.classObject["is-active"] = true;
      } else {
        router.push({ params: item.params });
      }
      state.selectedItem = item;
    },
    setItemByName(state, name) {
      let item = null;
      for (var i = 0; i < state.items.length; i++) {
        if (state.items[i].title === name) {
          item = state.items[i];
          state.items[i].classObject["is-active"] = true;
        }
      }
      if (router.currentRoute.name !== item.name) {
        router.push({ name: item.name, params: item.params });
      } else {
        router.push({ params: item.params });
      }
      state.selectedItem = item;
    },
    disableAllExceptSelected(state, name) {
      let item = null;
      for (var i = 0; i < state.items.length; i++) {
        if (state.items[i].title === name) {
          item = state.items[i];
          state.items[i].classObject["disabled_item"] = false;
          state.items[i].classObject["is-active"] = true;
        } else {
          state.items[i].classObject["disabled_item"] = true;
        }
        // if (router.currentRoute.name !== item.name) {
        //   router.push({ name: item.name, params: item.params });
        // } else {
        //   router.push({ params: item.params });
        // }
        state.selectedItem = item;
      }
    },
    enableAll(state) {
      for (var i = 0; i < state.items.length; i++) {
          state.items[i].classObject["disabled_item"] = false;
      }
    }
  }
};

export default menu;
