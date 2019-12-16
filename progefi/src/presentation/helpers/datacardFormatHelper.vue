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
            <img :src="collection.institute.imagePath" v-if="item.i == 'instituteLogo'" />
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
      storeModules: [
        {
          name: "datacard",
          allowedTags: ["collectDate", "collectHour"]
        },
        {
          name: "coordinate",
          allowedTags: ["latitude", "longitude", "altitude"]
        },
        { name: "catalogue", allowedTags: ["catalogue"] },
        { name: "collection", allowedTags: ["collection", "institute"] },
        { name: "vegetationType", allowedTags: ["vegetationType"] },
        { name: "climateType", allowedTags: ["climateType"] },
        { name: "collector", allowedTags: ["collector"] },
        { name: "curator", allowedTags: ["curator"] },
        { name: "device", allowedTags: ["device", "model"] },
        {
          name: "location",
          allowedTags: ["country", "countryState", "municipality", "locality"]
        },
        { name: "project", allowedTags: ["project"] },
        {
          name: "speciesData",
          allowedTags: [
            "scientificName",
            "commonName",
            "genus",
            "order",
            "family",
            "speciesClass",
            "phylum",
            "kingdom",
            "sex",
            "lifeStage"
          ]
        }
      ],
      percentageRatio: null,
      width: null,
      columnHeight: null,
      marginX: [0, 0],
      marginY: [0, 0],
      isResizable: true,
      isDraggable: true
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
      photoCollect: state => state.photoCollect,
      datacard: state => state.datacard
    }),
    ...mapState("climateType", {
      climateType: state => state
    }),
    ...mapState("coordinate", {
      coordinate: state => state
    }),
    ...mapState("vegetationType", {
      vegetationType: state => state
    }),
    ...mapState("catalogue", {
      catalogue: state => state
    }),
    ...mapState("collection", {
      collection: state => state
    }),
    ...mapState("collector", {
      collector: state => state
    }),
    ...mapState("curator", {
      curator: state => state
    }),
    ...mapState("device", {
      device: state => state
    }),
    ...mapState("speciesData", {
      speciesData: state => state
    }),
    ...mapState("project", {
      project: state => state
    }),
    ...mapState("location", {
      location: state => state
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
      if (isVisible) {
        this.setDatacardStyle();
        this.setValues();
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
            let base64 = await self.generateDatacard();
            self.setDatacard(base64);
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
    async setDatacard(base64Datacard) {
      let datacard = {};
      datacard.base64 = base64Datacard;
      datacard.code = this.catalogue.catalogue.code;
      datacard.collectDate = this.datacard.collectDate.value;
      datacard.longitude = this.coordinate.longitude.value;
      datacard.latitude = this.coordinate.latitude.value;
      datacard.altitude = this.coordinate.altitude.value;
      datacard.country = this.location.country.name;
      datacard.countryState = this.location.countryState.name;
      datacard.municipality = this.location.municipality.name;
      datacard.locality = this.location.locality.name;
      datacard.scientificName = this.speciesData.scientificName.name;
      datacard.commonName = this.speciesData.commonName.name;
      datacard.genus = this.speciesData.genus.name;
      datacard.family = this.speciesData.family.name;
      datacard.order = this.speciesData.order.name;
      datacard.speciesClass = this.speciesData.speciesClass.name;
      datacard.phylum = this.speciesData.phylum.name;
      datacard.kingdom = this.speciesData.kingdom.name;
      datacard.catalogueId = this.catalogue.catalogue.id;
      datacard.collectionId = this.collection.collection.id;
      datacard.projectId = this.project.project.id;
      let sexId = store.getters["speciesData/getSexId"];
      let lifeStageId = store.getters["speciesData/getLifeStageId"];
      let climateTypeId = store.getters["climateType/getClimateTypeId"];
      let vegetationTypeId =
        store.getters["vegetationType/getVegetationTypeId"];

      if (isNaN(sexId)) {
        datacard.sex = sexId;
        datacard.sexId = null;
      } else {
        datacard.sex = null;
        datacard.sexId = sexId;
      }
      if (isNaN(lifeStageId)) {
        datacard.lifeStage = lifeStageId;
        datacard.lifeStageId = null;
      } else {
        datacard.lifeStage = null;
        datacard.lifeStageId = lifeStageId;
      }
      if (isNaN(climateTypeId)) {
        datacard.climateType = climateTypeId;
        datacard.climateTypeId = null;
      } else {
        datacard.climateType = null;
        datacard.climateTypeId = climateTypeId;
      }
      if (isNaN(vegetationTypeId)) {
        datacard.vegetationType = vegetationTypeId;
        datacard.vegetationTypeId = null;
      } else {
        datacard.vegetationType = null;
        datacard.vegetationTypeId = vegetationTypeId;
      }

      datacard.deviceId = await store.dispatch("device/createDevice");
      datacard.modelId = await store.dispatch(
        "device/createModel",
        datacard.deviceId
      );
      datacard.collectorId = await store.dispatch("collector/createCollector");
      this.createDatacard(datacard);
    },
    createDatacard(datacard) {
      store.dispatch("datacard/createDatacard", datacard).then(() => {
        store.dispatch("loading/setActive", false, { root: true });
        this.openToast();
        this.$router.push({
          name: "UIShowDataCards",
          params: { askToLeave: false }
        });
      });
    },
    openToast() {
      this.$buefy.toast.open("¡Ficha de fotocolecta creada!");
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

      for (let i = 0; i < this.storeModules.length; i++) {
        let storeModule = this.storeModules[i];
        for (let j = 0; j < storeModule.allowedTags.length; j++) {
          let tag = storeModule.allowedTags[j];
          let foundTag = tags.filter(obj => {
            return obj.tag === tag;
          });
          this.assignTags(layout, storeModule, foundTag[0]);
        }
      }
    },
    assignTags(layout, storeModule, tag) {
      if (tag !== undefined) {
        var index = layout.findIndex(x => x.i == tag.tag);
        let fullTag = null;

        fullTag = this.assignBeforeTag(tag);
        fullTag = this.assignTag(storeModule, fullTag, tag);
        fullTag = this.assignAfterTag(fullTag, tag);
        layout[index].value = fullTag;
      }
    },
    assignBeforeTag(tag) {
      if (tag.tagBefore != null) {
        return tag.tagBefore + " ";
      } else {
        return "";
      }
    },
    assignTag(storeModule, fullTag, tag) {
      if (tag.valueName != null) {
        return fullTag + this[storeModule.name][tag.tagValue][tag.valueName];
      } else {
        return fullTag + this[storeModule.name][tag.tagValue];
      }
    },
    assignAfterTag(fullTag, tag) {
      if (tag.tagAfter != null) {
        return fullTag + " " + tag.tagAfter;
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