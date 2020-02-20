<template>
  <!-- --------GeographicalData Component----- -->
  <div id="geographicalData_component" class="box">
    <!-- --------GeographicalData Component Header----- -->
    <div id="geographicalData_component_header">
      <p class="subtitle is-5">Datos geográficos</p>
    </div>

    <div>
      <select-location id="geographicalData_component_top"></select-location>
    </div>

    <div id="geographicalData_component_bottom">
      <select-climate-type id="climateTypeHelper" class="box"></select-climate-type>
      <select-vegetation-type id="vegetationTypeHelper" class="box"></select-vegetation-type>
    </div>

    <!-- --------GeographicalData Bottom Buttons----- -->
    <div id="geographicalData_component_bottomButtons">
      <b-button type="is-light" v-on:click="backwardStep()">Anterior</b-button>
      <b-button
        type="is-accent"
        v-on:click="forwardStep()"
        :disabled="disableNextButton()"
      >Siguiente</b-button>
    </div>
  </div>
</template>

<script>
import store from "../../store/store.js";
import { mapState } from "vuex";
import selectClimateType from "../../components/selectClimateType.vue";
import selectVegetationType from "../../components/selectVegetationType.vue";
import selectLocation from "../../components/selectLocation.vue";

export default {
  components: {
    "select-climate-type": selectClimateType,
    "select-vegetation-type": selectVegetationType,
    "select-location": selectLocation
  },
  computed: {
    ...mapState("location", {
      isCountryValid: state => state.location.getCountryValid(),
      isCountryStateValid: state => state.location.getCountryStateValid(),
      isMunicipalityValid: state => state.location.getMunicipalityValid(),
      isLocalityValid: state => state.location.getLocalityValid()
    }),
    ...mapState("coordinate", {
      isLongitudeValid: state => state.location.getLongitudeValid(),
      isLatitudeValid: state => state.location.getLatitudeValid(),
      isAltitudeValid: state => state.location.getAltitudeValid()
    }),
    ...mapState("climateType", {
      isClimateTypeValid: state => state.climateType.valid
    }),
    ...mapState("vegetationType", {
      isVegetationTypeValid: state => state.vegetationType.valid
    })
  },
  methods: {
    backwardStep() {
      store.commit("addDatacard/setActiveStep", 1);
    },
    forwardStep() {
      store.commit("addDatacard/setActiveStep", 3);
    },
    disableNextButton() {
      if (
        this.isCountryValid.isValid &&
        this.isCountryStateValid.isValid &&
        this.isMunicipalityValid.isValid &&
        this.isLocalityValid.isValid &&
        this.isLongitudeValid.isValid &&
        this.isLatitudeValid.isValid &&
        this.isAltitudeValid.isValid &&
        this.isClimateTypeValid.isValid &&
        this.isVegetationTypeValid.isValid
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss">
#geographicalData_component {
  display: grid;
  grid-template-rows: 50px 820px 690px 70px;
  height: 1650px;
  width: 100%;
  margin-top: 10px;
  align-items: center;
}

#geographicalData_component_header {
  grid-row: 1 / 2;
  justify-self: center;
  height: 50px;
}

#geographicalData_component_top {
  grid-row: 2 / 3;
}

#geographicalData_component_bottom {
  grid-row: 3 / 4;
  display: grid;
  grid-template-rows: 300px 350px;
}

#climateTypeHelper {
  grid-row: 1 / 2;
}

#vegetationTypeHelper {
  grid-row: 2 / 3;
}

#geographicalData_component_bottomButtons {
  grid-row: 4 / 5;
  justify-self: end;
}
</style>