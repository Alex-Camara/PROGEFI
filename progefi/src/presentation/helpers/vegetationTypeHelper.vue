<template>
  <div id="vh_container">
    <div id="vh_container_header">
      <b class="is-size-6">Tipo de vegetación:</b>
      <b class="is-size-6" v-if="selectedVegetationType.name">{{ selectedVegetationType.name }}</b>
      <img id="vh_checked_icon" src="../assets/checked.png" v-if="selectedVegetationType.name" />
      <p class="is-size-6">Formación vegetal: {{ selectedVegetalFormation }}</p>
    </div>

    <div id="vh_container_vegetalFormation_element">
      <div id="previous_button" v-on:click="slideRight()">
        <img id="previous_button_icon" :src="require('../assets/left_arrow.png')" />
      </div>

      <ul id="vh_vegetalFormation_list">
        <li
          v-for="vegetalFormation in vegetalFormations"
          :key="vegetalFormation.id"
          :value="vegetalFormations.id"
          v-on:click="showVegetationTypes(vegetalFormation)"
        >
          <div id="vh_vegetalFormation_list_element">
            <div id="vh_vegetalFormation_bubble">
              <img :src="vegetalFormation.imagePath" />
            </div>
            <div id="vh_vegetalFormation_bubble_text">{{vegetalFormation.name}}</div>
          </div>
        </li>
      </ul>

      <div id="next_button" v-on:click="slideLeft()">
        <img id="next_button_icon" :src="require('../assets/right_arrow.png')" />
      </div>
    </div>

    <div id="vh_container_vegetationType_element" class="box">
      <ul id="vh_vegetationType_list">
        <li
          v-for="(vegetationType, index) in selectedVegetationTypes"
          :key="vegetationType.id"
          :value="vegetationType.id"
        >
          <div id="vh_vegetationType_list_element">
            <div
              id="vh_vegetationType_bubble"
              :style="{'background-color': getColorCode(index)}"
              v-on:click="setSelectedVegetationType(vegetationType)"
            ></div>
            <div id="vh_vegetationType_bubble_text">{{vegetationType.name}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from "../store/store.js";
import { mapState } from "vuex";

export default {
  name: "vegetationTypeHelper",
  data() {
    return {
      vegetationTypesColors: [
        { colorCode: "#26A69A" },
        { colorCode: "#80CBC4" },
        { colorCode: "#7CB342" },
        { colorCode: "#26A69A" },
        { colorCode: "#D4E157" },
        { colorCode: "#81C784" },
        { colorCode: "#00BFA5" },
        { colorCode: "#DCE775" },
        { colorCode: "#689F38" },
        { colorCode: "#8BC34A" },
        { colorCode: "#C0CA33" },
        { colorCode: "#66BB6A" }
      ],
      selectedVegetationTypes: [],
      selectedVegetalFormation: null,
      scroll: 0
    };
  },
  mounted() {
    store.dispatch("vegetationType/getVegetationTypes");
  },
  computed: {
    ...mapState("vegetationType", {
      vegetationTypeState: state => state,
      vegetalFormations: state => state.vegetalFormations
    }),
    selectedVegetationType: {
      get: function() {
        return this.vegetationTypeState.vegetationType;
      },
      set: function(newValue) {
        console.info(newValue);
        store.commit("vegetationType/setVegetationType", newValue);
        return newValue;
      }
    }
  },
  methods: {
    showVegetationTypes(vegetalFormation) {
      this.selectedVegetalFormation = vegetalFormation.name;
      this.selectedVegetationTypes = this.vegetationTypeState.vegetationTypes.filter(
        vegetationType =>
          vegetationType.vegetalFormationId == vegetalFormation.id
      );
    },
    setSelectedVegetationType(vegetationType) {
      this.selectedVegetationType = vegetationType;
    },
    getColorCode(index) {
      return this.vegetationTypesColors[index].colorCode;
    },
    slideLeft() {
      if (this.scroll < 1000) {
        this.scroll += 500;
      }
      document
        .getElementById("vh_vegetalFormation_list")
        .scroll({ left: this.scroll, behavior: "smooth" });
    },
    slideRight() {
      if (this.scroll > 0) {
        this.scroll -= 500;
      }
      document
        .getElementById("vh_vegetalFormation_list")
        .scroll({ left: this.scroll, behavior: "smooth" });
    }
  }
};
</script>

<style lang="scss">
#vh_container {
  height: 100%;
  display: grid;
  grid-template-rows: 25% 25% 25% 25%;
}

#vh_checked_icon {
  height: 20px;
  width: 20px;
  align-self: center;
}

#vh_container_vegetalFormation_element {
  grid-row: 1 / 2;
  display: grid;
  grid-template-columns: 60px 930px 60px;
  //background-color: red;
}

#vh_vegetalFormation_list {
  grid-column: 2 / 3;
  display: grid;
  grid-template-columns: 120px;
  grid-auto-flow: column;
  grid-gap: 10px;
  overflow-x: scroll;
  scroll-snap-type: x proximity;
  justify-content: space-between;
  height: 120px;
  align-items: center;
}

#previous_button {
  grid-column: 1 / 2;
  align-self: center;
  justify-self: start;
}

#previous_button_icon {
  width: 40px;
  height: 40px;
  transition: 0.2s;
}

#previous_button_icon:hover {
  width: 45px;
  height: 45px;
  transition: 0.2s;
  cursor: pointer;
}

#next_button {
  grid-column: 3 / 4;
  align-self: center;
  justify-self: end;
}

#next_button_icon {
  width: 40px;
  height: 40px;
  transition: 0.2s;
}

#next_button_icon:hover {
  width: 45px;
  height: 45px;
  transition: 0.2s;
  cursor: pointer;
}

#vh_vegetalFormation_list_element {
  display: grid;
  grid-template-rows: 50px 16px;
  grid-template-columns: 120px;
  line-height: 16px;
}

#vh_vegetalFormation_bubble {
  height: 45px;
  width: 45px;
  align-self: center;
  justify-self: center;
  border-radius: 50%;
  display: inline-block;
  transition: 0.2s;
}

#vh_vegetalFormation_bubble:hover {
  height: 50px;
  width: 50px;
  transition: 0.2s;
  cursor: pointer;
}

#vh_vegetalFormation_bubble_text {
  text-align: center;
  font-size: 10px;
  color: gray;
  transition: 0.2s;
}

#vh_vegetalFormation_bubble:hover + #vh_vegetalFormation_bubble_text {
  font-weight: bold;
  font-size: 12px;
  transition: 0.2s;
}

#vh_container_vegetationType_element {
  grid-row: 3 / 4;
  display: grid;
}

#vh_vegetationType_list {
  display: grid;
  grid-template-columns: 100px;
  grid-auto-flow: column;
  grid-gap: 10px;
  overflow-x: scroll;
  scroll-snap-type: x proximity;
  justify-content: center;
  align-content: center;
  height: 100px;
}

#vh_vegetationType_list_element {
  display: grid;
  grid-template-rows: 40px 16px;
  grid-template-columns: 100px;
  line-height: 25px;
}

#vh_vegetationType_bubble {
  height: 30px;
  width: 30px;
  align-self: center;
  justify-self: center;
  border-radius: 50%;
  transition: 0.1s;
}

#vh_vegetationType_bubble_text {
  grid-row: 4 / 5;
  text-align: center;
  font-size: 10px;
  line-height: 10px;
  transition: 0.1s;
}

#vh_vegetationType_bubble:hover {
  height: 40px;
  width: 40px;
  transition: 0.1s;
  cursor: pointer;
}

#vh_vegetationType_bubble:hover + #vh_vegetationType_bubble_text {
  font-size: 12px;
  font-weight: bold;
  transition: 0.1s;
}

@media screen and (max-width: 1200px) {
  #vh_container_vegetalFormation_element {
    grid-row: 1 / 2;
    display: grid;
    grid-template-columns: 60px 760px 60px;
    //background-color: red;
  }
}
</style>