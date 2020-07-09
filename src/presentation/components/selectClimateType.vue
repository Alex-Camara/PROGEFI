<template>
  <div>
    <div id="select_climate_type_container">
      <div id="select_climate_type_container_header">
        <div id="select_climate_type_container_header_title">
          <information_helper :message="informationMessage"></information_helper>
          <required-field-helper
            id="select_climate_required_field"
            :name="null"
            :valid="climateTypeValid"
          ></required-field-helper>
          <b
            id="select_climate_type_container_header_title_value"
            class="is-size-6"
            v-text="'Tipo de clima: '"
          ></b>
          <b
            id="select_climate_type_container_header_value"
            class="is-size-6"
            v-if="climateTypeCode"
          >{{climateTypeCode}}</b>
          <img id="select_climate_checked_icon" src="../assets/checked.png" v-if="climateTypeCode" />
        </div>
        <div id="select_climate_type_container_header_addOption" v-on:click="addOption()">
          <b-tooltip label="Agregar otra opción" position="is-top">
            <img
              id="select_climate_type_container_header_addOption_icon"
              :src="require('../assets/more.png')"
            />
          </b-tooltip>
        </div>
      </div>
      <div id="select_climate_type_container_content">
        <div>
          <ul id="select_climate_type_list">
            <li
              id="select_climate_type_list_bubble"
              v-for="climateType in climateTypes"
              :key="climateType.getCode()"
              :value="climateType.getCode()"
              :style="{'background-color': '#' + climateType.getColorCode()}"
              v-on:click="setClimateType(climateType)"
              @mouseover="showDescription(climateType.getCode())"
              @mouseleave="showSelectedDescription()"
            >
              <div
                v-if="climateType.getCode() !== 'Indeterminado'"
                id="select_climate_type_list_bubble_text"
              >
                {{ climateType.code }}
              </div>
              <img
                id="select_climate_type_container_content_indeterminate_bubble"
                v-if="climateType.getCode() === 'Indeterminado'"
                :src="require('../assets/indeterminate.png')"
              />
            </li>
          </ul>
        </div>
        <b-message type="is-info" v-text="selectedDescription"></b-message>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import requiredFieldHelper from "../helpers/requiredFieldHelper.vue";
import ClimateType from "../models/climateType";
import informationHelper from "../helpers/informationHelper";

export default {
  components: {
    "required-field-helper": requiredFieldHelper,
    "information_helper": informationHelper,
  },
  name: "climateTypeHelper",
  data() {
    return {
      climateTypes: [],
      selectedTitle: "",
      selectedDescription: "",
      informationMessage: "Tipos de clima obtenidos de la clasificación de Köeppen modificada por García...",
      modalClimateType: new ClimateType()
    };
  },
  async mounted() {
    this.climateTypes = await ClimateType.getAll();
  },
  computed: {
    ...mapState("datacard", {
      datacard: state => state.datacard,
      climateTypeCode: state =>
        state.datacard
          .getCollect()
          .getClimateType()
          .getCode(),
      climateTypeValid: state =>
        state.datacard
          .getCollect()
          .getClimateType()
          .getCodeValid()
    }),
    ...mapState("modal", {
      saveClimateTypeValue: state => state.saveClimateTypeValue,
    }),
    selectedClimateType: {
      get: function() {
        let climateType = this.datacard.getCollect().getClimateType();
        return climateType;
      },
      set: function(newValue) {
        this.datacard.getCollect().setClimateType(newValue);
      }
    }
  },
  watch:{
    saveClimateTypeValue(newValue){
      if (newValue){
        this.selectedClimateType = this.modalClimateType;
      }
      this.modalClimateType = new ClimateType();
      this.$store.commit("modal/reset");
    }
  },
  methods: {
    showDescription(climateCode) {
      let climateType = this.climateTypes.find(
        x => x.code === climateCode
      );
      this.selectedDescription = climateType.getDescription();
    },
    setClimateType(climateType) {
      this.selectedClimateType = climateType;
      this.showSelectedDescription();
    },
    showSelectedDescription() {
      if (!this.selectedClimateType) {
        this.selectedDescription = "";
      } else {
        this.selectedDescription = this.selectedClimateType.getDescription();
      }
    },
    addOption() {
      this.$store.dispatch("modal/openModal", {
        title: "Tipos de clima",
        fieldText: "Ingresa el tipo de clima",
        model: this.modalClimateType,
        getter: "getCode",
        setter: "setCode",
        getterValid: "getCodeValid"
      })
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";

#select_climate_type_container {
  display: grid;
  grid-template-rows: 30px 80px;
}

#select_climate_type_container_header {
  grid-row: 1 / 2;
  display: flex;
  justify-content: space-between;
}

#select_climate_type_container_header_title {
  align-self: start;
  display: flex;
  align-items: center;
}

#select_climate_required_field {
  align-self: center;
}

#select_climate_type_container_header_title_value {
  //color: black;
  margin-right: 10px;
}

#select_climate_type_container_header_value {
  color: $primary;
}

#select_climate_checked_icon {
  height: 20px;
  width: 20px;
  margin-left: 5px;
  align-self: center;
}

#select_climate_type_container_header_addOption {
  align-self: end;
}

#select_climate_type_container_header_addOption_icon {
  align-self: center;
  height: 20px;
  width: 20px;
  transition: 0.2s;
}

#select_climate_type_container_header_addOption_icon:hover {
  height: 25px;
  width: 25px;
  transition: 0.2s;
  cursor: pointer;
  filter: hue-rotate(180deg);
  -webkit-filter: hue-rotate(180deg);
}

#select_climate_type_container_content {
  grid-row: 2 / 3;
}

#select_climate_type_list {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 80px;
}

#select_climate_type_list_bubble {
  height: 30px;
  width: 30px;
  align-self: center;
  border-radius: 50%;
  line-height: 75px;
  transition: 0.5s;
}

#select_climate_type_list_bubble #select_climate_type_list_bubble_text {
  visibility: hidden;
}

#select_climate_type_list_bubble:hover {
  height: 75px;
  width: 75px;
  transition: 0.5s;
  cursor: pointer;
}

#select_climate_type_list_bubble_text {
  text-align: center;
  font-size: 0px;
}

#select_climate_type_list_bubble:hover #select_climate_type_list_bubble_text {
  visibility: visible;
  font-size: 16px;
  transition: 0.5s;
}

#select_climate_type_container_content_indeterminate_bubble {
  height: 30px;
  width: 30px;
  align-self: center;
  border-radius: 50%;
  transition: 0.5s;
  margin-bottom: 30px;
}

#select_climate_type_container_content_indeterminate_bubble:hover {
  height: 75px;
  width: 75px;
  transition: 0.5s;
  cursor: pointer;
}
</style>