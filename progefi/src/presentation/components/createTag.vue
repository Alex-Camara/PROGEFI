<template>
  <div id="create_tag_container" class="white_box">
    <p>Añadir etiqueta</p>
    <div id="create_tag_fields">
      <b-field
        id="create_tag_before_tag_input_field"
        custom-class="is-small"
        label="Etiqueta anterior:"
      >
        <template slot="label">
          <required-field-helper :name="'Etiqueta anterior:'" :valid="isTagBeforeValid"></required-field-helper>
        </template>
        <input id="create_tag_before_tag_input" class="input" v-model="tagBefore" />
      </b-field>

      <div class="create_tag_plus_icon_div">
        <img class="create_tag_plus_icon" src="../assets/plus.png" />
      </div>

      <b-field id="create_tag_tag_name_input_field" custom-class="is-small" label="Etiqueta:">
        <template slot="label">
          <required-field-helper :name="'Etiqueta:'" :valid="isTagNameValid"></required-field-helper>
        </template>
        <div class="select">
          <select
            id="create_tag_tag_name_select"
            placeholder="Selecciona una etiqueta"
            v-model="tagName"
          >
            <option v-for="tag in tags" :key="tag.tagName" :value="tag.tagName">{{ tag.tag }}</option>
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
          <required-field-helper :name="'Etiqueta posterior:'" :valid="isTagAfterValid"></required-field-helper>
        </template>
        <input id="create_tag_after_tag_input" class="input" v-model="tagAfter" />
      </b-field>
    </div>
    <div id="create_tag_style">
      <div id="create_tag_style_font_weight">
        <div
          id="create_tag_style_font_weight_italics"
          class="create_tag_style_button"
          @click="setItalics()"
        >
          <img class="create_tag_style_icon" src="../assets/italic.png" />
        </div>
        <div
          id="create_tag_style_font_weight_bold"
          class="create_tag_style_button"
          @click="setBold()"
        >
          <img class="create_tag_style_icon" src="../assets/bold.png" />
        </div>
        <div class="create_tag_style_button">
          <!-- <img class="create_tag_style_icon" src="../assets/trash.png" /> -->
        </div>
      </div>

      <div id="create_tag_style_font_alignment">
        <div
          id="create_tag_style_font_alignment_left"
          class="create_tag_style_button"
          @click="setTextAlignment($event, 'left')"
        >
          <img class="create_tag_style_icon" src="../assets/left_text.png" />
        </div>
        <div
          id="create_tag_style_font_alignment_center"
          class="create_tag_style_button"
          @click="setTextAlignment($event, 'center')"
        >
          <img class="create_tag_style_icon" src="../assets/center_text.png" />
        </div>
        <div
          id="create_tag_style_font_alignment_right"
          class="create_tag_style_button"
          @click="setTextAlignment($event, 'right')"
        >
          <img class="create_tag_style_icon" src="../assets/right_text.png" />
        </div>
      </div>

      <b-field id="create_tag_font_size_input_field" custom-class="is-small" label="Tamaño:">
        <template slot="label">
          <required-field-helper :name="'Tamaño:'" :valid="isFontSizeValid"></required-field-helper>
        </template>
        <input id="create_tag_font_size_input" class="input" v-model="fontSize" />
      </b-field>

      <div id="create_tag_add_tag_button">
        <button class="button is-secondary">Agregar etiqueta</button>
      </div>
    </div>

    <hr />

    <div id="create_tag_preview">
      <p>Vista previa de la etiqueta:</p>

      <!-- <div> -->
      <div id="create_tag_preview_tag" :style="getTagStyle()">
        <p>{{fullTag}}</p>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import requiredFieldHelper from "../helpers/requiredFieldHelper.vue";
export default {
  components: {
    "required-field-helper": requiredFieldHelper
  },
  computed: {
    ...mapState("tag", {
      tagState: state => state,
      tag: state => state.tag,
      tags: state => state.tags,
      isTagNameValid: state => state.tag.getTagNameValid(),
      isTagBeforeValid: state => state.tag.getTagBeforeValid(),
      isTagAfterValid: state => state.tag.getTagAfterValid(),
      isFontSizeValid: state => state.tag.getFontSizeValid()
    }),
    fullTag: function() {
      return this.tagBefore + " <<" + this.tagName + ">> " + this.tagAfter;
    },
    tagBefore: {
      get: function() {
        let tagBefore = this.tag.getTagBefore();
        // debugger;
        if (this.tag.getTagBeforeValid().message == "temporary error") {
          this.addShakeEffect("create_tag_before_tag_input");
        }
        return tagBefore;
      },
      set: function(newValue) {
        this.$store.dispatch("tag/setTagBefore", newValue);
      }
    },
    tagName: {
      get: function() {
        let tagName = this.tag.getTagName();
        // debugger;
        if (this.tag.getTagNameValid().message == "temporary error") {
          this.addShakeEffect("create_tag_tag_name_input");
        }
        return tagName;
      },
      set: function(newValue) {
        this.$store.dispatch("tag/setTagName", newValue);
      }
    },
    tagAfter: {
      get: function() {
        let tagAfter = this.tag.getTagAfter();
        // debugger;
        if (this.tag.getTagAfterValid().message == "temporary error") {
          this.addShakeEffect("create_tag_after_tag_input");
        }
        return tagAfter;
      },
      set: function(newValue) {
        this.$store.dispatch("tag/setTagAfter", newValue);
      }
    },
    fontSize: {
      get: function() {
        let fontSize = this.tag.getFontSize();
        // debugger;
        if (this.tag.getFontSizeValid().message == "temporary error") {
          this.addShakeEffect("create_tag_font_size_input");
        }
        return fontSize;
      },
      set: function(newValue) {
        this.$store.dispatch("tag/setFontSize", newValue);
      }
    },
    bold: {
      get: function() {
        return this.tag.isBold();
      },
      set: function(newValue) {
        this.$store.dispatch("tag/setBold", newValue);
      }
    },
    italics: {
      get: function() {
        return this.tag.isItalics();
      },
      set: function(newValue) {
        this.$store.dispatch("tag/setItalics", newValue);
      }
    },
    textAlignment: {
      get: function() {
        return this.tag.getTextAlignment();
      },
      set: function(newValue) {
        this.$store.dispatch("tag/setTextAlignment", newValue);
      }
    }
  },

  methods: {
    setItalics() {
      let element = document.getElementById(
        "create_tag_style_font_weight_italics"
      );
      if (this.italics) {
        this.italics = false;
        element.classList.remove("create_tag_style_button_selected");
      } else {
        this.italics = true;
        element.classList.add("create_tag_style_button_selected");
      }
    },
    setBold() {
      let element = document.getElementById(
        "create_tag_style_font_weight_bold"
      );
      if (this.bold) {
        this.bold = false;
        element.classList.remove("create_tag_style_button_selected");
      } else {
        this.bold = true;
        element.classList.add("create_tag_style_button_selected");
      }
    },
    setTextAlignment(event, textAlignment) {
      let elementTextLeft = document.getElementById(
        "create_tag_style_font_alignment_left"
      );
      let elementTextCenter = document.getElementById(
        "create_tag_style_font_alignment_center"
      );
      let elementTextRight = document.getElementById(
        "create_tag_style_font_alignment_right"
      );
      // debugger;
      elementTextLeft.classList.remove("create_tag_style_button_selected");
      elementTextCenter.classList.remove("create_tag_style_button_selected");
      elementTextRight.classList.remove("create_tag_style_button_selected");
      let elementId = event.currentTarget.id;
      let element = document.getElementById(elementId);
      // debugger;
      element.classList.add("create_tag_style_button_selected");
      this.textAlignment = textAlignment;
    },
    getTagStyle() {
      let element = document.getElementById("create_tag_preview_tag");
      // debugger;
      if (element != null) {
        element.style.fontFamily = this.fontFamily;
        element.style.fontSize = this.fontSize + "px";
        element.style.textAlign = this.textAlignment;
        if (this.bold) {
          element.style.fontWeight = "bold";
        } else {
          element.style.fontWeight = "normal";
        }
        if (this.italics) {
          element.style.fontStyle = "italic";
        } else {
          element.style.fontStyle = "normal";
        }
      }
    },
    addShakeEffect(elemenId) {
      let element = document.getElementById(elemenId);
      if (element != null) {
        element.classList.remove("shake_field");
        void element.offsetWidth; // trigger a DOM reflow
        element.classList.add("shake_field");
      }
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
  justify-content: space-evenly;
  margin-top: 10px;
  height: 60px;
  // background-color: blueviolet;
}

#create_tag_style {
  display: flex;
  margin-top: 10px;
  // background-color: rgb(184, 29, 106);
}

#create_tag_preview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

#create_tag_style_font_weight {
  display: flex;
  justify-content: space-between;
  width: 120px;
  margin-right: 20px;
}

#create_tag_style_font_alignment {
  display: flex;
  justify-content: space-between;
  width: 120px;
  margin-right: 20px;
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

#create_tag_add_tag_button {
  margin-top: 25px;
  margin-left: auto;
}

#create_tag_preview_tag {
  display: inline-flex;
  // margin-top: 20px;
  justify-content: center;
  margin: auto;
  background-color: rgb(255, 214, 78);
  // opacity: 0.5;
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