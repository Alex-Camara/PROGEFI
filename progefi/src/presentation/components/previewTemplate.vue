<template>
  <div>
    <div id="preview_template_container" class="gray_box">
      <div id="preview_template" v-observe-visibility="visibilityChanged">
        <grid-layout
          id="lay"
          ref="lay"
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
            :static="tag.isStatic"
            :style="getTagStyle(tag)"
          >
            <p>{{ tag.getFullExampleTag() }}</p>
            <button
              id="preview_template_delete"
              class="delete is-small"
              v-if="editMode"
              @click="deleteTag(tag)"
            ></button>
          </grid-item>
        </grid-layout>
      </div>
    </div>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import { mapState } from "vuex";
import Tag from "../models/tag.js";
import domtoimage from "dom-to-image";

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  props: ["template", "generateTemplate", "editMode"],
  data() {
    return {
      title: "Vista previa de la plantilla:",
      columnHeight: 1,
      margin: [0, 0],
      isResizable: true,
      isDraggable: true,
      partialWidth: 1000,
      partialHeight: 0,
      previewPercentageRatio: 0,
      originalTags: [],
      loadingMessage: "Generando plantilla...",
      loadingFinishedMessage: "La plantilla ha sido creada"
    };
  },
  computed: {
    tags: function() {
      let tags = this.template.getTags();
      return tags;
    },
    layoutHeight: {
      get: function() {
        let layoutHeight = this.partialHeight + 158;
        console.log("partial height ");
        console.info(layoutHeight);
        return layoutHeight;
      },
      set: function(newValue) {
        this.layoutHeight = newValue;
      }
    },
    ...mapState("template", {
      tagToCreate: state => state.tagToCreate
    })
  },
  watch: {
    tagToCreate(newValue) {
      this.setPreviewFontSize(newValue);
    },
    async generateTemplate(newValue) {
      if (newValue) {
        this.prepareTemplateCreation();
      }
    }
  },
  methods: {
    visibilityChanged(isVisible) {
      this.setTemplateStyle();
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
        style.display = "flex";
        style.justifyContent = "center";
        style.alignContent = "center";
        style.alignSelf = "center";
        style.alignItems = "center";
        style.fontWeight = "bold";
        style.fontSize = "20px";
        style.color = "#000000";
        tag.setBackgroundColor("#BDBDBD");

        let previewHeight = tag.h;
        previewHeight =
          (tag.h *
            (this.template.getHeight() - this.template.getMarginX() * 2)) /
          this.layoutHeight;
        previewHeight = this.truncate(previewHeight, 1);

        let previewWidth =
          (tag.w *
            (this.template.getWidth() - this.template.getMarginX() * 2)) /
          90;
        previewWidth = this.truncate(previewWidth, 1);

        tag.setExampleValue(previewWidth + " x " + previewHeight);


        return style;
      }
    },
    truncate(value, length) {
      value = value.toString();

      let splittedValue = value.split(".");
      if (splittedValue.length == 2) {
        let decimalValue = splittedValue[1];
        if (decimalValue.length >= length) {
          decimalValue = decimalValue.substr(0, length);
          return splittedValue[0] + "." + decimalValue;
        }
      } else {
        return value;
      }
    },

    async setTemplateStyle() {
      let templateDOMElement = document.getElementById("preview_template");

      templateDOMElement.style.backgroundColor = this.template.getBackgroundColor();
      templateDOMElement.style.color = this.template.getFontColor();
      await this.setPreviewTemplateSize(templateDOMElement);
      await this.setPreviewMargins(templateDOMElement);
    },
    setPreviewTemplateSize(templateDOMElement) {
      return new Promise(resolve => {
        //porcentaje de reducción de las dimensiones de la ficha
        this.previewPercentageRatio =
          (this.partialWidth * 100) / this.template.getWidth();
        this.partialHeight = this.getPreviewDimension(
          this.template.getHeight()
        );
        templateDOMElement.style.width = this.partialWidth + "px";
        templateDOMElement.style.height = this.partialHeight + "px";

        this.columnHeight = 0.8;

        templateDOMElement.classList.add("bordered");
        resolve();
      });
    },
    getPreviewDimension(dimension) {
      return (this.previewPercentageRatio * dimension) / 100;
    },
    getRealDimension(dimension) {
      return (dimension * 100) / this.previewPercentageRatio;
    },
    async setPreviewFontSize(createdTag) {
      let lastTag = this.tags.pop();
      let tag = new Tag();
      tag.setTag(createdTag);

      this.originalTags.push(tag);
      let previewFontSize = lastTag.getFontSize();
      previewFontSize = this.getPreviewDimension(previewFontSize);
      lastTag.setFontSize(previewFontSize);
      await this.tags.push(lastTag);

      //Quita la propiedad estatica a las etiquetas
      for (let i = 0; i < this.tags.length; i++) {
        this.tags[i].setStatic(false);
      }
    },
    setRealTemplateSize() {
      let templateContainerDOMElement = document.getElementById(
        "preview_template_container"
      );
      templateContainerDOMElement.classList.remove("gray_box");
      let templateDOMElement = document.getElementById("preview_template");

      templateDOMElement.style.height = this.template.getHeight() + "px";
      templateDOMElement.style.width = this.template.getWidth() + "px";

      templateDOMElement.classList.remove("bordered");

      this.columnHeight = 1;
    },
    setRealFontSize() {
      for (let i = 0; i < this.tags.length; i++) {
        let fountTag = this.originalTags.find(
          x => x.tagName === this.tags[i].tagName
        );
        this.tags[i].setFontSize(fountTag.getFontSize());
      }
    },
    setPreviewMargins(templateDOMElement) {
      return new Promise(resolve => {
        let layoutDOMElement = document.getElementById("lay");
        let marginX = this.template.getMarginX();
        marginX = this.getPreviewDimension(marginX);

        let marginY = this.template.getMarginY();
        marginY = this.getPreviewDimension(marginY);

        templateDOMElement.style.paddingTop = marginY + "px";
        templateDOMElement.style.paddingBottom = marginY + "px";
        templateDOMElement.style.paddingLeft = marginX + "px";
        templateDOMElement.style.paddingRight = marginX + "px";

        let margin = (marginY * 2 * 100) / 85;

        this.partialHeight = this.partialHeight - margin;
        console.log("margen: ");
        console.info(this.partialHeight);
        layoutDOMElement.style.backgroundColor = "white!important";
        layoutDOMElement.style.width =
                this.partialWidth - marginX * 2 + "px!important";
        resolve();
      });
    },
    setRealMargins() {
      return new Promise(resolve => {
        let templateDOMElement = document.getElementById("preview_template");
        let layoutDOMElement = document.getElementById("lay");
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
        layoutDOMElement.style.backgroundColor = "white!important";
        layoutDOMElement.style.width =
          this.partialWidth - marginX * 2 + "px!important";
        resolve();
      });
    },
    deleteTag(tag) {
      this.$store.commit("template/deleteTag", tag);
      var index = this.originalTags.findIndex(x => x.tagName === tag.tagName);
      this.originalTags.splice(index, 1);
    },
    async prepareTemplateCreation(){
        this.setRealTemplateSize();
        this.setRealFontSize();
        await this.setRealMargins();
        this.isDraggable = false;
        this.isResizable = false;
        let self = this;
        this.$store.dispatch("loading/setActive", {
          active: true,
          message: this.loadingMessage
        });
        setTimeout(async function () {
          //se obtiene el archivo de la fotocolecta y se asignan los datos a la ficha
          self.createTemplate();
        }, 3000);
    },
    async createTemplate() {
      this.template.base64 = await this.generateTemplateFile();
      try {
        await this.template.save();
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
    generateTemplateFile() {
      return new Promise(resolve => {
        domtoimage
          .toBlob(document.getElementById("preview_template"), {
            width: this.template.getWidth(),
            height: this.template.getHeight()
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
    openToast(message) {
      this.$buefy.toast.open(message);
    }
  }
};
</script>

<style>
#preview_template_delete {
  align-self: center;
  justify-self: flex-end;
  justify-content: flex-end;
  justify-items: flex-end;
}

#preview_template {
  justify-self: center;
}
</style>
