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

    <div id="create_template_general_data_font" class="gray_box">
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

    <div id="create_template_general_data_color" class="gray_box">
      <div class="container_flex">
        <div>
          <b-field id="create_template_background_color_input_field" custom-class="is-small">
            <template slot="label">
              <required-field-helper :name="'Color de fondo:'" :valid="isBackgroundColorValid"></required-field-helper>
            </template>
            <div class="container_flex">
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
            <div class="container_flex">
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

    <div id="create_template_general_data_dimensions_field" class="container_flex container_100_width">
    <div id="create_template_general_data_dimensions" class="gray_box">
      <div class="container_flex">
    <b-field id="create_template_height_input_field" custom-class="is-small">
      <template slot="label">
        <required-field-helper :name="'Alto:'" :valid="isHeightValid"></required-field-helper>
      </template>
      <input id="create_template_height_input" class="input create_template_input_width" v-model="height" />
    </b-field>

      <div class="space"></div>

      <b-field id="create_template_width_input_field" custom-class="is-small">
        <template slot="label">
          <required-field-helper :name="'Ancho:'" :valid="isWidthValid"></required-field-helper>
        </template>
        <input id="create_template_width_input" class="input create_template_input_width" v-model="width" />
      </b-field>

        <div class="space"></div>

        <b-field id="create_template_x_margin_input_field" custom-class="is-small">
          <template slot="label">
            <required-field-helper :name="'Margen (X):'" :valid="isMarginXValid"></required-field-helper>
          </template>
          <input id="create_template_margin_x_input" class="input create_template_input_width" v-model="marginX" />
        </b-field>

        <div class="space"></div>

        <b-field id="create_template_y_margin_input_field" custom-class="is-small">
          <template slot="label">
            <required-field-helper :name="'Margen (Y):'" :valid="isMarginYValid"></required-field-helper>
          </template>
          <input id="create_template_margin_y_input" class="input create_template_input_width" v-model="marginY" />
        </b-field>
<!--      </div>-->

    </div>
  </div>

      <div id="create_template_general_data_font_size" class="gray_box">
        <div class="container_flex">
          <b-field id="create_template_font_size_input_field" custom-class="is-small">
            <template slot="label">
              <required-field-helper :name="'Tamaño de fuente:'" :valid="isFontSizeValid"></required-field-helper>
            </template>
            <input id="create_template_font_size_input" class="input create_template_input_width" v-model="fontSize" />
          </b-field>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import requiredFieldHelper from "../helpers/requiredFieldHelper.vue";
import { Chrome } from "vue-color";
export default {
  components: {
    "required-field-helper": requiredFieldHelper,
    "color-picker": Chrome
  },
  props: ["template"],
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
  computed: {
    fontFamilies: function() {
      return this.template.getFontFamilies();
    },
    isNameValid: function() {
      return this.template.getNameValid();
    },
    isBackgroundColorValid: function() {
      return this.template.getBackgroundColorValid();
    },
    isFontColorValid: function() {
      return this.template.getFontColorValid();
    },
    isFontFamilyValid: function() {
      return this.template.getFontFamilyValid();
    },
    isHeightValid: function() {
      return this.template.getHeightValid();
    },
    isWidthValid: function() {
      return this.template.getWidthValid();
    },
    isMarginXValid: function() {
      return this.template.getMarginXValid();
    },
    isMarginYValid: function() {
      return this.template.getMarginYValid();
    },
    isFontSizeValid: function() {
      return this.template.getFontSizeValid();
    },
    name: {
      get: function() {
        let name = this.template.getName();
        if (this.template.getNameValid().message == "temporary error") {
          this.addShakeEffect("create_template_name_input");
        }
        return name;
      },
      set: function(newValue) {
        this.template.setName(newValue);
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
        this.template.setBackgroundColor(newValue);
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
        this.template.setFontColor(newValue);
      }
    },
    height: {
      get: function() {
        let height = this.template.getHeight();
        if (this.template.getHeightValid().message == "temporary error") {
          this.addShakeEffect("create_template_height_input");
        }
        return height;
      },
      set: function(newValue) {
        this.template.setHeight(newValue);
      }
    },
    width: {
      get: function() {
        let height = this.template.getWidth();
        if (this.template.getWidthValid().message == "temporary error") {
          this.addShakeEffect("create_template_width_input");
        }
        return height;
      },
      set: function(newValue) {
        this.template.setWidth(newValue);
      }
    },
    marginX: {
      get: function() {
        let marginX = this.template.getMarginX();
        if (this.template.getMarginXValid().message == "temporary error") {
          this.addShakeEffect("create_template_margin_x_input");
        }
        return marginX;
      },
      set: function(newValue) {
        this.template.setMarginX(newValue);
      }
    },
    marginY: {
      get: function() {
        let marginY = this.template.getMarginY();
        if (this.template.getMarginYValid().message == "temporary error") {
          this.addShakeEffect("create_template_margin_y_input");
        }
        return marginY;
      },
      set: function(newValue) {
        this.template.setMarginY(newValue);
      }
    },
    fontFamily: {
      get: function() {
        let fontFamily = this.template.getFontFamily();
        if (this.template.getFontFamilyValid().message == "temporary error") {
          this.addShakeEffect("create_template_font_family_input");
        }
        return fontFamily;
      },
      set: function(newValue) {
        this.template.setFontFamily(newValue);
      }
    },
    fontSize: {
      get: function() {
        let fontSize = this.template.getFontSize();
        if (this.template.getFontSizeValid().message == "temporary error") {
          this.addShakeEffect("create_template_font_size_input");
        }
        return fontSize;
      },
      set: function(newValue) {
        this.template.setFontSize(newValue);
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

#create_template_general_data_font {
  margin-top: 20px;
}

#create_template_general_data_dimensions_field{
  width: 100%;
  display: flex;
  justify-content: space-between;
}

#create_template_general_data_dimensions{
  margin-top: 20px;
}

#create_template_general_data_font_size{
  margin-top: 20px;
}

#create_template_general_data_color_title {
  display: flex;
  flex-wrap: wrap;
}

#create_template_general_data_font {
  margin-top: 20px;
}

#create_template_name_input {
  width: 500px;
}

#create_template_general_data_font_family_input {
  width: 500px;
}

#create_template_background_color_input {
  width: 100px;
}

#create_template_font_color_input {
  width: 100px;
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

/*#create_template_background_color_input {*/
/*  width: 100px;*/
/*}*/

/*#create_template_font_color_input {*/
/*  width: 100px;*/
/*}*/

.create_template_input_width{
  width: 100px !important;
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