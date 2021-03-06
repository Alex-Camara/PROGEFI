import router from "../../router/router";

const menu = {
  namespaced: true,
  state: {
    items: [
      {
        name: "UIUserAccount",
        params: "",
        title: "Cuenta",
        classObject: {
          "is-active": false,
          disabled_item: false
        }
      },
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
    setItemWithParams(state, { name, params }) {
      let item = null;
      for (var i = 0; i < state.items.length; i++) {
        if (name === state.items[i].name) {
          item = state.items[i];
          state.items[i].classObject["is-active"] = true;
        } else {
          state.items[i].classObject["is-active"] = false;
        }
      }
      if (router.currentRoute.name !== item.name) {
        if (params !== null) {
          router.push({ name: item.name, params: params });
        } else {
          router.push({ name: item.name });
        }
      } else {
        router.push({ params: params });
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
      }
        if (router.currentRoute.name !== item.name) {
          router.push({ name: item.name, params: item.params });
        } else {
          router.push({ params: item.params });
        }

        state.selectedItem = item;

    },
    enableAll(state) {
      for (var i = 0; i < state.items.length; i++) {
        state.items[i].classObject["disabled_item"] = false;
      }
    },
    setSelected(state, name){
      let item = null;
      for (var i = 0; i < state.items.length; i++) {
        if (name === state.items[i].name) {
          item = state.items[i];
          state.items[i].classObject["is-active"] = true;
        } else {
          state.items[i].classObject["is-active"] = false;
        }
      }
      state.selectedItem = item;
    }
  }
};

export default menu;
