<template>
  <div>
    <div id="lifeStage_helper_container" class="box">
      <div id="lifeStage_helper_container_header">
        <b class="is-size-6">
          Etapa: {{ lifeStage }}
          <img
            id="lifeStage_helper_checked_icon"
            src="../assets/checked.png"
            v-if="lifeStage"
          />
        </b>
      </div>

      <div id="lifeStage_helper_brood" @click="setLifeStage(lifeStages[0].name)"></div>
      <div id="lifeStage_helper_brood_text">
        <p v-text="lifeStages[0].name"></p>
      </div>

      <div id="lifeStage_helper_young" @click="setLifeStage(lifeStages[1].name)"></div>
      <div id="lifeStage_helper_young_text">
        <p v-text="lifeStages[1].name"></p>
      </div>

      <div id="lifeStage_helper_youngAdult" @click="setLifeStage(lifeStages[2].name)"></div>
      <div id="lifeStage_helper_youngAdult_text">
        <p v-text="lifeStages[2].name"></p>
      </div>

      <div id="lifeStage_helper_adult" @click="setLifeStage(lifeStages[3].name)"></div>
      <div id="lifeStage_helper_adult_text">
        <p v-text="lifeStages[3].name"></p>
      </div>

      <div
        id="lifeStage_helper_addOption"
        @mouseleave="lifeStages[4].symbol=require('../assets/more.png')"
        @mouseover="lifeStages[4].symbol=require('../assets/more_accent.png')"
        @click="addOption()"
      >
        <img :src="lifeStages[4].symbol" />
      </div>
      <div id="lifeStage_helper_addOption_text">
        <p v-text="lifeStages[4].name"></p>
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
      lifeStages: [
        { name: "Cría" },
        { name: "Juvenil" },
        { name: "Subadulto" },
        { name: "Adulto" },
        { name: "Otro", symbol: require("../assets/more.png") }
      ],
      selectedLifeStage: ""
    };
  },
  computed: {
    ...mapState("datacard", {
      datacard: state => state.datacard
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
  grid-template-rows: 40px 60px 20px;
  grid-template-columns: 20% 20% 20% 20% 20%;
  justify-items: center;
  align-items: center;
}

#lifeStage_helper_container_header {
  grid-row: 1 / 2;
  grid-column: 1 / -1;
  justify-self: start;
  align-self: start;
}

#lifeStage_helper_checked_icon {
  height: 20px;
  width: 20px;
  align-self: center;
}

#lifeStage_helper_brood {
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: #25b7d3;
  transition: 0.1s;
}

#lifeStage_helper_brood_text {
  grid-row: 3 / 4;
  grid-column: 1 / 2;
  text-align: center;
  font-size: 14px;
}

#lifeStage_helper_brood:hover {
  background-color: $accent;
  height: 25px;
  width: 25px;
  transition: 0.1s;
  cursor: pointer;
}

#lifeStage_helper_brood:hover + #lifeStage_helper_brood_text {
  font-weight: bold;
}

#lifeStage_helper_young {
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: #25b7d3;
  transition: 0.1s;
}

#lifeStage_helper_young_text {
  grid-row: 3 / 4;
  grid-column: 2 / 3;
  text-align: center;
  font-size: 14px;
}

#lifeStage_helper_young:hover {
  background-color: $accent;
  height: 30px;
  width: 30px;
  transition: 0.1s;
  cursor: pointer;
}

#lifeStage_helper_young:hover + #lifeStage_helper_young_text {
  font-weight: bold;
}

#lifeStage_helper_youngAdult {
  grid-row: 2 / 3;
  grid-column: 3 / 4;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: #25b7d3;
  transition: 0.1s;
}

#lifeStage_helper_youngAdult_text {
  grid-row: 3 / 4;
  grid-column: 3 / 4;
  text-align: center;
  font-size: 14px;
}

#lifeStage_helper_youngAdult:hover {
  background-color: $accent;
  height: 35px;
  width: 35px;
  transition: 0.1s;
  cursor: pointer;
}

#lifeStage_helper_youngAdult:hover + #lifeStage_helper_youngAdult_text {
  font-weight: bold;
}

#lifeStage_helper_adult {
  grid-row: 2 / 3;
  grid-column: 4 / 5;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background-color: #25b7d3;
  transition: 0.1s;
}

#lifeStage_helper_adult_text {
  grid-row: 3 / 4;
  grid-column: 4 / 5;
  text-align: center;
  font-size: 14px;
}

#lifeStage_helper_adult:hover {
  background-color: $accent;
  height: 40px;
  width: 40px;
  transition: 0.1s;
  cursor: pointer;
}

#lifeStage_helper_adult:hover + #lifeStage_helper_adult_text {
  font-weight: bold;
}

#lifeStage_helper_addOption {
  grid-row: 2 / 3;
  grid-column: 5 / 6;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  transition: 0.1s;
}

#lifeStage_helper_addOption:hover {
  height: 45px;
  width: 45px;
  transition: 0.1s;
  cursor: pointer;
}

#lifeStage_helper_addOption_text {
  grid-row: 3 / 4;
  grid-column: 5 / 6;
  font-size: 14px;
  //margin-right: 70px;
}

#lifeStage_helper_addOption:hover + #lifeStage_helper_addOption_text {
  font-weight: bold;
}
</style>