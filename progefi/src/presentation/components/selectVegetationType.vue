<template>
  <div>
    <div id="select_vegetation_container">
      <div id="select_vegetation_container_header">
        <div id="select_vegetation_container_header_title">
          <required-field-helper
            id="select_vegetation_required_field"
            :name="null"
            :valid="vegetationTypeValid"
          ></required-field-helper>
          <b
            id="select_vegetation_container_header_title_value"
            class="is-size-6"
            v-text="'Tipo de vegetación: '"
          ></b>
          <b
            id="select_vegetation_container_header_value"
            class="is-size-6"
            v-if="selectedVegetationType.name "
          >{{ selectedVegetationType.name }}</b>
          <img
            id="select_vegetation_checked_icon"
            src="../assets/checked.png"
            v-if="selectedVegetationType.name "
          />
        </div>

        <div id="select_vegetation_container_header_addOption" v-on:click="addOption()">
          <b-tooltip label="Agregar otra opción" position="is-top">
            <img
              id="select_vegetation_container_header_addOption_icon"
              :src="require('../assets/more.png')"
            />
          </b-tooltip>
        </div>
      </div>

      <div id="select_vegetation_container_header_vegetalFormation_title">
        <p class="is-size-6">Formación vegetal: {{ selectedVegetalFormation }}</p>
      </div>

      <div id="select_vegetation_container_vegetalFormation_element">
        <div id="select_vegetation_previous_button" v-on:click="slideRight()">
          <img
            id="select_vegetation_previous_button_icon"
            :src="require('../assets/left_arrow.png')"
          />
        </div>

        <ul id="select_vegetation_vegetal_formation_list">
          <li
            id="select_vegetation_vegetal_formation_list_item"
            v-for="vegetalFormation in vegetalFormations"
            :key="vegetalFormation.getId()"
            :value="vegetalFormation"
            v-on:click="showVegetationTypes(vegetalFormation)"
          >
            <div id="select_vegetation_vegetal_formation_list_element">
              <div id="select_vegetation_vegetal_formation_bubble">
                <img :src="require('../assets/' + vegetalFormation.getImagePath())" />
              </div>
              <div
                id="select_vegetation_vegetal_formation_bubble_text"
              >{{vegetalFormation.getName()}}</div>
            </div>
          </li>
        </ul>

        <div id="select_vegetation_next_button" v-on:click="slideLeft()">
          <img id="select_vegetation_next_button_icon" :src="require('../assets/right_arrow.png')" />
        </div>
      </div>

      <div id="select_vegetation_container_vegetationType_element" class="box">
        <ul id="select_vegetation_type_list">
          <li
            id="select_vegetation_type_list_item"
            v-for="(vegetationType, index) in selectedVegetationTypes"
            :key="vegetationType.getId()"
            :value="vegetationType.getId()"
            v-on:click="setSelectedVegetationType(vegetationType)"
          >
            <div id="select_vegetation_type_list_element">
              <div
                id="select_vegetation_type_bubble"
                :style="{'background-color': getColorCode(index)}"
              ></div>
              <div id="select_vegetation_type_bubble_text">{{vegetationType.getName()}}</div>
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
import VegetalFormation from "../models/vegetalFormation";
import VegetationType from "../models/vegetationType";

export default {
  components: {
    "required-field-helper": requiredFieldHelper
  },
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
      vegetalFormations: [],
      selectedVegetationTypes: [],
      selectedVegetalFormation: null,
      modalVegetationType: new VegetationType(),
      scroll: 0
    };
  },
  async mounted() {
    this.vegetalFormations = await VegetalFormation.getAll();
  },
  computed: {
    ...mapState("datacard", {
      datacard: state => state.datacard,
      vegetationTypeValid: state =>
        state.datacard
          .getCollect()
          .getVegetationType()
          .getNameValid()
    }),
    ...mapState("modal", {
      saveVegetationTypeValue: state => state.saveVegetationTypeValue,
    }),
    selectedVegetationType: {
      get: function() {
        let vegetationType = this.datacard.getCollect().getVegetationType();
        return vegetationType;
      },
      set: function(newValue) {
        this.datacard.getCollect().setVegetationType(newValue);
      }
    }
  },
  watch:{
    saveVegetationTypeValue(newValue){
      if (newValue){
        this.selectedVegetationType = this.modalVegetationType;
      }
      this.modalVegetationType = new VegetationType();
      this.$store.commit("modal/reset");
    }
  },
  methods: {
    showVegetationTypes(vegetalFormation) {
      if (vegetalFormation.getName() === "Indeterminado") {
        this.setSelectedVegetationType({ name: "Indeterminado" });
        this.selectedVegetationTypes = [];
      } else {
        this.selectedVegetalFormation = vegetalFormation.getName();
        this.selectedVegetationTypes = vegetalFormation.getVegetationTypes();
      }
    },
    getImage(index){

    },
    setSelectedVegetationType(vegetationType) {
      this.selectedVegetationType = vegetationType;
    },
    getColorCode(index) {
      return this.vegetationTypesColors[index].colorCode;
    },
    addOption() {
      this.$store.dispatch("modal/openModal", {
        title: "Tipos de vegetación",
        fieldText: "Ingresa el tipo de vegetación",
        model: this.modalVegetationType,
        getter: "getName",
        setter: "setName",
        getterValid: "getNameValid"
      });
    },
    slideLeft() {
      if (this.scroll < 1000) {
        this.scroll += 500;
      }
      document
        .getElementById("select_vegetation_vegetal_formation_list")
        .scroll({ left: this.scroll, behavior: "smooth" });
    },
    slideRight() {
      if (this.scroll > 0) {
        this.scroll -= 500;
      }
      document
        .getElementById("select_vegetation_vegetal_formation_list")
        .scroll({ left: this.scroll, behavior: "smooth" });
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";
#select_vegetation_container {
  height: 100%;
  display: grid;
  grid-template-rows: 40px 30px 110px 130px 140px 140px;
}

#select_vegetation_container_header {
  grid-row: 1 / 2;
  display: flex;
  justify-content: space-between;
}

#select_vegetation_container_header_title {
  align-self: start;
  display: flex;
}

#select_vegetation_required_field {
  align-self: center;
}

#select_vegetation_container_header_title_value {
  //color: black;
  margin-right: 10px;
}

#select_vegetation_container_header_value {
  color: $primary;
}

#select_vegetation_checked_icon {
  height: 20px;
  width: 20px;
  margin-left: 5px;
  align-self: center;
}

#select_vegetation_container_header_addOption {
  align-self: end;
}

#select_vegetation_container_header_addOption_icon {
  height: 20px;
  width: 20px;
  transition: 0.2s;
}

#select_vegetation_container_header_addOption_icon:hover {
  height: 25px;
  width: 25px;
  transition: 0.2s;
  cursor: pointer;
  filter: hue-rotate(180deg);
  -webkit-filter: hue-rotate(180deg);
}

#select_vegetation_container_header_vegetalFormation_title {
  grid-row: 2 / 3;
}

#select_vegetation_container_vegetalFormation_element {
  grid-row: 3 / 4;
  display: grid;
  grid-template-columns: 60px 930px 60px;
  //background-color: red;
}

#select_vegetation_vegetal_formation_list {
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

#select_vegetation_previous_button {
  grid-column: 1 / 2;
  align-self: center;
  justify-self: start;
}

#select_vegetation_previous_button_icon {
  width: 40px;
  height: 40px;
  transition: 0.2s;
}

#select_vegetation_previous_button_icon:hover {
  width: 45px;
  height: 45px;
  transition: 0.2s;
  cursor: pointer;
}

#select_vegetation_next_button {
  grid-column: 3 / 4;
  align-self: center;
  justify-self: end;
}

#select_vegetation_next_button_icon {
  width: 40px;
  height: 40px;
  transition: 0.2s;
}

#select_vegetation_next_button_icon:hover {
  width: 45px;
  height: 45px;
  transition: 0.2s;
  cursor: pointer;
}

#select_vegetation_vegetal_formation_list_element {
  display: grid;
  grid-template-rows: 50px 16px;
  grid-template-columns: 120px;
  line-height: 16px;
}

#select_vegetation_vegetal_formation_bubble {
  height: 45px;
  width: 45px;
  align-self: center;
  justify-self: center;
  border-radius: 50%;
  display: inline-block;
  transition: 0.2s;
}

#select_vegetation_vegetal_formation_bubble:hover {
  height: 50px;
  width: 50px;
  transition: 0.2s;
  cursor: pointer;
}

#select_vegetation_vegetal_formation_bubble_text {
  text-align: center;
  font-size: 10px;
  color: gray;
  transition: 0.2s;
}

#select_vegetation_vegetal_formation_bubble:hover
  + #select_vegetation_vegetal_formation_bubble_text {
  font-weight: bold;
  font-size: 12px;
  transition: 0.2s;
}

#select_vegetation_container_vegetationType_element {
  grid-row: 4 / 5;
  display: grid;
}

#select_vegetation_type_list {
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

#select_vegetation_type_list_element {
  display: grid;
  grid-template-rows: 40px 16px;
  grid-template-columns: 100px;
  line-height: 25px;
}

#select_vegetation_type_bubble {
  height: 30px;
  width: 30px;
  align-self: center;
  justify-self: center;
  border-radius: 50%;
  transition: 0.1s;
}

#select_vegetation_type_bubble_text {
  grid-row: 5 / 6;
  text-align: center;
  font-size: 10px;
  line-height: 10px;
  transition: 0.1s;
}

#select_vegetation_type_bubble:hover {
  height: 40px;
  width: 40px;
  transition: 0.1s;
  cursor: pointer;
}

#select_vegetation_type_bubble:hover + #select_vegetation_type_bubble_text {
  font-size: 12px;
  font-weight: bold;
  transition: 0.1s;
}

@media screen and (max-width: 1200px) {
  #select_vegetation_container_vegetalFormation_element {
    grid-row: 3 / 4;
    display: grid;
    grid-template-columns: 60px 760px 60px;
    //background-color: red;
  }
}
</style>