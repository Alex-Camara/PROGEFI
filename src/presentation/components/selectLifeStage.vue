<template>
  <div>
    <div id="lifeStage_helper_container" class="box">
      <div id="lifeStage_helper_container_header">
        <div id="lifeStage_helper_container_header_title">
          <required-field-helper
            id="lifeStage_helper_required_field"
            :name="null"
            :valid="isLifeStageValid"
          ></required-field-helper>
          <b
            id="lifeStage_helper_container_header_title_value"
            class="is-size-6"
            >{{ title }}</b
          >
          <b
            id="lifeStage_helper_container_header_value"
            class="is-size-6"
            v-if="lifeStage"
            >{{ lifeStage }}</b
          >
          <img
            id="lifeStage_helper_checked_icon"
            src="../assets/checked.png"
            v-if="lifeStage"
          />
        </div>

        <div
          id="lifeStage_helper_container_header_addOption"
          v-on:click="addOption()"
        >
          <b-tooltip label="Agregar otra opción" position="is-top">
            <img
              id="lifeStage_helper_container_header_addOption_icon"
              :src="require('../assets/more.png')"
            />
          </b-tooltip>
        </div>
      </div>

      <div>
        <ul id="lifeStage_helper_list">
          <li
            id="lifeStage_helper_list_item"
            v-for="lifeStage in lifeStages"
            :key="lifeStage.getName()"
            :value="lifeStage.getName()"
            v-on:click="setLifeStage($event, lifeStage)"
          >
            <!--            <img id="lifeStage_helper_list_item_icon" :src="lifeStage.getIconPath()" />-->
            <div id="lifeStage_helper_list_item_icon" class="dot"></div>
            <div id="lifeStage_helper_list_item_text">
              {{ lifeStage.getName() }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import requiredFieldHelper from "../helpers/requiredFieldHelper.vue";
import LifeStage from "../models/lifeStage";
import Sex from "../models/sex";

export default {
  components: {
    "required-field-helper": requiredFieldHelper
  },
  data() {
    return {
      lifeStages: [],
      title: "Etapa:",
      selectedLifeStage: "",
      modalLifeStage: new LifeStage()
    };
  },
  async mounted() {
    this.lifeStages = await LifeStage.getAll();
  },
  computed: {
    ...mapState("datacard", {
      datacard: state => state.datacard,
      isLifeStageValid: state =>
        state.datacard
          .getCollect()
          .getSpecimen()
          .getLifeStageValid()
    }),
    ...mapState("modal", {
      saveLifeStageValue: state => state.saveLifeStageValue
    }),
    lifeStage: {
      get: function() {
        let lifeStage = this.datacard
          .getCollect()
          .getSpecimen()
          .getLifeStage();
        return lifeStage.getName();
      },
      set: function(newValue) {
        this.datacard
          .getCollect()
          .getSpecimen()
          .setLifeStage(newValue);
      }
    }
  },
  watch: {
    saveLifeStageValue(newValue) {
      if (newValue) {
        this.lifeStage = this.modalLifeStage;
      }
      this.modalLifeStage = new LifeStage();
      this.$store.commit("modal/reset");
    }
  },
  methods: {
    getLifeStages() {},
    setLifeStage(event, lifeStage) {
      if (document.querySelector('#lifeStage_helper_list_item .selected_dot') !== null) {
        document.querySelector('#lifeStage_helper_list_item .selected_dot').classList.remove('selected_dot');
      }
      event.currentTarget.childNodes[0].classList.add("selected_dot");
      this.lifeStage = lifeStage;
    },
    addOption() {
      this.$store.dispatch("modal/openModal", {
        title: "Etapas de vida",
        fieldText: "Ingresa la etapa de vida",
        model: this.modalLifeStage,
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
.dot {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: 0.2s;
  justify-self: center;
  margin: auto;
}
.dot:hover {
  height: 35px;
  width: 35px;
  background-color: $secondary;
  transition: 0.2s;
  cursor: pointer;
}
  .dot:hover + #lifeStage_helper_list_item_text {
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
  }

  .selected_dot{
    height: 35px;
    width: 35px;
    background-color: $secondary;
    transition: 0.2s;
    cursor: pointer;
  }

  .selected_dot + #lifeStage_helper_list_item_text {
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
  }
</style>

<style lang="scss">
@import "../style/style.scss";

#lifeStage_helper_container {
  display: grid;
  grid-template-rows: 40px 80px;
}

#lifeStage_helper_container_header {
  grid-row: 1 / 2;
  //grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
}

#lifeStage_helper_container_header_title {
  align-self: start;
  display: flex;
}

#lifeStage_helper_required_field {
  align-self: center;
}

#lifeStage_helper_container_header_title_value {
  //color: black;
  margin-right: 10px;
}

#lifeStage_helper_container_header_value {
  color: $primary;
}

#lifeStage_helper_checked_icon {
  height: 20px;
  width: 20px;
  margin-left: 5px;
  align-self: center;
}

#lifeStage_helper_container_header_addOption {
  align-self: end;
  margin-right: 10px;
}

#lifeStage_helper_container_header_addOption_icon {
  height: 20px;
  width: 20px;
  transition: 0.2s;
}

#lifeStage_helper_container_header_addOption_icon:hover {
  height: 25px;
  width: 25px;
  transition: 0.2s;
  cursor: pointer;
  filter: hue-rotate(180deg);
  -webkit-filter: hue-rotate(180deg);
}

#lifeStage_helper_list {
  grid-row: 2 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

#lifeStage_helper_list_item {
  display: grid;
  grid-template-rows: 50px 10px;
  height: 80px;
  width: 120px;
  line-height: 50px;
  justify-content: center;
}

/*#lifeStage_helper_list_item_icon {*/
/*  height: 40px;*/
/*  width: 40px;*/
/*  //border-radius: 50%;*/
/*  //background-color: white;*/
/*  transition: 0.2s;*/
/*  justify-self: center;*/
/*}*/

#lifeStage_helper_list_item_text {
  text-align: center;
  font-size: 14px;
}

/*#lifeStage_helper_list_item_icon:hover {*/
/*  height: 45px;*/
/*  width: 45px;*/
/*  transition: 0.2s;*/
/*  cursor: pointer;*/
/*}*/

#lifeStage_helper_list_item_icon:hover + #lifeStage_helper_list_item_text {
  font-weight: bold;
  cursor: pointer;
}
</style>
