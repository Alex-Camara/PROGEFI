<template>
  <div>
    <div id="datacard_template_container">
      <!-- :margin="[2, 2]" -->
      <div
        id="datacard"
        ref="datacard"
        v-observe-visibility="visibilityChanged"
        v-if="layout"
      >
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
            :style="getStyle(item.i)"
          >
            <img
              :src="photoCollect.photoCollectPath"
              v-if="item.i == 'photocollect'"
            />
            <img
              :src="collection.getInstituteLogoPath()"
              v-if="item.i == 'instituteLogo'"
            />
            {{ item.value }}
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

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  props: ["colorsEnabled", "preview"],
  data() {
    return {
      originalColors: [],
      percentageRatio: null,
      width: null,
      columnHeight: null,
      marginX: [0, 0],
      marginY: [0, 0],
      isResizable: true,
      isDraggable: true,
      validated: false,
      loadingMessage: null,
      loadingFinishedMessage: null
    };
  },
  computed: {
    ...mapState("template", {}),
    ...mapState("datacard", {
      datacard: state => state.datacard,
      template: state => state.datacard.getTemplate(),
      fontSizes: state => state.datacard.getTemplate().getFontSizes(),
      tagColors: state => state.datacard.getTemplate().getTagColors(),
      tags: state => state.datacard.getTemplate().getTags(),
      collect: state => state.datacard.getCollect(),
      climateType: state => state.datacard.getCollect().getClimateType(),
      vegetationType: state => state.datacard.getCollect().getVegetationType(),
      catalogue: state => state.datacard.getCatalogue(),
      collection: state => state.datacard.getCatalogue().getCollection(),
      collector: state => state.datacard.getCollect().getCollector(),
      curators: state => state.datacard.getCurators(),
      device: state =>
        state.datacard
          .getCollect()
          .getModel()
          .getDevice(),
      project: state => state.datacard.getCollect().getProject(),
      species: state =>
        state.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies(),
      specimen: state => state.datacard.getCollect().getSpecimen()
    }),
    ...mapState("addDatacard", {
      photoCollect: state => state.photoCollect
    }),
    ...mapState("curator", {
      curatorState: state => state,
      curatorsName: state => state.selectedCuratorsName
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
    curators() {
      this.setValues();
    }
  },
  methods: {
    visibilityChanged(isVisible) {
      if (isVisible) {
        this.setDatacardStyle();
        this.setValues();
      }
    },
    // Método para ajustar el tamaño del texto segun se requiera
    setFontSize() {
      let originalStyle = this.fontSizes;
      if (this.percentageRatio === 100) {
        for (let i = 0; i < this.layout.length; i++) {
          this.tags[i].style["font-size"] = originalStyle[i];
        }
      } else {
        for (let i = 0; i < this.layout.length; i++) {
          let counter = i;
          let originalSize = originalStyle[i];
          originalSize = originalSize.split("p");
          originalSize = originalSize[0];
          let fontSize = (this.percentageRatio * originalSize) / 100;
          fontSize = fontSize + "px";
          this.tags[counter].style["font-size"] = fontSize;
        }
      }
    },
    disableColors() {
      let tagColor = this.template.backgroundColor;
      for (let i = 0; i < this.tags.length; i++) {
        this.tags[i].style["background-color"] = tagColor;
      }
      this.isResizable = false;
      this.isDraggable = false;
    },

    enableColors() {
      let tagColors = this.tagColors;
      for (let i = 0; i < this.tags.length; i++) {
        this.tags[i].style["background-color"] = tagColors[i];
      }
      this.isResizable = true;
      this.isDraggable = true;
    },
    getStyle(tagValue) {
      var foundTag = this.tags.find(x => x.tag === tagValue);
      // //debugger;
      return foundTag.style;
    },
    async setDatacardStyle() {
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
        await this.setLoadingMessage();
        //se inicia el modal de espera
        store.dispatch("loading/setActive", {
          active: true,
          message: this.loadingMessage
        });

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
    setLoadingMessage() {
      return new Promise(resolve => {
        if (this.datacard.getCurators().length > 0) {
          this.loadingMessage = "Creando ficha de fotocolecta...";
          this.loadingFinishedMessage = "¡Ficha de fotocolecta creada!";
          resolve();
        } else {
          this.loadingMessage = "Creando borrador de ficha...";
          this.loadingFinishedMessage = "Se guardó el borrador de la ficha...";
          resolve();
        }
      });
    },
    setMinimalSize(datatardDOMElement) {
      return new Promise(resolve => {
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
      return new Promise(resolve => {
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
      await this.datacard
        .getCollect()
        .getModel()
        .save();
      await this.datacard
        .getCollect()
        .getCollector()
        .save();
      await this.datacard.saveCurators();
      if (
        this.datacard.getPhotocollectPath() ===
        this.photoCollect.photoCollectPath
      ) {
        this.datacard.setPhotocollectPath("do-not-save");
      } else {
        this.datacard.setPhotocollectPath(this.photoCollect.photoCollectPath);
      }

      if (this.datacard.getCurators().length > 0) {
        this.datacard.validate();
        this.datacard.base64 = await this.generateDatacard();
      } else {
        this.datacard.invalidate();
      }

      //se va a crear por primera vez
      if (this.datacard.getCreationDate() == null) {
        this.datacard.setCreationDate();
        this.createDatacard(this.datacard);
      } else {
        //se va a actualizar
        this.datacard.setCreationDate();
        this.updateDatacard(this.datacard);
      }
    },
    async createDatacard() {
      await this.datacard.save();
      this.$emit("exitComponent");
      await this.$store.dispatch(
        "loading/setActive",
        { active: false, message: null },
        { root: true }
      );
      this.openToast(this.loadingFinishedMessage);
      // await this.$router.push({
      //   name: "UIShowDataCards",
      //   params: { askToLeave: false, reloadDatacards: true }
      // });
    },
    async updateDatacard() {
      await this.datacard.update();
      this.$emit("exitComponent");
      await this.$store.dispatch(
        "loading/setActive",
        { active: false, message: null },
        { root: true }
      );
      this.openToast(this.loadingFinishedMessage);
      // await this.$router.push({
      //   name: "UIShowDataCards",
      //   params: { askToLeave: false, selectedCatalogue: this.catalogue }
      // });
    },
    openToast(message) {
      this.$buefy.toast.open(message);
    },
    generateDatacard() {
      return new Promise(resolve => {
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
        let modelAttribute = tags[i].modelAttribute;
        // //debugger;

        let fullTag = "";

        fullTag = this.assignTagBefore(fullTag, tags[i].tagBefore);
        fullTag = this.assignTag(tags[i].tag, fullTag, model, modelAttribute);
        fullTag = this.assignTagAfter(fullTag, tags[i].tagAfter);

        // this.setLayoutValues(fullTag);
        var index = layout.findIndex(x => x.i === tags[i].tag);
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
    assignTag(tag, fullTag, model, modelAttribute) {
      //debugger;
      if (tag === "curator") {
        return fullTag + this.datacard.getFormattedCurators();
      } else {
        if (modelAttribute != null) {
          try {
            let rawModelAttributes = modelAttribute.split(".");
            // //debugger;
            let modelAttributes = [];
            let finalAttribute = null;
            for (let i = 0; i < rawModelAttributes.length; i++) {
              let element = rawModelAttributes[i];
              element = element.charAt(0).toUpperCase() + element.slice(1);
              element = "get" + element;
              modelAttributes.push(element);
            }

            for (let j = 0; j < modelAttributes.length; j++) {
              // const element = modelAttributes[i];
              if (j === 0) {
                //debugger;
                finalAttribute = this[model][modelAttributes[j]]();
                //debugger;
              } else {
                //debugger;
                finalAttribute = finalAttribute[modelAttributes[j]]();
                //debugger;
              }
            }

            //debugger;

            return finalAttribute;
          } catch (err) {
            debugger;
          }
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
