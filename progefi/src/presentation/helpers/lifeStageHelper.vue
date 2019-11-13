<template>
  <div>
    <div id="lifeStage_helper_container" class="box">
      <div id="lifeStage_helper_container_header">
        <div id="lifeStage_helper_container_header_title">
          <b class="is-size-6">
            Etapa: {{ lifeStage }}
            <img
              id="lifeStage_helper_checked_icon"
              src="../assets/checked.png"
              v-if="lifeStage"
            />
          </b>
        </div>

        <div id="lifeStage_helper_container_header_addOption" v-on:click="addOption()">
          <b-tooltip label="Agregar otro opción" position="is-top">
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
            :key="lifeStage.name"
            :value="lifeStage.name"
            v-on:click="setLifeStage(lifeStage.name)"
          >
            <div id="lifeStage_helper_list_item_icon"></div>
            <div id="lifeStage_helper_list_item_text">{{lifeStage.name}}</div>
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
    return {
      selectedLifeStage: ""
    };
  },
  computed: {
    ...mapState("datacard", {
      datacard: state => state.datacard
    }),
    ...mapState("speciesData", {
      lifeStages: state => state.lifeStages
    }),
    lifeStage: {
      get: function() {
        return this.datacard.species.lifeStage;
      },
      set: function(newValue) {
        store.commit("datacard/setLifeStage", newValue);
        return newValue;
      }
    }
  },
  mounted() {
    store.dispatch("speciesData/getLifeStages");
  },
  methods: {
    setLifeStage(lifeStage) {
      this.lifeStage = lifeStage;
    },
    addOption() {
      this.$buefy.dialog.prompt({
        type: "is-secondary",
        message: `Introduce la etapa`,
        confirmText: "Agregar",
        cancelText: "Cancelar",
        inputAttrs: {
          maxlength: 20
        },
        trapFocus: true,
        onConfirm: value => this.setLifeStage(value)
      });
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";

#lifeStage_helper_container {
  display: grid;
  grid-template-rows: 40px 80px;
}

#lifeStage_helper_container_header {
  grid-row: 1 / 2;
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
}

#lifeStage_helper_container_header_title {
  align-self: start;
}

#lifeStage_helper_container_header_addOption {
  align-self: end;
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

#lifeStage_helper_checked_icon {
  height: 20px;
  width: 20px;
  align-self: center;
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

#lifeStage_helper_list_item_icon {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #25b7d3;
  transition: 0.2s;
  justify-self: center;
}

#lifeStage_helper_list_item_text {
  text-align: center;
  font-size: 14px;
}

#lifeStage_helper_list_item_icon:hover {
  height: 45px;
  width: 45px;
  transition: 0.2s;
  cursor: pointer;
  filter: hue-rotate(180deg);
  -webkit-filter: hue-rotate(180deg);
}

#lifeStage_helper_list_item_icon:hover + #lifeStage_helper_list_item_text {
  font-weight: bold;
}
</style>