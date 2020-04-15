<template>
  <div id="create_template_general_data_container" @click="closeColorPickersAndAutocompletes()">
    <!-- <p class="title">DATOS DE LA PLANTILLA:</p> -->
    <div id="create_template_general_data_name" class="gray_box">
      <b-field id="create_template_name_input_field" custom-class="is-small">
        <template slot="label">
          <required-field-helper :name="'Nombre:'" :valid="isNameValid"></required-field-helper>
        </template>
        <input id="create_template_name_input" class="input" v-model="name" />
      </b-field>
    </div>

    <div id="create_template_general_data_color" class="gray_box">
      <div id="create_template_general_data_color_title">
        <p class="title">COLOR:</p>
      </div>
      <div id="create_template_general_data_color_fields">
        <div>
          <b-field id="create_template_background_color_input_field" custom-class="is-small">
            <template slot="label">
              <required-field-helper :name="'Color de fondo:'" :valid="isBackgroundColorValid"></required-field-helper>
            </template>
            <div id="create_template_background_color_div">
              <div
                id="create_template_background_color_sample"
                @click.stop
                @click="showBackgroundColorPicker(true)"
              ></div>
              <input
                id="create_template_background_color_input"
                class="input"
                v-model="backgroundColor"
                @click.stop
                @focus="showBackgroundColorPicker(true)"
              />
            </div>
          </b-field>

          <div class="color_picker" @click.stop v-if="isBackgroundColorPickerVisible">
            <a class="delete" @click="showBackgroundColorPicker(false)"></a>
            <color-picker v-model="backgroundColorPicker" @input="setBackgroundColor($event)" />
          </div>
        </div>

        <div class="space"></div>

        <div>
          <b-field id="create_template_font_color_input_field" custom-class="is-small">
            <template slot="label">
              <required-field-helper :name="'Color del texto:'" :valid="isFontColorValid"></required-field-helper>
            </template>
            <div id="create_template_font_color_div">
              <div
                id="create_template_font_color_sample"
                @click.stop
                @click="showFontColorPicker(true)"
              ></div>
              <input
                id="create_template_font_color_input"
                class="input"
                v-model="fontColor"
                @click.stop
                @focus="showFontColorPicker(true)"
              />
            </div>
          </b-field>

          <div class="color_picker" @click.stop v-if="isFontColorPickerVisible">
            <a class="delete" @click="showFontColorPicker(false)"></a>
            <color-picker v-model="fontColorPicker" @input="setFontColor($event)" />
          </div>
        </div>
      </div>
    </div>

    <div id="create_template_general_data_font" class="gray_box">
      <p class="title">FUENTE:</p>

      <b-field
        id="create_template_general_data_font_family_field"
        class="autocomplete_box_field"
        custom-class="is-small"
        label="Fuente:"
      >
        <template slot="label">
          <required-field-helper :name="'Fuente:'" :valid="isFontFamilyValid"></required-field-helper>
        </template>
        <input
          id="create_template_general_data_font_family_input"
          placeholder
          class="input"
          v-model="fontFamily"
          @click.stop="autocompleteFontFamilyStatus =true"
          @focus="autocompleteFontFamilyStatus =true"
          @keyup="searchFontFamily($event)"
        />
        <div
          class="autocomplete_box"
          v-if="autocompleteFontFamilyStatus && filteredFontFamilies != undefined && filteredFontFamilies.length > 0"
        >
          <ul class="autocomplete_list">
            <li
              v-for="fontFamily in filteredFontFamilies"
              :key="fontFamily"
              :value="fontFamily"
              @click="setFontFamily(fontFamily)"
            >{{fontFamily}}</li>
          </ul>
        </div>
      </b-field>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import requiredFieldHelper from "../helpers/requiredFieldHelper.vue";
// import colorPicker from "@caohenghu/vue-colorpicker";
import { Chrome } from "vue-color";
export default {
  components: {
    "required-field-helper": requiredFieldHelper,
    "color-picker": Chrome
  },
  data() {
    return {
      //Este valor es solo para el comp picker, dado que retora un objeto
      backgroundColorPicker: null,
      fontColorPicker: null,
      isBackgroundColorPickerVisible: false,
      isFontColorPickerVisible: false,
      filteredFontFamilies: [],
      autocompleteFontFamilyStatus: false
    };
  },
  mounted() {
    this.$store.dispatch("template/getFonts");
    // debugger;
  },
  computed: {
    ...mapState("template", {
      templateState: state => state,
      template: state => state.template,
      fontFamilies: state => state.fontFamilies,
      isNameValid: state => state.template.getNameValid(),
      isBackgroundColorValid: state => state.template.getBackgroundColorValid(),
      isFontColorValid: state => state.template.getFontColorValid(),
      isFontFamilyValid: state => state.template.getFontFamilyValid()
    }),
    name: {
      get: function() {
        let name = this.template.getName();
        if (this.template.getNameValid().message == "temporary error") {
          this.addShakeEffect("create_template_name_input");
        }
        return name;
      },
      set: function(newValue) {
        this.$store.dispatch("template/setName", newValue);
      }
    },
    backgroundColor: {
      get: function() {
        let backgroundColor = this.template.getBackgroundColor();
        if (
          this.template.getBackgroundColorValid().message == "temporary error"
        ) {
          this.addShakeEffect("create_template_background_color_input");
        }
        this.backgroundColorPicker = { hex: backgroundColor };
        return backgroundColor;
      },
      set: function(newValue) {
        this.$store.dispatch("template/setBackgroundColor", newValue);
      }
    },
    fontColor: {
      get: function() {
        let fontColor = this.template.getFontColor();
        if (this.template.getFontColorValid().message == "temporary error") {
          this.addShakeEffect("create_template_font_color_input");
        }
        this.fontColorPicker = { hex: fontColor };
        return fontColor;
      },
      set: function(newValue) {
        this.$store.dispatch("template/setFontColor", newValue);
      }
    },
    fontFamily: {
      get: function() {
        let fontFamily = this.template.getFontFamily();
        if (this.template.getFontFamilyValid().message == "temporary error") {
          this.addShakeEffect("create_template_background_color_input");
        }
        return fontFamily;
      },
      set: function(newValue) {
        this.$store.dispatch("template/setFontFamily", newValue);
      }
    }
  },
  watch: {
    backgroundColor(newValue, oldValue) {
      // debugger;
      let element = document.getElementById(
        "create_template_background_color_sample"
      );
      element.style.backgroundColor = newValue;
    },
    fontColor(newValue, oldValue) {
      // debugger;
      let element = document.getElementById(
        "create_template_font_color_sample"
      );
      element.style.backgroundColor = newValue;
    }
  },
  methods: {
    searchFontFamily(event) {
      if (event.key != "Enter" && event.key != "Tab" && event.key != "Space") {
        let foundFontFamily = this.fontFamilies.filter(x =>
          x.toLowerCase().includes(this.fontFamily.toString().toLowerCase())
        );
        this.filteredFontFamilies = foundFontFamily;
        // debugger;
      }
    },
    showBackgroundColorPicker(show) {
      this.closeColorPickers();
      this.isBackgroundColorPickerVisible = show;
    },
    showFontColorPicker(show) {
      this.closeColorPickers();
      this.isFontColorPickerVisible = show;
    },
    setBackgroundColor(value) {
      this.backgroundColor = value.hex;
    },
    setFontColor(value) {
      this.fontColor = value.hex;
    },
    setFontFamily(fontFamily) {
      this.fontFamily = fontFamily;
      this.autocompleteFontFamilyStatus = false;
    },
    closeColorPickers() {
      this.isFontColorPickerVisible = false;
      this.isBackgroundColorPickerVisible = false;
    },
    closeAutocompletes() {
      this.autocompleteFontFamilyStatus = false;
    },
    closeColorPickersAndAutocompletes() {
      this.closeColorPickers();
      this.closeAutocompletes();
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
// #create_template_general_data_container {
// }

#create_template_general_data_name {
  margin-top: 20px;
}

#create_template_general_data_color {
  margin-top: 20px;
}

#create_template_general_data_color_title {
  display: flex;
  flex-wrap: wrap;
}

#create_template_general_data_font {
  margin-top: 20px;
}

#create_template_general_data_color_fields {
  display: flex;
}

#create_template_name_input {
  width: 500px;
}

#create_template_general_data_font_family_input {
  width: 500px;
}

#create_template_background_color_div {
  display: flex;
}

#create_template_font_color_div {
  display: flex;
}

#create_template_background_color_sample {
  height: 35px;
  width: 35px;
  border-radius: 3px 3px 3px 3px;
  background-color: #000000;
  margin-right: 10px;
  cursor: pointer;
}

#create_template_font_color_sample {
  height: 35px;
  width: 35px;
  border-radius: 3px 3px 3px 3px;
  background-color: #ffffff;
  margin-right: 10px;
  cursor: pointer;
}

#create_template_background_color_input {
  width: 100px;
}

#create_template_font_color_input {
  width: 100px;
}

.color_picker {
  // z-index: 1;
  display: inline-block;
  position: absolute;
  z-index: 20;
}

.shake_field {
  outline-color: red !important;
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