<template>
  <div>
    <div id="sex_helper_container" class="box">
      <div id="sex_helper_container_header">
        <div id="sex_helper_container_header_title">
          <required-field-helper
            id="sex_helper_required_field"
            :name="null"
            :valid="isSexValid"
          ></required-field-helper>
          <b
            id="sex_helper_container_header_title_value"
            class="is-size-6"
            v-text="title"
          ></b>
          <b
            id="sex_helper_container_header_value"
            class="is-size-6"
            v-if="sex"
            >{{ sex }}</b
          >
          <img
            id="sex_helper_checked_icon"
            src="../assets/checked.png"
            v-if="sex"
          />
        </div>

        <div
          id="sex_helper_container_header_addOption"
          v-on:click="addOption()"
        >
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
            v-for="(sex, index) in sexes"
            :key="sex.getName()"
            :value="sex.getName()"
            v-on:click="setSex($event, sex)"
          >
            <img id="sex_helper_list_item_icon" :src="getImage(index)"/>
            <div id="sex_helper_list_item_text">{{ sex.getName() }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import requiredFieldHelper from "../helpers/requiredFieldHelper.vue";
import Sex from "../models/sex";

export default {
  components: {
    "required-field-helper": requiredFieldHelper
  },
  data() {
    return {
      sexes: [],
      title: "Sexo: ",
      modalSex: new Sex(),
      // sexesImages: []
    };
  },
  async mounted() {
    this.sexes = await Sex.getAll();
    // for (let i = 0; i < this.sexes.length; i++) {
    //   this.sexesImages[i] = require('../assets/' + this.sexes[i].getIconPath());
    // }
    // this.$store.dispatch("speciesData/getSexes");
  },
  computed: {
    ...mapState("datacard", {
      datacard: state => state.datacard,
      isSexValid: state =>
        state.datacard
          .getCollect()
          .getSpecimen()
          .getSexValid()
    }),
    ...mapState("modal", {
      saveSexValue: state => state.saveSexValue
    }),
    sex: {
      get: function() {
        let sex = this.datacard
          .getCollect()
          .getSpecimen()
          .getSex();
        return sex.getName();
      },
      set: function(newValue) {
        this.datacard
          .getCollect()
          .getSpecimen()
          .setSex(newValue);
      }
    }
  },
  watch: {
    saveSexValue(newValue) {
      if (newValue) {
        this.sex = this.modalSex;
      }
      this.modalSex = new Sex();
      this.$store.commit("modal/reset");
    }
  },
  methods: {
    setSex(event, sex) {
      if (document.querySelector('#sex_helper_list_item .selected_dot') !== null) {
        document.querySelector('#sex_helper_list_item .selected_dot').classList.remove('selected_dot');
      }
      event.currentTarget.childNodes[0].classList.add("selected_dot");
      this.sex = sex;
    },
    getImage(index){
      return require("../assets/" + this.sexes[index].getIconPath());
    },
    addOption() {
      this.$store.dispatch("modal/openModal", {
        title: "Sexo",
        fieldText: "Ingresa el sexo del espécimen",
        model: this.modalSex,
        getter: "getName",
        setter: "setName",
        getterValid: "getNameValid"
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../style/style.scss";
.selected_dot {
  height: 35px!important;
  width: 35px!important;
  transition: 0.2s;
  cursor: pointer;
}

.selected_dot + #sex_helper_list_item_text {
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}
</style>

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
  // filter: hue-rotate(180deg);
  // -webkit-filter: hue-rotate(180deg);
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
  height: 25px;
  width: 25px;
  transition: 0.2s;
  justify-self: center;
  margin: auto;
}

#sex_helper_list_item_text {
  text-align: center;
  font-size: 14px;
}

#sex_helper_list_item_icon:hover {
  height: 35px;
  width: 35px;
  transition: 0.2s;
  cursor: pointer;
  // filter: hue-rotate(180deg);
  // -webkit-filter: hue-rotate(180deg);
}

#sex_helper_list_item_icon:hover + #sex_helper_list_item_text {
  font-weight: bold;
}
</style>
