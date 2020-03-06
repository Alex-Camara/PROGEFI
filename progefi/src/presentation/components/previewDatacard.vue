<template>
  <div>
    <div id="datacard_template_container">
      <!-- :margin="[2, 2]" -->
      <div id="datacard" ref="datacard" v-observe-visibility="visibilityChanged" v-if="layout">
        <grid-layout
          id="lay"
          ref="lay"
          :v-model="layout"
          :responsive="false"
          :layout="layout"
          :col-num="90"
          :row-height="columnHeight"
          :is-draggable="isDraggable"
          :is-resizable="isResizable"
          :is-mirrored="false"
          :vertical-compact="false"
          :margin="marginX"
          :use-css-transforms="true"
          :preventCollision="false"
          :autoSize="false"
        >
          <grid-item
            v-for="item in layout"
            :x.sync="item.x"
            :y.sync="item.y"
            :w.sync="item.w"
            :h.sync="item.h"
            :i="item.i"
            :key="item.i"
            :style="item.style"
          >
            <img :src="photoCollect.photoCollectPath" v-if="item.i == 'photocollect'" />
            <img :src="collection.getImagePath()" v-if="item.i == 'instituteLogo'" />
            {{item.value}}
          </grid-item>
        </grid-layout>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store/store.js";
import VueGridLayout from "vue-grid-layout";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  props: ["colorsEnabled", "preview"],
  data() {
    return {
      originalColors: [],
      // storeModules: [
      // {
      // name: "datacard",
      // allowedTags: ["collectDate", "collectHour"]
      // },
      // {
      // name: "coordinate",
      // allowedTags: ["latitude", "longitude", "altitude"]
      // },
      // { name: "catalogue", allowedTags: ["catalogue"] },
      // { name: "collection", allowedTags: ["collection", "institute"] },
      // { name: "vegetationType", allowedTags: ["vegetationType"] },
      // { name: "climateType", allowedTags: ["climateType"] },
      // { name: "collector", allowedTags: ["collector"] },
      // { name: "curator", allowedTags: ["curator"] },
      // { name: "device", allowedTags: ["device", "model"] },
      // {
      // name: "location",
      // allowedTags: ["country", "countryState", "municipality", "locality"]
      // },
      // { name: "project", allowedTags: ["project"] },
      // {
      // name: "speciesData",
      // allowedTags: [
      // "scientificName",
      // "commonName",
      // "genus",
      // "order",
      // "family",
      // "speciesClass",
      // "phylum",
      // "kingdom",
      // "sex",
      // "lifeStage"
      // ]
      // }
      // ],
      percentageRatio: null,
      width: null,
      columnHeight: null,
      marginX: [0, 0],
      marginY: [0, 0],
      isResizable: true,
      isDraggable: true,
      validated: false
    };
  },
  computed: {
    ...mapState("template", {
      template: state => state.template,
      fontSizes: state => state.fontSizes,
      tagColors: state => state.tagColors
      // layout: state => state.template.layout
    }),
    ...mapState("datacard", {
      datacard: state => state.datacard
    }),
    ...mapState("addDatacard", {
      photoCollect: state => state.photoCollect
    }),
    ...mapState("climateType", {
      climateType: state => state.climateType
    }),
    ...mapState("vegetationType", {
      vegetationType: state => state.vegetationType
    }),
    ...mapState("catalogue", {
      catalogue: state => state.catalogue
    }),
    ...mapState("collection", {
      collection: state => state.collection
    }),
    ...mapState("collector", {
      collector: state => state.collector
    }),
    ...mapState("curator", {
      curator: state => state.curator,
      curatorState: state => state
    }),
    ...mapState("device", {
      device: state => state.device,
      model: state => state.model
    }),
    ...mapState("speciesData", {
      speciesData: state => state.speciesData
    }),
    ...mapState("project", {
      project: state => state.project
    }),
    ...mapState("location", {
      location: state => state.location
    }),
    layout: {
      get: function() {
        return this.template.layout;
      },
      set: function(newValue) {
        store.state.template.layout = newValue;
      }
    }
  },
  watch: {
    colorsEnabled(newValue, oldValue) {
      if (newValue) {
        this.enableColors();
      } else {
        this.disableColors();
      }
    },
    preview(newValue, oldValue) {
      //if (newValue == false) {
      this.setDatacardStyle();
      //}
    },
    width(newValue, oldValue) {}
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      // console.info(this.datacard);
      if (isVisible) {
        this.setDatacardStyle();
        this.setValues();
        // debugger;
      }
    },
    // Método para ajustar el tamaño del texto segun se requiera
    setFontSize() {
      let originalStyle = this.fontSizes;
      if (this.percentageRatio == 100) {
        for (let i = 0; i < this.layout.length; i++) {
          let originalSize = originalStyle[i];
          this.layout[i].style["font-size"] = originalSize;
        }
      } else {
        for (let i = 0; i < this.layout.length; i++) {
          let counter = i;
          let originalSize = originalStyle[i];
          originalSize = originalSize.split("p");
          originalSize = originalSize[0];
          let fontSize = (this.percentageRatio * originalSize) / 100;
          fontSize = fontSize + "px";
          this.layout[counter].style["font-size"] = fontSize;
        }
      }
    },
    disableColors() {
      let tagColor = this.template.backgroundColor;
      for (let i = 0; i < this.layout.length; i++) {
        this.layout[i].style["background-color"] = tagColor;
      }
      this.isResizable = false;
      this.isDraggable = false;
    },
    enableColors() {
      let tagColors = this.tagColors;
      for (let i = 0; i < this.layout.length; i++) {
        let tagColor = tagColors[i];
        this.layout[i].style["background-color"] = tagColor;
      }
      this.isResizable = true;
      this.isDraggable = true;
    },
    setDatacardStyle() {
      let datatardDOMElement = document.getElementById("datacard");

      datatardDOMElement.style.backgroundColor = this.template.backgroundColor;
      datatardDOMElement.style.color = this.template.fontColor;

      if (this.preview) {
        // Obtenemos la proporción de las dimensiones de la ficha, dado que por limitaciones del monitor, no podemos mostrar la
        // resolución completa
        this.setMinimalSize(datatardDOMElement).then(() => {
          this.setFontSize();
        });
        // Si no es preview, es decir, es la versión final, entonces mostramos las dimensiones originales
      } else {
        var self = this;

        //se inicia el modal de espera
        store.dispatch("loading/setActive", true);

        //se ajusta al tamaño real
        this.setRealSize(datatardDOMElement).then(() => {
          this.setFontSize();
          //el timeout da tiempo de renderizar los cambios al DOM
          setTimeout(async function() {
            //se obtiene el archivo de la fotocolecta y se asignan los datos a la ficha
            self.setDatacard();
          }, 3000);
        });
      }
    },
    setMinimalSize(datatardDOMElement) {
      return new Promise((resolve, reject) => {
        //anchura de la vista previa de la ficha
        let partialWidth = 1050;
        //porcentaje de reducción de las dimensiones de la ficha
        let percentageRatio = (partialWidth * 100) / this.template.width;
        let partialHeight = (percentageRatio * this.template.height) / 100;

        datatardDOMElement.style.height = partialHeight + "px";
        datatardDOMElement.style.width = partialWidth + "px";

        this.percentageRatio = percentageRatio;
        this.width = 75.6;
        this.columnHeight = 0.84;

        let element = document.getElementById("datacard");
        if (element != null) {
          element.classList.add("bordered");
        }
        resolve();
      });
    },
    setRealSize(datatardDOMElement) {
      return new Promise((resolve, reject) => {
        //anchura de las columnas y filas del component vue-grid-layer
        this.width = 90;
        this.columnHeight = 1;
        this.percentageRatio = 100;

        datatardDOMElement.style.height = this.template.height + "px";
        datatardDOMElement.style.width = this.template.width + "px";

        let element = document.getElementById("datacard");
        if (element != null) {
          element.classList.remove("bordered");
        }
        resolve();
      });
    },
    async setDatacard() {
      // this.datacard.setBase64(base64Datacard);
      let deviceId = await store.dispatch("device/createDevice");
      let createdModel = await store.dispatch("device/createModel", deviceId);
      let createdCollector = await store.dispatch("collector/createCollector");
      let curators = await store.dispatch("curator/createCurators");

      this.datacard.setModel(createdModel);
      this.datacard.setCollector(createdCollector);
      this.datacard.setCurators(curators);
      // this.datacard.setDatacardPath(this.photoCollect.photoCollectPath);
      if (
        this.datacard.getPhotocollectPath() ==
        this.photoCollect.photoCollectPath
      ) {
        this.datacard.setPhotocollectPath("do-not-save");
      } else {
        this.datacard.setPhotocollectPath(this.photoCollect.photoCollectPath);
      }

      if (curators.length > 0) {
        this.datacard.validate();
        let base64 = await this.generateDatacard();
        this.datacard.base64 = base64;
      } else {
        this.datacard.invalidate();
      }

      if (this.datacard.getCreationDate() == null) {
        // debugger;
        this.datacard.setCreationDate();
        this.createDatacard(this.datacard);
      } else {
        // debugger;
        this.datacard.setCreationDate();
        this.updateDatacard(this.datacard);
      }
    },
    createDatacard(datacard) {
      store.dispatch("datacard/createDatacard", datacard).then(() => {
        this.$store.dispatch(
          "loading/setLoadingMessage",
          "Creando ficha de fotocolecta..."
        );
        store.dispatch("loading/setActive", false, { root: true });
        this.openToast("¡Ficha de fotocolecta creada!");
        this.$router.push({
          name: "UIShowDataCards",
          params: { askToLeave: false, reloadDatacards: true }
        });
      });
    },
    updateDatacard(datacard) {
      store.dispatch("datacard/updateDatacard", datacard).then(() => {
        store.dispatch("loading/setActive", false, { root: true });
        this.openToast("¡Ficha de fotocolecta validada!");
        this.$router.push({
          name: "UIShowDataCards",
          params: { askToLeave: false, selectedCatalogue: this.catalogue }
        });
      });
    },
    openToast(message) {
      this.$buefy.toast.open(message);
    },
    generateDatacard() {
      return new Promise((resolve, reject) => {
        domtoimage
          .toBlob(document.getElementById("datacard"), {
            width: this.template.width,
            height: this.template.height
          })
          //se convierten el blob a base64 para mandarlo a la capa inferior
          .then(function(blob) {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
              var base64data = reader.result;
              resolve(base64data);
            };
          });
        this.showPreview = false;
      });
    },
    setValues() {
      var tags = this.template.tags;
      var layout = this.template.layout;

      for (let i = 0; i < tags.length; i++) {
        let model = tags[i].model;
        let retrieveMethod = tags[i].retrieveMethod;

        let fullTag = null;

        fullTag = this.assignTagBefore(fullTag, tags[i].tagBefore);
        fullTag = this.assignTag(tags[i].tag, fullTag, model, retrieveMethod);
        fullTag = this.assignTagAfter(fullTag, tags[i].tagAfter);

        // this.setLayoutValues(fullTag);
        var index = layout.findIndex(x => x.i == tags[i].tag);
        layout[index].value = fullTag;
      }
    },
    assignTagBefore(fullTag, tagBefore) {
      if (tagBefore != null) {
        return fullTag + tagBefore + " ";
      } else {
        return "";
      }
    },
    assignTag(tag, fullTag, model, retrieveMethod) {
      if (tag == "curator") {
        return this.curatorState.selectedCuratorsName;
      } else {
        try {
          return this[model][retrieveMethod]();
        } catch (err) {
          debugger;
        }
      }
    },
    assignTagAfter(fullTag, tagAfter) {
      if (tagAfter != null) {
        return fullTag + " " + tagAfter;
      } else {
        return fullTag;
      }
    }
  }
};
</script>

<style lang="scss">
#datacard {
  display: grid;
  transform: scale(1);
  padding: 5px;
}
</style>