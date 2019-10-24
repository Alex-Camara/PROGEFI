<template>
  <div id="vh_container">
    <div>
      <b class="is-size-6">Tipo de vegetación: {{ selectedVegetationType }} </b>
      <img id="vh_checked_icon" src="../assets/checked.png" v-if="selectedVegetationType" />
      <div>
        <p class="is-size-6">Formación vegetal: {{ selectedVegetalFormation }}</p>
        <ul id="vh_vegetalFormation_list">
          <li
            v-for="(vegetalFormation, index) in vegetalFormations"
            :key="vegetalFormation.id"
            :value="vegetalFormations.id"
            v-on:click="showVegetationTypes(vegetalFormation)"
          >
            <div id="vh_list_element">
              <div id="vh_vegetalFormation_bubble">
                <img :src="getImage(index)" />
              </div>
              <div id="vh_vegetalFormation_bubble_text">{{vegetalFormation.name}}</div>
            </div>
          </li>
        </ul>
      </div>

      <div class="box">
        <ul id="vh_vegetationType_list">
          <li
            v-for="(vegetationType, index) in selectedVegetationTypes"
            :key="vegetationType.id"
            :value="vegetationType.id"
          >
            <div id="vh_list_element">
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
  </div>
</template>

<script>
import store from "../store/store.js";
import { mapState } from "vuex";

export default {
  name: "vegetationTypeHelper",
  data() {
    return {
      vegetalFormationImages: [
        { imageSource: require("../assets/trees.png") },
        { imageSource: require("../assets/trees.png") },
        { imageSource: require("../assets/palm-tree.png") },
        { imageSource: require("../assets/palm-tree.png") },
        { imageSource: require("../assets/mangrove.png") },
        { imageSource: require("../assets/bush.png") },
        { imageSource: require("../assets/reed-bed.png") },
        { imageSource: require("../assets/grass.png") },
        { imageSource: require("../assets/cactus.png") },
        { imageSource: require("../assets/grass-2.png") },
        { imageSource: require("../assets/grass-3.png") },
        { imageSource: require("../assets/trees.png") }
      ],
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
      selectedVegetationType: null
    };
  },
  mounted() {
    store.dispatch("climateType/getVegetationTypes");
  },
  computed: {
    ...mapState("climateType", {
      vegetationTypes: state => state.vegetationTypes
    }),
    ...mapState("climateType", {
      vegetalFormations: state => state.vegetalFormations
    })
  },
  methods: {
    getImage(index) {
      return this.vegetalFormationImages[index].imageSource;
    },
    showVegetationTypes(vegetalFormation) {
      this.selectedVegetalFormation = vegetalFormation.name;
      this.selectedVegetationTypes = this.vegetationTypes.filter(
        vegetationType =>
          vegetationType.vegetalFormation_id == vegetalFormation.id
      );
      console.log("result arrya: " + this.selectedVegetationTypes);
    },
    setSelectedVegetationType(vegetationType){
      this.selectedVegetationType = vegetationType.name;
    },
    getColorCode(index) {
      console.log('color: ' + this.vegetationTypesColors[index].colorCode)
      return this.vegetationTypesColors[index].colorCode;
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

#vh_vegetalFormation_list {
  grid-row: 1 / 2;
  display: flex;
  justify-content: space-between;
  height: 120px;
  align-items: center;
  padding-top: 20px;
  padding-right: 60px;
  padding-left: 60px;
}

#vh_vegetalFormation_bubble {
  height: 40px;
  width: 40px;
  align-self: center;
  border-radius: 50%;
  display: inline-block;
  transition: 0.3s;
}

#vh_vegetalFormation_bubble + #vh_vegetalFormation_bubble_text {
  visibility: hidden;
}

#vh_vegetalFormation_bubble:hover {
  height: 50px;
  width: 50px;
  transition: 0.3s;
  cursor: pointer;
}

#vh_vegetalFormation_bubble_text {
  grid-row: 2 / 3;
  text-align: start;
  font-size: 0px;
  justify-self: start;
  justify-self: start;
  align-self: baseline;
  line-height: 12px;
  width: 40px;
  transition: 0.3s;
  white-space: pre;
}

#vh_vegetalFormation_bubble:hover + #vh_vegetalFormation_bubble_text {
  visibility: visible;
  font-size: 14px;
  transition: 0.3s;
  text-align: center;
  padding-top: 10px;
  padding-right: 60px;
  white-space: pre;
  width: 60px;
}

#vh_vegetationType_list {
  grid-row: 3 / 4;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100px;
}

#vh_vegetationType_bubble {
  height: 30px;
  width: 30px;
  margin-top: 5px;
  margin-right: 30px;
  margin-left: 30px;
  align-self: center;
  border-radius: 50%;
  display: inline-block;
  transition: 0.1s;
}

#vh_vegetationType_bubble_text {
  grid-row: 4 / 5;
  text-align: center;
  font-size: 10px;
  //font-weight: bold;
  justify-self: start;
  //background-color: red;
  justify-self: start;
  //align-self: baseline;
  line-height: 12px;
  width: 60px;
  transition: 0.1s;
  margin-right: 15px;
  margin-left: 15px;

  //white-space: pre;
}

#vh_vegetationType_bubble:hover {
  height: 40px;
  width: 40px;
  transition: 0.1s;
  cursor: pointer;
}

#vh_vegetationType_bubble:hover + #vh_vegetationType_bubble_text {
  //visibility: visible;
  font-size: 14px;
  //font-weight: bold;
  transition: 0.1s;
  //text-align: center;
  //display: inline-block;
  //white-space: pre;
  width: 80px;
  margin-right: 10px;
  margin-left: 10px;
  line-height: 16px;
}
</style>