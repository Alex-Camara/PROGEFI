<template>
  <div>
    <div id="sex_helper_container" class="box">
      <div id="sex_helper_container_header">
        <div id="sex_helper_container_header_title">
          <required-field-helper id="sex_helper_required_field" :name="null" :valid="isSexValid"></required-field-helper>
          <b id="sex_helper_container_header_title_value" class="is-size-6" v-text="title"></b>
          <b id="sex_helper_container_header_value" class="is-size-6" v-if="sex">{{ sex }}</b>
          <img id="sex_helper_checked_icon" src="../assets/checked.png" v-if="sex" />
        </div>

        <div id="sex_helper_container_header_addOption" v-on:click="addOption()">
          <b-tooltip label="Agregar otra opción" position="is-top">
            <img
              id="sex_helper_container_header_addOption_icon"
              :src="require('../assets/more.png')"
            />
          </b-tooltip>
        </div>
      </div>

      <div>
        <ul id="sex_helper_list">
          <li
            id="sex_helper_list_item"
            v-for="sex in speciesDataState.sexes"
            :key="sex.name"
            :value="sex.name"
            v-on:click="setSex(sex)"
          >
            <img id="sex_helper_list_item_icon" :src="sex.iconPath" />
            <div id="sex_helper_list_item_text">{{sex.name}}</div>
          </li>
        </ul>
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
  data() {
    return {
      title: "Sexo: "
    };
  },
  mounted() {
    store.dispatch("speciesData/getSexes");
  },
  computed: {
    ...mapState("speciesData", {
      speciesDataState: state => state,
      isSexValid: state => state.sex.valid
    }),
    sex: {
      get: function() {
        return this.speciesDataState.sex.name;
      },
      set: function(newValue) {
        store.dispatch("speciesData/setSex", newValue);
      }
    }
  },
  methods: {
    setSex(sex) {
      this.sex = sex;
    },
    addOption() {
      store.dispatch("modal/openModal", {
        title: "Sexo",
        fieldText: "Ingresa el sexo del espécimen",
        mutationName: "speciesData/setSex",
        valueName: "name",
        regex: "^[a-zA-Z \\u00C0-\\u00FF]*$",
        minLimit: 2,
        maxLimit: 20
      });
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";

#sex_helper_container {
  display: grid;
  grid-template-rows: 40px 80px;
}

#sex_helper_container_header {
  grid-row: 1 / 2;
  display: flex;
  justify-content: space-between;
}

#sex_helper_container_header_title {
  align-self: start;
  display: flex;
}

#sex_helper_container_header_title_value {
  margin-right: 10px;
}

#sex_helper_container_header_value {
  color: $primary;
}

#sex_helper_checked_icon {
  height: 20px;
  width: 20px;
  margin-left: 5px;
  align-self: center;
}

#sex_helper_required_field {
  align-self: center;
}

#sex_helper_container_header_addOption {
  align-self: end;
}

#sex_helper_container_header_addOption_icon {
  height: 20px;
  width: 20px;
  transition: 0.2s;
}

#sex_helper_container_header_addOption_icon:hover {
  height: 25px;
  width: 25px;
  transition: 0.2s;
  cursor: pointer;
  filter: hue-rotate(180deg);
  -webkit-filter: hue-rotate(180deg);
}

#sex_helper_list {
  grid-row: 2 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90px;
}

#sex_helper_list_item {
  display: grid;
  grid-template-rows: 50px 10px;
  height: 90px;
  width: 120px;
  line-height: 50px;
  justify-content: center;
}

#sex_helper_list_item_icon {
  height: 40px;
  width: 40px;
  transition: 0.2s;
  justify-self: center;
}

#sex_helper_list_item_text {
  text-align: center;
  font-size: 14px;
}

#sex_helper_list_item_icon:hover {
  height: 45px;
  width: 45px;
  transition: 0.2s;
  cursor: pointer;
  filter: hue-rotate(180deg);
  -webkit-filter: hue-rotate(180deg);
}

#sex_helper_list_item_icon:hover + #sex_helper_list_item_text {
  font-weight: bold;
}
</style>