<template>
  <div id="show_template_container" @click="closeColorPickersAndAutocompletes()">
    <p class="title">{{ title }}:</p>

    <div class="gray_box show_template_field_container">
      <div class="show_template_info_attributes_div">
        <required-field-helper
          :valid="isNameValid"
          v-if="editMode"
        ></required-field-helper>
        <p class="attribute_name">{{nameField}}</p>
      </div>
      <div>
        <p id="show_template_name_value" class="attribute_value" v-if="!editMode">
          {{ template.getName() }}
        </p>
        <input
          id="show_template_name_input"
          class="input"
          v-model="name"
          v-if="editMode"
        />
      </div>
    </div>

    <div class="gray_box show_template_field_container">
      <div class="show_template_flex_column">
        <div class="show_template_info_attributes_div">
          <required-field-helper
                  :valid="isFontFamilyValid"
                  v-if="editMode"
          ></required-field-helper>
          <p class="attribute_name">{{fontFamilyField}}</p>
        </div>
        <div>
          <p id="show_template_font_family_value" class="attribute_value" v-if="!editMode">
            {{ template.getFontFamily() }}
          </p>
          <input
                  id="show_template_font_family_input"
                  placeholder
                  class="input"
                  v-if="editMode"
                  v-model="fontFamily"
                  @click.stop="autocompleteFontFamilyStatus = true"
                  @focus="autocompleteFontFamilyStatus = true"
                  @keyup="searchFontFamily($event)"
          />
          <div
                  class="autocomplete_box"
                  v-if="
              autocompleteFontFamilyStatus &&
                filteredFontFamilies != undefined &&
                filteredFontFamilies.length > 0">
            <ul class="autocomplete_list">
              <li
                      v-for="fontFamily in filteredFontFamilies"
                      :key="fontFamily"
                      :value="fontFamily"
                      @click="setFontFamily(fontFamily)">
                {{ fontFamily }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

<!--    <p class="title show_content_subtitles">{{ colorTitle }}:</p>-->

    <div class="gray_box show_template_field_container">
      <div class="show_template_flex">
        <div class="show_template_flex_column">
          <div class="show_template_info_attributes_div">
            <required-field-helper
              v-if="editMode"
              :valid="isBackgroundColorValid"
            ></required-field-helper>
            <p class="attribute_name">{{backgroundColorField}}</p>
          </div>
          <div>
            <div class="show_template_flex">
              <div
                id="show_template_background_color_sample"
                @click.stop
                @click="showBackgroundColorPicker(true)"
              ></div>
              <p id="show_template_background_color_value" class="attribute_value" v-if="!editMode">
                {{ template.getBackgroundColor() }}
              </p>

              <input
                id="show_template_background_color_input"
                class="input show_template_colors_input"
                v-if="editMode"
                v-model="backgroundColor"
                @click.stop
                @focus="showBackgroundColorPicker(true)"
              />
            </div>
            <div
              class="color_picker"
              @click.stop
              v-if="isBackgroundColorPickerVisible && editMode"
            >
              <a class="delete" @click="showBackgroundColorPicker(false)"></a>
              <color-picker
                v-model="backgroundColorPicker"
                @input="setBackgroundColor($event)"
              />
            </div>
          </div>
        </div>

        <div class="space"></div>

        <div class="show_template_flex_column">
          <div class="show_template_info_attributes_div">
            <required-field-helper
              v-if="editMode"
              :valid="isFontColorValid"
            ></required-field-helper>
            <p class="attribute_name">{{fontColorField}}</p>
          </div>
          <div>
            <div class="show_template_flex">
              <div
                id="show_template_font_color_sample"
                @click.stop
                @click="showFontColorPicker(true)"
              ></div>
              <p  id="create_template_font_color_value" class="attribute_value" v-if="!editMode">
                {{ template.getFontColor() }}
              </p>
              <input
                id="create_template_font_color_input"
                class="input show_template_colors_input"
                v-if="editMode"
                v-model="fontColor"
                @click.stop
                @focus="showFontColorPicker(true)"
              />
            </div>
            <div
              class="color_picker"
              @click.stop
              v-if="isFontColorPickerVisible && editMode"
            >
              <a class="delete" @click="showFontColorPicker(false)"></a>
              <color-picker
                v-model="fontColorPicker"
                @input="setFontColor($event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

<!--    <p class="title show_content_subtitles">{{ fontTitle }}:</p>-->

<!--    <p class="title show_content_subtitles">{{ sizeTitle }}:</p>-->

    <div class="gray_box show_template_field_container">
      <div class="show_template_flex">
        <div class="show_template_flex_column">
          <div class="show_template_info_attributes_div">
            <required-field-helper
              :valid="isHeightValid"
              v-if="editMode"
            ></required-field-helper>
            <p class="attribute_name">{{heightField}}</p>
          </div>
<!--          <div>-->
            <p id="show_template_height_value" class="attribute_value" v-if="!editMode">
              {{ template.getHeight() + " mm" }}
            </p>
            <input
              id="show_template_height_input"
              class="input show_template_dimensions_input"
              v-if="editMode"
              v-model="height"
              placeholder="Altura"
            />
          </div>
<!--        </div>-->

        <span class="space"></span>

        <div class="show_template_flex_column">
          <div class="show_template_info_attributes_div">
            <required-field-helper
              :valid="isWidthValid"
              v-if="editMode"
            ></required-field-helper>
            <p class="attribute_name">{{widthField}}</p>
          </div>
            <p id="show_template_width_value" class="attribute_value" v-if="!editMode">
              {{ template.getWidth() + " mm" }}
            </p>
            <input
              id="show_template_width_input"
              class="input show_template_dimensions_input"
              v-if="editMode"
              v-model="width"
              placeholder="Ancho"
            />
        </div>

        <span class="space"></span>

        <div class="show_template_flex_column">
          <div class="show_template_info_attributes_div">
            <required-field-helper
                    :valid="isMarginXValid"
                    v-if="editMode"
            ></required-field-helper>
            <p class="attribute_name">{{marginXField}}</p>
          </div>
          <p id="show_template_x_margin_value" class="attribute_value" v-if="!editMode">
            {{ template.getMarginX() + " mm"}}
          </p>
          <input
                  id="show_template_x_margin_input"
                  class="input show_template_dimensions_input"
                  v-if="editMode"
                  v-model="marginX"
                  placeholder="Ancho"
          />
        </div>

        <span class="space"></span>

        <div class="show_template_flex_column">
          <div class="show_template_info_attributes_div">
            <required-field-helper
                    :valid="isMarginYValid"
                    v-if="editMode"
            ></required-field-helper>
            <p class="attribute_name">{{marginYField}}</p>
          </div>
          <p id="show_template_y_margin_value" class="attribute_value" v-if="!editMode">
            {{ template.getMarginY() + " mm"}}
          </p>
          <input
                  id="show_template_y_margin_input"
                  class="input show_template_dimensions_input"
                  v-if="editMode"
                  v-model="marginY"
                  placeholder="Ancho"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import requiredFieldHelper from "../helpers/requiredFieldHelper";
import { Chrome } from "vue-color";
import Template from "../models/template";

export default {
  name: "showTemplate",
  props: {
    template: {
      type: Template,
      required: true
    },
    editMode: Boolean
  },

  components: {
    "required-field-helper": requiredFieldHelper,
    "color-picker": Chrome
  },
  data() {
    return {
      title: "INFORMACIÓN",
      colorTitle: "COLOR",
      fontTitle: "FUENTE",
      sizeTitle: "DIMENSIONES",
      isBackgroundColorPickerVisible: false,
      isFontColorPickerVisible: false,
      backgroundColorPicker: null,
      fontColorPicker: null,
      filteredFontFamilies: [],
      autocompleteFontFamilyStatus: false,
      nameField: "Nombre:",
      widthField: "Ancho:",
      heightField: "Alto:",
      fontFamilyField: "Fuente:",
      fontColorField: "Color del texto:",
      backgroundColorField: "Color de fondo:",
      marginXField: "Margen horizontal:",
      marginYField: "Margen vertical:"
    };
  },
  mounted() {
    let element = document.getElementById(
            "show_template_background_color_sample"
    );
    if (element){
      element.style.backgroundColor = this.backgroundColor;
      element = document.getElementById("show_template_font_color_sample");
      element.style.backgroundColor = this.fontColor;
    }
  },
  watch: {
    backgroundColor(newValue) {
      // debugger;
      let element = document.getElementById(
        "show_template_background_color_sample"
      );
      element.style.backgroundColor = newValue;
    },
    fontColor(newValue) {
      // debugger;
      let element = document.getElementById("show_template_font_color_sample");
      element.style.backgroundColor = newValue;
    }
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
          this.addShakeEffect("show_template_background_color_input");
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
        let height = this.template.getHeightInMilimeters();
        if (this.template.getHeightValid().message == "temporary error") {
          this.addShakeEffect("create_template_font_color_input");
        }
        return height;
      },
      set: function(newValue) {
        newValue = newValue * 3.7795275591;
        newValue = Math.round(newValue);
        this.template.setHeight(newValue);
      }
    },
    width: {
      get: function() {
        let height = this.template.getWidthInMilimeters();
        if (this.template.getWidthValid().message == "temporary error") {
          this.addShakeEffect("create_template_font_color_input");
        }
        return height;
      },
      set: function(newValue) {
        newValue = newValue * 3.7795275591;
        newValue = Math.round(newValue);
        this.template.setWidth(newValue);
      }
    },
    marginX: {
      get: function() {
        let marginX = this.template.getMarginXInMilimeters();
        if (this.template.getMarginXValid().message == "temporary error") {
          this.addShakeEffect("show_template_x_margin_input");
        }
        return marginX;
      },
      set: function(newValue) {
        newValue = newValue * 3.7795275591;
        newValue = Math.round(newValue);
        this.template.setMarginX(newValue);
      }
    },
    marginY: {
      get: function() {
        let marginY = this.template.getMarginYInMilimeters();
        if (this.template.getMarginYValid().message == "temporary error") {
          this.addShakeEffect("show_template_y_margin_input");
        }
        return marginY;
      },
      set: function(newValue) {
        newValue = newValue * 3.7795275591;
        newValue = Math.round(newValue);
        this.template.setMarginY(newValue);
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
        this.template.setFontFamily(newValue);
      }
    }
  },
  methods: {
    showBackgroundColorPicker(show) {
      if (this.editMode) {
        this.closeColorPickers();
        this.isBackgroundColorPickerVisible = show;
      }
    },
    closeColorPickers() {
      this.isFontColorPickerVisible = false;
      this.isBackgroundColorPickerVisible = false;
    },
    setBackgroundColor(value) {
      this.backgroundColor = value.hex;
    },
    setFontColor(value) {
      this.fontColor = value.hex;
    },
    showFontColorPicker(show) {
      this.closeColorPickers();
      this.isFontColorPickerVisible = show;
    },
    setFontFamily(fontFamily) {
      this.fontFamily = fontFamily;
      this.autocompleteFontFamilyStatus = false;
    },
    searchFontFamily(event) {
      if (event.key != "Enter" && event.key != "Tab" && event.key != "Space") {
        let foundFontFamily = this.fontFamilies.filter(x =>
          x.toLowerCase().includes(this.fontFamily.toString().toLowerCase())
        );
        this.filteredFontFamilies = foundFontFamily;
        // debugger;
      }
    },
    closeColorPickersAndAutocompletes(){
      this.isFontColorPickerVisible = false;
      this.isBackgroundColorPickerVisible = false;
      this.autocompleteFontFamilyStatus = false;
    }
  }
};
</script>

<style lang="scss">
#show_template_container {
  width: 100%;
  margin-bottom: 50px;
}
.show_template_content {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  /*width: 100%;*/
}
.show_template_attribute_div_title {
  display: flex;
  align-items: center;
  /*width: 100%;*/
}

#show_template_name_input {
  width: 200px;
}

#show_template_font_family_input {
  width: 500px;
}

.show_template_dimensions_input{
  width: 80px!important;
}

.show_template_colors_input{
  width: 120px!important;
}

.show_template_info_attributes_div {
  display: flex;
  align-items: center;
  width: 100%;
}

.show_template_flex {
  display: flex;
  align-items: center;
  width: 100%;
}

.show_template_flex_column {
  display: flex;
  flex-direction: column;
}

.show_template_field_container {
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
}

.show_content_subtitles {
  margin-top: 10px;
}

#show_template_background_color_sample {
  height: 35px;
  width: 35px;
  border-radius: 3px 3px 3px 3px;
  background-color: #000000;
  margin-right: 10px;
  cursor: pointer;
}

#show_template_font_color_sample {
  height: 35px;
  width: 35px;
  border-radius: 3px 3px 3px 3px;
  background-color: #ffffff;
  margin-right: 10px;
  cursor: pointer;
}

.show_template_input {
  width: 20%;
}
</style>
