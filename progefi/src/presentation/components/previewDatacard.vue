<template>
  <div>
    <div id="datacard_template_container">
      <div
        id="datacard"
        ref="datacard"
        v-observe-visibility="visibilityChanged"
      >
        <grid-layout
          id="datacard_lay"
          ref="datacard_lay"
          :v-model="tags"
          :responsive="false"
          :layout="tags"
          :col-num="90"
          :row-height="columnHeight"
          :max-rows="layoutHeight"
          :is-draggable="isDraggable"
          :is-resizable="isResizable"
          :is-mirrored="false"
          :vertical-compact="false"
          :margin="margin"
          :use-css-transforms="true"
          :preventCollision="true"
          :autoSize="false"
        >
          <grid-item
            v-for="tag in tags"
            :x.sync="tag.x"
            :y.sync="tag.y"
            :w.sync="tag.w"
            :h.sync="tag.h"
            :i="tag.i"
            :key="tag.i"
            :is-resizable="tag.isResizable()"
            :is-draggable="tag.isDraggable()"
            :style="getTagStyle(tag)"
          >
            <img
              id="preview_datacard_photocollect"
              :src="photoCollect.photoCollectPath"
              v-if="tag.i == 'photocollect'"
            />
            <img
              :src="collection.getInstituteLogoPath()"
              v-if="tag.i == 'instituteLogo'"
            />
            <p v-if="tag.i != 'photocollect' && tag.i != 'instituteLogo'">{{ tag.getFullExampleTag() }}</p>
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
import Tag from "../models/tag.js";

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  props: ["editMode", "previewMode"],
  data() {
    return {
      originalColors: [],
      originalTags: [],
      previewPercentageRatio: null,
      width: null,
      columnHeight: null,
      margin: [0, 0],
      isResizable: true,
      isDraggable: true,
      validated: false,
      loadingMessage: null,
      loadingFinishedMessage: null,
      partialHeight: ""
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
    layoutHeight: {
      get: function() {
        let layoutHeight = this.partialHeight + 128;
        console.log("partial height ");
        console.info(layoutHeight);
        return Number(layoutHeight);
      },
      set: function(newValue) {
        this.layoutHeight = newValue;
      }
    }
  },
  mounted(){
    this.setDatacardDimensions();
  },
  watch: {
    async editMode(newValue) {
      if (newValue) {
        await this.setOriginalDragAndResizeControls();
      } else {
        await this.setDragAndResizeControlsToFalse();
      }
    },
    previewMode(newValue) {
      if (!newValue) {
        this.setDatacardDimensions();
      }
    },
    curators() {
      this.setValues();
    },
    template(){
      this.setDatacardDimensions();
      this.originalTags = [];
      for (let i = 0; i < this.tags.length; i++) {
        let newTag = new Tag();
        newTag.setTag(this.tags[i]);
        this.originalTags.push(newTag);
      }
    }
  },
  methods: {
    visibilityChanged(isVisible) {
      if (isVisible) {
        this.setValues();
        // this.setImages();
      }
    },
    getTagStyle(tag) {
      if (tag.i !== "photocollect" && tag.i !== "instituteLogo") {
        let style = tag.getStyle(this.template.getFontFamily());
        if (!this.editMode){
          style.backgroundColor = "";
        }
        return style;
      } else {
        let style = tag.getStyle(this.template.getFontFamily());
        let tagHeight = this.getPreviewDimension(tag.h);
        let tagWidth =
                (tag.w * (this.template.getWidth() - this.template.getMarginX() * 2)) /
                90;

        let filePath;
        if (tag.i === "photocollect"){
          filePath = this.photoCollect.photoCollectPath;
        } else{
          filePath= this.collection.instituteLogoPath;
        }
        this.loadImage(filePath).then((image) =>{
          if (image.width > tagWidth) {
            style.maxWidth = tagWidth + "px";
            style.height = "auto";
          }
          if (image.height > tagHeight) {
            style.maxHeight = tagHeight + "px";
            style.width = "auto";
          }
          return style;

        });
      }
    },
    setDragAndResizeControlsToFalse(){
      return new Promise(resolve => {
        for (let i = 0; i < this.tags.length; i++) {
          this.tags[i].setResizable(false);
          this.tags[i].setDraggable(false);
        }
        resolve();
      });
    },
    setOriginalDragAndResizeControls(){
      return new Promise(resolve => {
        for (let i = 0; i < this.tags.length; i++) {
          let fountTag = this.originalTags.find(
                  x => x.tagName === this.tags[i].tagName
          );
          this.tags[i].setResizable(fountTag.isResizable());
          this.tags[i].setDraggable(fountTag.isDraggable());
        }
        resolve();
      });
    },
    loadImage(source) {
      return new Promise(resolve => {
        let img = new Image();

        img.onload = function() {
          resolve(img);
        };

        img.src = source;
      });
    },
    setRealFontSize() {
      return new Promise(resolve => {
        for (let i = 0; i < this.tags.length; i++) {
          let fountTag = this.originalTags.find(
            x => x.tagName === this.tags[i].tagName
          );
          this.tags[i].setFontSize(fountTag.getFontSize());
        }
        resolve();
      });
    },
    async setPreviewFontSize() {
      return new Promise(resolve => {
        for (let i = 0; i < this.tags.length; i++) {
          let previewFontSize = this.getPreviewDimension(
            this.tags[i].getFontSize()
          );
          this.tags[i].setFontSize(previewFontSize);
        }
        resolve();
      });
    },
    setPreviewMargins() {
      return new Promise(resolve => {
        let datatardDOMElement = document.getElementById("datacard");
        let layoutDOMElement = document.getElementById("datacard_lay");
        let marginX = this.template.getMarginX();
        marginX = this.getPreviewDimension(marginX);

        let marginY = this.template.getMarginY();
        marginY = this.getPreviewDimension(marginY);

        datatardDOMElement.style.paddingTop = marginY + "px";
        datatardDOMElement.style.paddingBottom = marginY + "px";
        datatardDOMElement.style.paddingLeft = marginX + "px";
        datatardDOMElement.style.paddingRight = marginX + "px";

        let margin = (marginY * 2 * 100) / 85;

        this.partialHeight = this.partialHeight - margin;
        console.log("margen: ");
        console.info(this.partialHeight);
        layoutDOMElement.style.width =
          this.partialWidth - marginX * 2 + "px!important";
        resolve();
      });
    },
    getPreviewDimension(dimension) {
      return (this.previewPercentageRatio * dimension) / 100;
    },
    getRealDimension(dimension) {
      return (dimension * 100) / this.previewPercentageRatio;
    },
    async setDatacardDimensions() {
      let datatardDOMElement = document.getElementById("datacard");

      datatardDOMElement.style.backgroundColor = this.template.backgroundColor;
      datatardDOMElement.style.color = this.template.fontColor;

      if (this.previewMode) {
        // Obtenemos la proporción de las dimensiones de la ficha, dado que por limitaciones del monitor, no podemos mostrar la
        // resolución completa
        this.setMinimalSize(datatardDOMElement).then(async () => {
          await this.setPreviewFontSize();
          await this.setPreviewMargins();
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
        this.setRealSize(datatardDOMElement).then(async () => {
          await this.setRealFontSize();
          await this.setDragAndResizeControlsToFalse();
          await this.setRealMargins();
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
        let previewPercentageRatio = (partialWidth * 100) / this.template.width;
        this.partialHeight =
          (previewPercentageRatio * this.template.height) / 100;

        datatardDOMElement.style.height = this.partialHeight + "px";
        datatardDOMElement.style.width = partialWidth + "px";

        this.previewPercentageRatio = previewPercentageRatio;
        // this.width = 75.6;
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
        // this.width = 90;
        this.previewPercentageRatio = 100;

        datatardDOMElement.style.height = this.template.height + "px";
        datatardDOMElement.style.width = this.template.width + "px";

        this.columnHeight = 1;

        let element = document.getElementById("datacard");
        if (element != null) {
          element.classList.remove("bordered");
        }
        resolve();
      });
    },
    setRealMargins() {
      return new Promise(resolve => {
        let templateDOMElement = document.getElementById("datacard");
        let layoutDOMElement = document.getElementById("datacard_lay");
        let marginX = this.template.getMarginX();
        let marginY = this.template.getMarginY();

        templateDOMElement.style.paddingTop = marginY + "px";
        templateDOMElement.style.paddingBottom = marginY + "px";
        templateDOMElement.style.paddingLeft = marginX + "px";
        templateDOMElement.style.paddingRight = marginX + "px";

        let previousMarginY = this.getPreviewDimension(marginY);
        let previousDifferenceMargin = (previousMarginY * 2 * 100) / 95;
        let margin = (marginY * 2 * 100) / 95;

        this.partialHeight = this.partialHeight + previousDifferenceMargin;
        this.partialHeight = this.partialHeight - margin;
        layoutDOMElement.style.width =
          this.partialWidth - marginX * 2 + "px!important";
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
      try {
        this.datacard.save();
        this.$emit("exitComponent");
        this.openToast(this.loadingFinishedMessage);
      } catch (error) {
        this.openToast("Ha ocurrido un error con la base de datos");
      } finally {
        await this.$store.dispatch(
          "loading/setActive",
          { active: false, message: null },
          { root: true }
        );
      }
    },
    async updateDatacard() {
      try {
        this.datacard.update();
        this.$emit("exitComponent");
        this.openToast(this.loadingFinishedMessage);
      } catch (error) {
        this.openToast("Ha ocurrido un error con la base de datos");
      } finally {
        await this.$store.dispatch(
          "loading/setActive",
          { active: false, message: null },
          { root: true }
        );
      }
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
      });
    },
    setValues() {
      for (let i = 0; i < this.tags.length; i++) {
        if (
          this.tags[i].tagName !== "photocollect" &&
          this.tags[i].tagName !== "instituteLogo"
        ) {
          let model = this.tags[i].model;
          let modelAttribute = this.tags[i].modelAttribute;

          let tagValue = "";

          tagValue = this.assignTag(
            this.tags[i].tagName,
            tagValue,
            model,
            modelAttribute
          );

          this.tags[i].setExampleValue(tagValue);
        }
      }
    },
    assignTag(tagName, fullTag, model, modelAttribute) {
      if (tagName === "curator") {
        return fullTag + this.datacard.getFormattedCurators();
      } else {
        if (modelAttribute != null) {
          try {
            let rawModelAttributes = modelAttribute.split(".");
            let modelAttributes = [];
            let finalAttribute = null;
            for (let i = 0; i < rawModelAttributes.length; i++) {
              let element = rawModelAttributes[i];
              element = element.charAt(0).toUpperCase() + element.slice(1);
              element = "get" + element;
              modelAttributes.push(element);
            }

            for (let j = 0; j < modelAttributes.length; j++) {
              if (j === 0) {
                finalAttribute = this[model][modelAttributes[j]]();
              } else {
                finalAttribute = finalAttribute[modelAttributes[j]]();
              }
            }
            return finalAttribute;
          } catch (err) {
            debugger;
          }
        }
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
