<template>
  <div>
    <div id="ch_container">
      <div id="climateType_helper_container_header">
        <div id="climateType_helper_container_header_title">
          <required-field-helper
            id="climateType_helper_required_field"
            :name="null"
            :valid="isClimateTypeValid"
          ></required-field-helper>
          <b
            id="climateType_helper_container_header_title_value"
            class="is-size-6"
            v-text="'Tipo de clima: '"
          ></b>
          <b
            id="climateType_helper_container_header_value"
            class="is-size-6"
            v-if="climateTypeCode"
          >{{climateTypeCode}}</b>
          <img id="climateType_helper_checked_icon" src="../assets/checked.png" v-if="climateTypeCode" />
        </div>
        <div id="climateType_helper_container_header_addOption" v-on:click="addOption()">
          <b-tooltip label="Agregar otra opción" position="is-top">
            <img
              id="climateType_helper_container_header_addOption_icon"
              :src="require('../assets/more.png')"
            />
          </b-tooltip>
        </div>
      </div>
      <div id="ch_container_content">
        <div>
          <ul id="ch_list">
            <li
              id="bh_bubble"
              v-for="climateType in climateTypeState.climateTypes"
              :key="climateType.code"
              :value="climateType.code"
              :style="{'background-color': '#' + climateType.colorCode}"
              v-on:click="setClimateType(climateType)"
              @mouseover="showDescription(climateType.code)"
              @mouseleave="showSelectedDescription()"
            >
              <div id="bh_bubble_text">{{climateType.code}}</div>
            </li>
          </ul>
        </div>
        <b-message type="is-info" v-text="selectedDescription"></b-message>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/store.js";
import { mapState } from "vuex";
import requiredFieldHelper from "../helpers/requiredFieldHelper.vue";

export default {
  components: {
    "required-field-helper": requiredFieldHelper
  },
  name: "climateTypeHelper",
  data() {
    return {
      selectedTitle: "",
      selectedDescription: ""
    };
  },
  mounted() {
    store.dispatch("climateType/getClimateTypes");
  },
  computed: {
    ...mapState("climateType", {
      climateTypeState: state => state,
      climateTypeCode: state => state.climateType.code,
      isClimateTypeValid: state => state.climateType.valid
    }),
    selectedClimateType: {
      get: function() {
        return this.climateTypeState.climateType;
      },
      set: function(newValue) {
        store.dispatch("climateType/setClimateType", newValue);
      }
    }
  },
  methods: {
    showDescription(climateCode) {
      let climateType = this.climateTypeState.climateTypes.find(
        x => x.code === climateCode
      );
      this.selectedDescription = climateType.description;
    },
    setClimateType(climateType) {
      this.selectedClimateType = climateType;
      this.showSelectedDescription();
    },
    showSelectedDescription() {
      if (!this.selectedClimateType) {
        this.selectedDescription = "";
      } else {
        this.selectedDescription = this.selectedClimateType.description;
      }
    },
    addOption() {
      store.dispatch("modal/openModal", {
        title: "Tipos de clima",
        fieldText: "Ingresa el tipo de clima",
        mutationName: "climateType/setClimateType",
        valueName: "code",
        regex: "^[a-zA-Z \\u00C0-\\u00FF]*$",
        minLimit: 2,
        maxLimit: 10
      });
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";

#ch_container {
  display: grid;
  grid-template-rows: 30px 80px;
}

#climateType_helper_container_header {
  grid-row: 1 / 2;
  display: flex;
  justify-content: space-between;
}

#climateType_helper_container_header_title {
  align-self: start;
  display: flex;
}

#climateType_helper_required_field {
  align-self: center;
}

#climateType_helper_container_header_title_value {
  //color: black;
  margin-right: 10px;
}

#climateType_helper_container_header_value {
  color: $primary;
}

#climateType_helper_checked_icon {
  height: 20px;
  width: 20px;
  margin-left: 5px;
  align-self: center;
}

#climateType_helper_container_header_addOption {
  align-self: end;
}

#climateType_helper_container_header_addOption_icon {
  align-self: center;
  height: 20px;
  width: 20px;
  transition: 0.2s;
}

#climateType_helper_container_header_addOption_icon:hover {
  height: 25px;
  width: 25px;
  transition: 0.2s;
  cursor: pointer;
  filter: hue-rotate(180deg);
  -webkit-filter: hue-rotate(180deg);
}

#ch_container_content {
  grid-row: 2 / 3;
}

#ch_list {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 80px;
}

#bh_bubble {
  height: 30px;
  width: 30px;
  align-self: center;
  border-radius: 50%;
  line-height: 75px;
  transition: 0.5s;
}

#bh_bubble #bh_bubble_text {
  visibility: hidden;
}

#bh_bubble:hover {
  height: 75px;
  width: 75px;
  transition: 0.5s;
  cursor: pointer;
}

#bh_bubble_text {
  text-align: center;
  font-size: 0px;
}

#bh_bubble:hover #bh_bubble_text {
  visibility: visible;
  font-size: 16px;
  transition: 0.5s;
}
</style>