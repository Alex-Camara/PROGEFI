<template>
  <div id="create_tag_container" class="gray_box">
    <div id="create_tag_fields_title">{{ title }}</div>
    <div id="create_tag_fields">
      <b-field
        id="create_tag_before_tag_input_field"
        custom-class="is-small"
        label="Etiqueta anterior:"
      >
        <template slot="label">
          <required-field-helper
            :name="previousTagText"
            :valid="isTagBeforeValid"
          ></required-field-helper>
        </template>
        <input
          id="create_tag_before_tag_input"
          class="input"
          v-model="tagBefore"
        />
      </b-field>

      <div class="create_tag_plus_icon_div">
        <img class="create_tag_plus_icon" src="../assets/plus.png" />
      </div>

      <b-field
        id="create_tag_tag_name_input_field"
        custom-class="is-small"
        label="Etiqueta:"
      >
        <template slot="label">
          <required-field-helper
            :name="actualTagText"
            :valid="isTagNameValid"
          ></required-field-helper>
        </template>
        <div class="select">
          <select
            id="create_tag_tag_name_select"
            placeholder="Selecciona una etiqueta"
            v-model="selectedTagName"
            @change="setTextControlValues"
          >
            <option
              v-for="tag in tagNames"
              :key="tag.tagName"
              :value="tag"
              :disabled="isTagNameAssigned(tag.tagName)"
              >{{ tag.tagPlaceholder }}</option
            >
          </select>
        </div>
      </b-field>

      <div class="create_tag_plus_icon_div">
        <img class="create_tag_plus_icon" src="../assets/plus.png" />
      </div>

      <b-field
        id="create_tag_after_tag_input_field"
        custom-class="is-small"
        label="Etiqueta posterior:"
      >
        <template slot="label">
          <required-field-helper
            :name="nextTagText"
            :valid="isTagAfterValid"
          ></required-field-helper>
        </template>
        <input
          id="create_tag_after_tag_input"
          class="input"
          v-model="tagAfter"
        />
      </b-field>
    </div>
    <div class="space"></div>
    <div id="create_tag_style">
      <div id="create_tag_style_font_weight">
        <div
          id="create_tag_style_font_weight_italics"
          class="create_tag_style_button"
          @click="changeFontStyle()"
          @mouseleave="setHelpText('', false)"
          @mouseenter="setHelpText(helpTextItalics, true)"
        >
          <img class="create_tag_style_icon" src="../assets/italic.png" />
        </div>
        <div
          id="create_tag_style_font_weight_bold"
          class="create_tag_style_button"
          @click="changeFontWeight()"
          @mouseleave="setHelpText('', false)"
          @mouseenter="setHelpText(helpTextBold, true)"
        >
          <img class="create_tag_style_icon" src="../assets/bold.png" />
        </div>
      </div>

      <div class="separator"></div>

      <div id="create_tag_style_font_alignment">
        <div
          id="create_tag_style_font_alignment_left"
          class="create_tag_style_button"
          @click="setTextAlignment('left')"
          @mouseleave="setHelpText('', false)"
          @mouseenter="setHelpText(helpTextTextLeft, true)"
        >
          <img class="create_tag_style_icon" src="../assets/left_text.png" />
        </div>
        <div
          id="create_tag_style_font_alignment_center"
          class="create_tag_style_button"
          @click="setTextAlignment('center')"
          @mouseleave="setHelpText('', false)"
          @mouseenter="setHelpText(helpTextTextCenter, true)"
        >
          <img class="create_tag_style_icon" src="../assets/center_text.png" />
        </div>
        <div
          id="create_tag_style_font_alignment_right"
          class="create_tag_style_button"
          @click="setTextAlignment('right')"
          @mouseleave="setHelpText('', false)"
          @mouseenter="setHelpText(helpTextTextRight, true)"
        >
          <img class="create_tag_style_icon" src="../assets/right_text.png" />
        </div>
      </div>

      <div class="separator"></div>

      <div id="create_tag_style_drag_and_resize">
        <div
          id="create_tag_style_drag"
          class="create_tag_style_button"
          @click="setDraggable"
          @mouseleave="setHelpText('', false)"
          @mouseenter="setHelpText(helpTextDrag, true)"
        >
          <img class="create_tag_style_icon" src="../assets/drag.png" />
        </div>
        <div
          id="create_tag_style_resize"
          class="create_tag_style_button"
          @click="setResizable"
          @mouseleave="setHelpText('', false)"
          @mouseenter="setHelpText(helpTextResize, true)"
        >
          <img class="create_tag_style_icon" src="../assets/resize.png" />
        </div>
      </div>

      <div class="separator"></div>

      <b-field
        id="create_tag_font_size_input_field"
        custom-class="is-small"
        label="Tamaño:"
      >
        <template slot="label">
          <required-field-helper
            :name="'Tamaño:'"
            :valid="isFontSizeValid"
          ></required-field-helper>
        </template>
        <input
          id="create_tag_font_size_input"
          class="input"
          v-model="fontSize"
        />
      </b-field>

      <div id="create_tag_add_tag_button_div">
        <button
          id="create_tag_add_tag_button"
          class="button is-secondary"
          :disabled="disabledAddTagButton"
          @click="createTag"
        >
          {{ addTagButtonText }}
        </button>
      </div>
    </div>

    <hr />

    <div id="create_tag_preview">
      <p>{{ previewTagText }}</p>

      <!-- <div> -->
      <div id="create_tag_preview_tag" :style="getTagStyle()">
        <p>{{ fullTag }}</p>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import requiredFieldHelper from "../helpers/requiredFieldHelper.vue";
import Tag from "../models/tag.js";
import { mapState } from "vuex";

export default {
  components: {
    "required-field-helper": requiredFieldHelper
  },
  props: ["template"],
  data() {
    return {
      tag: new Tag(),
      selectedTagName: {
        tagName: "",
        model: "",
        modelAttribute: "",
        tagPlaceholder: "",
        example: ""
      },
      tagNames: [
        {
          tagName: "altitude",
          model: "collect",
          modelAttribute: "altitude",
          tagPlaceholder: "Altitud",
          example: "2000"
        },
        {
          tagName: "latitude",
          model: "collect",
          modelAttribute: "latitude",
          tagPlaceholder: "Latitud",
          example: "98.236"
        },
        {
          tagName: "DMSLatitude",
          model: "collect",
          modelAttribute: "DMSLatitude",
          tagPlaceholder: "Latitud DMS",
          example: "19° 43' 12''"
        },
        {
          tagName: "longitude",
          model: "collect",
          modelAttribute: "longitude",
          tagPlaceholder: "Longitud",
          example: "19.236"
        },
        {
          tagName: "DMSLongitude",
          model: "collect",
          modelAttribute: "DMSLongitude",
          tagPlaceholder: "Longitud DMS",
          example: "23° 87' 12''"
        },
        {
          tagName: "device",
          model: "collect",
          modelAttribute: "model.device.name",
          tagPlaceholder: "Dispositivo",
          example: "motorola"
        },
        {
          tagName: "vegetationType",
          model: "collect",
          modelAttribute: "vegetationType.name",
          tagPlaceholder: "Tipo de vegetación",
          example: "Bosque mesófilo"
        },
        {
          tagName: "climateType",
          model: "collect",
          modelAttribute: "climateType.code",
          tagPlaceholder: "Tipo de clima",
          example: "A('w)"
        },
        {
          tagName: "collection",
          model: "datacard",
          modelAttribute: "catalogue.collection.name",
          tagPlaceholder: "Nombre de la colección",
          example: "Colección fotográfica de vertebrados"
        },
        {
          tagName: "entityName",
          model: "datacard",
          modelAttribute: "catalogue.collection.entityName",
          tagPlaceholder: "Nombre de la entidad",
          example: "Universidad Veracruzana"
        },
        {
          tagName: "catalogue",
          model: "datacard",
          modelAttribute: "catalogue.name",
          tagPlaceholder: "Catálogo",
          example: "Mamíferos"
        },
        {
          tagName: "collector",
          model: "collect",
          modelAttribute: "collector.name",
          tagPlaceholder: "Nombre del colector",
          example: "Alan Yoset Garcia Cruz"
        },
        {
          tagName: "model",
          model: "collect",
          modelAttribute: "model.name",
          tagPlaceholder: "Modelo del dispositivo",
          example: "moto g5"
        },
        {
          tagName: "collectDate",
          model: "collect",
          modelAttribute: "formattedCollectDate",
          tagPlaceholder: "Fecha de colecta",
          example: "14/02/2019"
        },
        {
          tagName: "collectHour",
          model: "collect",
          modelAttribute: "formattedCollectHour",
          tagPlaceholder: "Hora de colecta",
          example: "10:34"
        },
        {
          tagName: "scientificName",
          model: "species",
          modelAttribute: "scientificName",
          tagPlaceholder: "Nombre científico",
          example: "Felis catus"
        },
        {
          tagName: "sexName",
          model: "specimen",
          modelAttribute: "sex.name",
          tagPlaceholder: "Sexo del espécimen",
          example: "Hembra"
        },
        {
          tagName: "sexSymbol",
          model: "specimen",
          modelAttribute: "sex.symbol",
          tagPlaceholder: "Sexo del espécimen (Símbolo)",
          example: "♀"
        },
        {
          tagName: "lifeStage",
          model: "specimen",
          modelAttribute: "lifeStage.name",
          tagPlaceholder: "Etapa de vida del espécimen",
          example: "Juvenil"
        },
        {
          tagName: "country",
          model: "collect",
          modelAttribute: "country",
          tagPlaceholder: "País",
          example: "México"
        },
        {
          tagName: "countryState",
          model: "collect",
          modelAttribute: "countryState",
          tagPlaceholder: "Estado",
          example: "Veracruz"
        },
        {
          tagName: "municipality",
          model: "collect",
          modelAttribute: "municipality",
          tagPlaceholder: "Municipio",
          example: "Xalapa"
        },
        {
          tagName: "locality",
          model: "collect",
          modelAttribute: "locality",
          tagPlaceholder: "Localidad",
          example: "Coatepec"
        },
        {
          tagName: "curator",
          model: "datacard",
          modelAttribute: "curator.previewName",
          tagPlaceholder: "Curador",
          example: "Christian Alejandro Delfín Alfonso"
        },
        {
          tagName: "creator",
          model: "user",
          modelAttribute: "fullName",
          tagPlaceholder: "Creador de la ficha",
          example: "María Julíeta Carmen Quiroz"
        },
        {
          tagName: "collectorCode",
          model: "datacard",
          modelAttribute: "collectorCode",
          tagPlaceholder: "Código del colector",
          example: "CADA 00001"
        },
        {
          tagName: "creationDate",
          model: "datacard",
          modelAttribute: "formattedCreationDate",
          tagPlaceholder: "Fecha de creación",
          example: "20/01/2020"
        },
        {
          tagName: "creationHour",
          model: "datacard",
          modelAttribute: "formattedCreationHour",
          tagPlaceholder: "Hora de creación",
          example: "10:34"
        },
        {
          tagName: "code",
          model: "datacard",
          modelAttribute: "code",
          tagPlaceholder: "Código de ficha",
          example: "IIBUV-MAM 00001f"
        },
        {
          tagName: "project",
          model: "collect",
          modelAttribute: "project.name",
          tagPlaceholder: "Nombre del proyecto",
          example: "Captura de mamíferos en la costa"
        },
        {
          tagName: "observations",
          model: "specimen",
          modelAttribute: "observations",
          tagPlaceholder: "Observaciones",
          example: "Felino de dimensiones normales."
        },
        {
          tagName: "photocollect",
          model: "",
          modelAttribute: "",
          tagPlaceholder: "Fotocolecta",
          example: "Fotocolecta"
        },
        {
          tagName: "entityAcronym",
          model: "datacard",
          modelAttribute: "catalogue.collection.entityAcronym",
          tagPlaceholder: "Acrónimo de la entidad",
          example: "UV"
        },
        {
          tagName: "instituteAcronym",
          model: "datacard",
          modelAttribute: "catalogue.collection.instituteAcronym",
          tagPlaceholder: "Acrónimo del instituto",
          example: "IIBUV"
        },
        {
          tagName: "instituteName",
          model: "datacard",
          modelAttribute: "catalogue.collection.instituteName",
          tagPlaceholder: "Nombre del instituto",
          example: "Instituto de Investigaciones Biológicas"
        },
        {
          tagName: "instituteLogo",
          model: "",
          modelAttribute: "",
          tagPlaceholder: "Logo de la institución",
          example: "Logo de la institución"
        }
      ],
      assignedTagNames: [],
      title: "Añadir etiqueta",
      addTagButtonText: "Agregar etiqueta",
      previewTagText: "Vista previa de la etiqueta:",
      previousTagText: "Texto anterior:",
      nextTagText: "Texto posterior:",
      actualTagText: "Valor:",
      helpTextBold: "Negritas",
      helpTextItalics: "Italicas",
      helpTextTextCenter: "Texto alineado al centro",
      helpTextTextLeft: "Texto alineado a la izquierda",
      helpTextTextRight: "Texto alineado a la derecha",
      helpTextDrag:
        "Selecciona para establecer si la etiqueta va a poder ser arrastrada",
      helpTextResize:
        "Selecciona para establecer si la etiqueta va a poder ser redimensionada"
    };
  },
  mounted() {
    let self = this;
    window.addEventListener("load", function(event) {
      self.setTextControlValues();
    });
  },
  computed: {
    ...mapState("template", {
      tagToDelete: state => state.tagToDelete
    }),
    templateFontSize: function() {
      return this.template.getFontSize();
    },
    templateFontFamily: function() {
      return this.template.getFontFamily();
    },
    isTagNameValid: function() {
      return this.tag.getTagNameValid();
    },
    isTagBeforeValid: function() {
      return this.tag.getTagBeforeValid();
    },
    isTagAfterValid: function() {
      return this.tag.getTagAfterValid();
    },
    isFontSizeValid: function() {
      return this.tag.getFontSizeValid();
    },
    isFontFamilyValid: function() {
      return this.template.getFontFamilyValid();
    },
    isHeightValid: function() {
      return this.template.getHeightValid();
    },
    tags: function() {
      return this.template.getTags();
    },
    fullTag: function() {
      return this.tag.getFullExampleTag();
    },
    disabledAddTagButton: function() {
      return !(
        this.isTagAfterValid.isValid &&
        this.isTagBeforeValid.isValid &&
        this.isTagNameValid.isValid
      );
    },
    tagBefore: {
      get: function() {
        let tagBefore = this.tag.getTagBefore();
        if (this.tag.getTagBeforeValid().message == "temporary error") {
          this.addShakeEffect("create_tag_before_tag_input");
        }
        return tagBefore;
      },
      set: function(newValue) {
        this.tag.setTagBefore(newValue);
      }
    },
    tagName: {
      get: function() {
        let tagName = this.tag.getTagName();
        if (this.tag.getTagNameValid().message == "temporary error") {
          this.addShakeEffect("create_tag_tag_name_input");
        }
        return tagName;
      },
      set: function(newValue) {
        this.tag.setTagName(newValue.tagName);
        this.tag.setModel(newValue.model);
        this.tag.setModelAttribute(newValue.modelAttribute);
      }
    },

    tagAfter: {
      get: function() {
        let tagAfter = this.tag.getTagAfter();
        // debugger;
        if (this.tag.getTagAfterValid().message != null) {
          this.addShakeEffect("create_tag_after_tag_input");
        }
        return tagAfter;
      },
      set: function(newValue) {
        this.tag.setTagAfter(newValue);
      }
    },
    fontSize: {
      get: function() {
        let fontSize = this.tag.getFontSize();
        if (this.tag.getFontSizeValid().message != null) {
          this.addShakeEffect("create_tag_font_size_input");
        }
        return fontSize;
      },
      set: function(newValue) {
        this.tag.setFontSize(newValue);
      }
    },
    fontWeight: {
      get: function() {
        return this.tag.getFontWeight();
      },
      set: function(newValue) {
        this.tag.setFontWeight(newValue);
      }
    },
    fontStyle: {
      get: function() {
        return this.tag.getFontStyle();
      },
      set: function(newValue) {
        this.tag.setFontStyle(newValue);
      }
    },
    textAlignment: {
      get: function() {
        return this.tag.getTextAlignment();
      },
      set: function(newValue) {
        this.tag.setTextAlignment(newValue);
      }
    },
    backgroundColor: {
      get: function() {
        return this.tag.getBackgroundColor();
      },
      set: function(newValue) {
        this.tag.setBackgroundColor(newValue);
      }
    },
    draggable: {
      get: function() {
        return this.tag.isDraggable();
      },
      set: function(newValue) {
        this.tag.setDraggable(newValue);
      }
    },
    resizable: {
      get: function() {
        return this.tag.isResizable();
      },
      set: function(newValue) {
        this.tag.setResizable(newValue);
      }
    }
  },
  watch: {
    templateFontSize(newValue) {
      this.fontSize = newValue;
    },
    selectedTagName(newValue) {
      this.tagName = newValue;
      this.tag.setExampleValue(newValue.example);
    },
    tagToDelete(newValue) {
      this.deleteTag(newValue);
    }
  },
  methods: {
    async createTag() {
      //Vuelve las etiquetas estaticas para que su orden no se vea alterado por la nueva etiqueta
      for (let i = 0; i < this.tags.length; i++) {
        this.tags[i].setStatic(true);
      }
      this.assignedTagNames.push(this.selectedTagName);
      await this.getTagDimensions();
      this.template.addTag(this.tag);
      this.$store.commit("template/setCreatedTag", this.tag);

      this.setTextControlValues();
      this.selectedTagName = {
        tagName: "",
        model: "",
        modelAttribute: "",
        tagPlaceholder: "",
        example: ""
      };
    },
    deleteTag(tag) {
      let index = this.tags.findIndex(x => x.tagName === tag.tagName);
      this.tags.splice(index, 1);
      index = this.assignedTagNames.findIndex(x => x.tagName === tag.tagName);
      this.assignedTagNames.splice(index, 1);
    },
    setTextControlValues() {
      this.tag = new Tag();
      this.tag.setFontSize(this.template.getFontSize());
      this.backgroundColor = this.generateBackgroundColor();
      this.setFontWeight();
      this.setFontStyle();
      this.setTextAlignment(this.textAlignment);
      this.setDraggableButtonStyle();
      this.setResizableButtonStyle();
    },
    isTagNameAssigned: function(tagName) {
      return this.assignedTagNames.find(x => x.tagName === tagName);
    },
    changeFontStyle() {
      let element = document.getElementById(
        "create_tag_style_font_weight_italics"
      );
      if (element !== null) {
        if (this.fontStyle === "italic") {
          this.fontStyle = "normal";
          element.classList.remove("create_tag_style_button_selected");
        } else {
          this.fontStyle = "italic";
          element.classList.add("create_tag_style_button_selected");
        }
      }
    },
    setFontStyle() {
      let element = document.getElementById(
        "create_tag_style_font_weight_italics"
      );
      if (element !== null) {
        if (this.fontStyle === "italic") {
          element.classList.add("create_tag_style_button_selected");
        } else {
          element.classList.remove("create_tag_style_button_selected");
        }
      }
    },
    changeFontWeight() {
      let element = document.getElementById(
        "create_tag_style_font_weight_bold"
      );
      if (element !== null) {
        if (this.fontWeight === "bold") {
          this.fontWeight = "normal";
          element.classList.remove("create_tag_style_button_selected");
        } else {
          this.fontWeight = "bold";
          element.classList.add("create_tag_style_button_selected");
        }
      }
    },
    setFontWeight() {
      let element = document.getElementById(
        "create_tag_style_font_weight_bold"
      );
      if (element !== null) {
        if (this.fontWeight === "bold") {
          element.classList.add("create_tag_style_button_selected");
        } else {
          element.classList.remove("create_tag_style_button_selected");
        }
      }
    },
    setResizableButtonStyle() {
      let element = document.getElementById("create_tag_style_resize");
      if (element !== null) {
        if (this.resizable) {
          element.classList.add("create_tag_style_button_selected");
        } else {
          element.classList.remove("create_tag_style_button_selected");
        }
      }
    },
    setResizable() {
      let element = document.getElementById("create_tag_style_resize");
      if (element !== null) {
        if (this.resizable) {
          this.resizable = false;
          element.classList.remove("create_tag_style_button_selected");
        } else {
          this.resizable = true;
          element.classList.add("create_tag_style_button_selected");
        }
      }
    },
    setDraggableButtonStyle() {
      let element = document.getElementById("create_tag_style_drag");
      if (element !== null) {
        if (this.resizable) {
          element.classList.add("create_tag_style_button_selected");
        } else {
          element.classList.remove("create_tag_style_button_selected");
        }
      }
    },
    setDraggable() {
      let element = document.getElementById("create_tag_style_drag");
      if (element !== null) {
        if (this.draggable) {
          this.draggable = false;
          element.classList.remove("create_tag_style_button_selected");
        } else {
          this.draggable = true;
          element.classList.add("create_tag_style_button_selected");
        }
      }
    },
    setTextAlignment(textAlignment) {
      let elementTextLeft = document.getElementById(
        "create_tag_style_font_alignment_left"
      );
      let elementTextCenter = document.getElementById(
        "create_tag_style_font_alignment_center"
      );
      let elementTextRight = document.getElementById(
        "create_tag_style_font_alignment_right"
      );
      if (
        elementTextLeft !== null &&
        elementTextCenter !== null &&
        elementTextRight !== null
      ) {
        if (textAlignment === "left") {
          elementTextCenter.classList.remove(
            "create_tag_style_button_selected"
          );
          elementTextRight.classList.remove("create_tag_style_button_selected");
          elementTextLeft.classList.add("create_tag_style_button_selected");
        }
        if (textAlignment === "center") {
          elementTextLeft.classList.remove("create_tag_style_button_selected");
          elementTextRight.classList.remove("create_tag_style_button_selected");
          elementTextCenter.classList.add("create_tag_style_button_selected");
        }
        if (textAlignment === "right") {
          elementTextLeft.classList.remove("create_tag_style_button_selected");
          elementTextCenter.classList.remove(
            "create_tag_style_button_selected"
          );
          elementTextRight.classList.add("create_tag_style_button_selected");
        }
        this.textAlignment = textAlignment;
      }
    },
    getTagDimensions() {
      return new Promise(resolve => {
        let element = document.getElementById("create_tag_preview_tag");
        let elementWidth = element.offsetWidth;
        let tagWidth = (elementWidth * 100) / 1000;
        tagWidth = (tagWidth * 100) / 90;

        console.info(tagWidth);
        this.tag.setWidth(tagWidth);
        this.tag.setHeight(element.offsetHeight);
        resolve();
      });
    },
    getTagStyle() {
      let element = document.getElementById("create_tag_preview_tag");
      if (element != null) {
        element.style.fontFamily = this.templateFontFamily;
        element.style.fontSize = this.fontSize + "px";
        element.style.textAlign = this.textAlignment;
        element.style.fontStyle = this.fontStyle;
        element.style.fontWeight = this.fontWeight;
        element.style.fontColor = this.template.getFontColor();
        element.style.backgroundColor = this.backgroundColor;
      }
    },
    addShakeEffect(elemenId) {
      let element = document.getElementById(elemenId);
      if (element != null) {
        element.classList.remove("shake_field");
        void element.offsetWidth; // trigger a DOM reflow
        element.classList.add("shake_field");
      }
    },
    setHelpText(message, active) {
      this.$store.dispatch("helpText/setActive", { active, message });
    },
    generateBackgroundColor() {
      let colors = [
        "rgba(0, 229, 255, 0.8)",
        "rgba(233, 32, 99, 0.8)",
        "rgba(230, 81, 0, 0.8)",
        "rgba(32, 148, 243, 0.8)",
        "rgba(28, 233, 181, 0.8)",
        "rgba(0, 176, 255, 0.8)",
        "rgba(255, 153, 0, 0.8)",
        "rgba(255, 23, 68, 0.8)"
      ];
      let randomNumber = Math.floor(Math.random() * 8);
      return colors[randomNumber];
    }
  }
};
</script>
<style lang="scss">
@import "../style/style.scss";
#create_tag_container {
  display: flex;
  flex-direction: column;
  margin-right: 60px;
  margin-left: 60px;
}

#create_tag_fields {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  height: 60px;
  margin-left: 20px;
  margin-right: 20px;
  // background-color: blueviolet;
}

#create_tag_style {
  display: flex;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  // background-color: rgb(184, 29, 106);
}

#create_tag_preview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 100px;
}

#create_tag_style_font_weight {
  display: flex;
  justify-content: space-between;
  width: 75px;
  /*margin-right: 20px;*/
}

#create_tag_style_font_alignment {
  display: flex;
  justify-content: space-between;
  width: 120px;
  /*margin-right: 20px;*/
}

#create_tag_style_drag_and_resize {
  display: flex;
  justify-content: space-between;
  width: 80px;
  /*margin-right: 20px;*/
}

#create_tag_before_tag_input_field {
  width: 250px;
}

#create_tag_tag_name_input_field {
  width: 250px;
}

#create_tag_tag_name_select {
  width: 250px;
}

#create_tag_font_size_input_field {
  width: 70px;
}

#create_tag_add_tag_button_div {
  margin-top: 25px;
  margin-left: auto;
}

#create_tag_preview_tag {
  display: inline-flex;
  // margin-top: 20px;
  justify-content: center;
  margin: auto;
  background-color: rgb(255, 214, 78);
  padding: 5px;
  // opacity: 0.5;
}

.separator {
  border-left: 2px solid;
  border-left-color: lightgray;
  height: 20px;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 32.5px;
}

.create_tag_plus_icon_div {
  height: 60px;
  margin-left: 10px;
  margin-right: 10px;
  // width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.create_tag_plus_icon {
  margin-top: 20px;
  height: 15px;
  width: 15px;
}

.create_tag_style_button {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  height: 35px;
  width: 35px;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px 5px 5px 5px;
  border-color: #b9b9b9;
  // transition: 0.2s;
  // padding: 20px 20px 20px 20px;
}

.create_tag_style_button:hover {
  border-color: $accent;
  border-width: 1.5px;
  // transition: 0.2s;
  cursor: pointer;
}

.create_tag_style_button_selected {
  border-color: $accent;
  border-width: 1.5px;
  background-color: $secondary;
}

.create_tag_style_icon {
  align-self: center;
  height: 20px;
  width: 20px;
  transition: 0.2s;
}

// .create_tag_style_button:hover + .create_tag_style_icon {
// height: 22px;
// width: 22px;
// transition: 0.2s;
// }

.shake_field {
  outline-color: red;
  /* also need animation and -moz-animation */
  animation: shake 0.5s linear;
}
/* also need keyframes and -moz-keyframes */
@keyframes shake {
  8%,
  41% {
    -webkit-transform: translateX(-10px);
  }
  25%,
  58% {
    -webkit-transform: translateX(10px);
  }
  75% {
    -webkit-transform: translateX(-5px);
  }
  92% {
    -webkit-transform: translateX(5px);
  }
  0%,
  100% {
    -webkit-transform: translateX(0);
  }
}
</style>
