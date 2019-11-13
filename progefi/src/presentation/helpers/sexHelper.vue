<template>
  <div>
    <div id="sex_helper_container" class="box">
      <div id="sex_helper_container_header">
        <div id="sex_helper_container_header_title">
          <b class="is-size-6">
            Sexo: {{ sex }}
            <img id="sex_helper_checked_icon" src="../assets/checked.png" v-if="sex" />
          </b>
        </div>

        <div id="sex_helper_container_header_addOption" v-on:click="addOption()">
          <b-tooltip label="Agregar otro opción" position="is-top">
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
            v-for="sex in sexes"
            :key="sex.name"
            :value="sex.name"
            v-on:click="setSex(sex.name)"
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

export default {
  data() {
    return {};
  },
  mounted() {
    store.dispatch("speciesData/getSexes");
  },
  computed: {
    ...mapState("datacard", {
      datacard: state => state.datacard
    }),
    ...mapState("speciesData", {
      sexes: state => state.sexes
    }),
    sex: {
      get: function() {
        return this.datacard.species.sex;
      },
      set: function(newValue) {
        store.commit("datacard/setSex", newValue);
        return newValue;
      }
    }
  },
  methods: {
    setSex(sex) {
      if (sex == "Otro") {
        this.addOption();
      } else {
        this.sex = sex;
      }
    },
    addOption() {
      this.$buefy.dialog.prompt({
        type: "is-secondary",
        message: `Introduce el sexo`,
        confirmText: "Agregar",
        cancelText: "Cancelar",
        inputAttrs: {
          maxlength: 20
        },
        trapFocus: true,
        onConfirm: value => this.setSex(value)
      });
    }
  }
  /*
                receivedSexes.push({
                    name: "Otro",
                    iconPath: require("../assets/more.png")
                }); */
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

#sex_helper_checked_icon {
  height: 20px;
  width: 20px;
  align-self: center;
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