<template>
  <!-- --------GeographicalData Component----- -->
  <div id="geographicalData_component" class="box">
    <!-- --------GeographicalData Component Header----- -->
    <div id="geographicalData_component_header">
      <p class="subtitle is-5">Datos geográficos</p>
    </div>

    <!-- --------GeographicalData Component Content----- -->
    <div id="geographicalData_component_content_topFields" class="box">
      <div id="geographicalData_component_content_topFields_header">
        <b class="is-size-6">Datos de ubicación:</b>
      </div>
      <div id="geographicalData_component_content_topFields_coordinates">
        <!-- ------- longitude field ----- -->
        <metadata-helper
          id="longitude_helper"
          v-bind:selectedValue="longitude"
          v-bind:attribute="'longitude'"
          v-if="metadataState.longitude"
        ></metadata-helper>

        <b-field id="longitude_input_field" custom-class="is-small is-centered">
          <template slot="label">
            <required-field-helper :name="'Longitud:'" :valid="isLongitudeValid"></required-field-helper>
          </template>
          <input id="longitude_input" class="input" v-model="longitude" placeholder="Longitud" />
        </b-field>

        <!-- ------- latitude field ----- -->

        <metadata-helper
          id="latitude_helper"
          v-bind:selectedValue="latitude"
          v-bind:attribute="'latitude'"
          v-if="metadataState.latitude"
        ></metadata-helper>

        <b-field id="latitude_input_field" custom-class="is-small is-centered">
          <template slot="label">
            <required-field-helper :name="'Latitud:'" :valid="isLatitudeValid"></required-field-helper>
          </template>
          <input id="latitude_input" class="input" v-model="latitude" placeholder="Latitud" />
        </b-field>

        <!-- ------- altitude field ----- -->

        <metadata-helper
          id="altitude_helper"
          v-bind:selectedValue="altitude"
          v-bind:attribute="'altitude'"
          v-if="metadataState.altitude"
        ></metadata-helper>

        <b-field id="altitude_input_field">
          <b-field custom-class="is-small is-centered">
            <template slot="label">
              <required-field-helper :name="'Altitud:'" :valid="isAltitudeValid"></required-field-helper>
            </template>
            <input id="altitude_input" class="input" v-model="altitude" placeholder="Altitud" />
          </b-field>
          <p id="altitude_input_message" class="control">
            <span class="button is-static">msnm</span>
          </p>
        </b-field>
      </div>

      <div id="geographicalData_component_content_topFields_namedLocation">
        <!-- ------- country select ----- -->
        <b-field id="country_input_field" custom-class="is-small is-centered" label="País:">
          <template slot="label">
            <required-field-helper :name="'País:'" :valid="isCountryValid"></required-field-helper>
          </template>
          <input id="country_input" class="input is-small" v-model="country" />
        </b-field>

        <!-- ------- countryState select ----- -->
        <b-field id="state_input_field" custom-class="is-small is-centered" label="Estado:">
          <template slot="label">
            <required-field-helper :name="'Estado:'" :valid="isCountryStateValid"></required-field-helper>
          </template>
          <input id="state_input" class="input is-small" v-model="countryState" />
        </b-field>

        <!-- ------- municipality select ----- -->
        <b-field
          id="municipality_input_field"
          custom-class="is-small is-centered"
          label="Municipio:"
        >
          <template slot="label">
            <required-field-helper :name="'Municipio:'" :valid="isMunicipalityValid"></required-field-helper>
          </template>
          <input id="municipality_input" class="input is-small" v-model="municipality" />
        </b-field>

        <!-- ------- locality select ----- -->
        <b-field id="locality_input_field" custom-class="is-small is-centered" label="Localidad:">
          <template slot="label">
            <required-field-helper :name="'Localidad:'" :valid="isLocalityValid"></required-field-helper>
          </template>
          <input id="locality_input" class="input is-small" v-model="locality" />
        </b-field>
      </div>
    </div>

    <div
      id="geographicalData_component_map"
      v-observe-visibility="visibilityChanged"
      class="box has-background-light"
    >
      <v-map
        ref="map"
        id="map"
        :max-zoom="maxZoom"
        :min-zoom="minZoom"
        :max-bounds="maxBounds"
        :zoom="zoom"
        :center="center"
        :options="{zoomControl: true, attributionControl: false}"
      >
        <v-tile-layer :url="url" :noWrap="noWrap"></v-tile-layer>
        <v-marker :lat-lng.sync="center" :draggable="true"></v-marker>
      </v-map>
    </div>

    <div id="geographicalData_component_bottom">
      <climateType-helper id="climateTypeHelper" class="box"></climateType-helper>
      <vegetationType-helper id="vegetationTypeHelper" class="box"></vegetationType-helper>
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
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import metadataHelper from "../../helpers/metadataHelper.vue";
import climateTypeHelper from "../../helpers/climateTypeHelper.vue";
import vegetationTypeHelper from "../../helpers/vegetationTypeHelper.vue";
import requiredFieldHelper from "../../helpers/requiredFieldHelper.vue";
import Location from "../../models/location.js";

export default {
  components: {
    "v-map": LMap,
    "v-tile-layer": LTileLayer,
    "v-marker": LMarker,
    "metadata-helper": metadataHelper,
    "climateType-helper": climateTypeHelper,
    "vegetationType-helper": vegetationTypeHelper,
    "required-field-helper": requiredFieldHelper
  },
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 5,
      maxZoom: 18,
      minZoom: 2,
      noWrap: true,
      maxBounds: [{ lat: -90, lng: -180 }, { lat: 90, lng: 180 }],
      locationObject: new Location()
    };
  },
  mounted() {
    //inicializar el marcador del mapa en el centro de México
    this.center = { lat: this.latitude, lng: this.longitude };
    store.commit("location/setLocation", this.locationObject);
    store.commit("coordinate/setLocation", this.locationObject);
  },
  computed: {
    ...mapState("metadata", {
      metadataState: state => state
    }),
    ...mapState("location", {
      locationState: state => state,
      location: state => state.location,
      isCountryValid: state => state.location.getCountryValid(),
      isCountryStateValid: state => state.location.getCountryStateValid(),
      isMunicipalityValid: state => state.location.getMunicipalityValid(),
      isLocalityValid: state => state.location.getLocalityValid()
    }),
    ...mapState("coordinate", {
      coordinateState: state => state,
      isLongitudeValid: state => state.location.getLongitudeValid(),
      isLatitudeValid: state => state.location.getLatitudeValid(),
      isAltitudeValid: state => state.location.getAltitudeValid()
    }),
    ...mapState("climateType", {
      isClimateTypeValid: state => state.climateType.valid
    }),
    ...mapState("vegetationType", {
      isVegetationTypeValid: state => state.vegetationType.valid
    }),
    longitude: {
      get: function() {
        let longitude = this.location.getLongitude();

        if (this.isLocalityValid.message == "temporary error") {
          this.addShakeEffect("longitude_input");
        }
        return longitude;
      },
      set: function(newValue) {
        newValue = this.trimCoordinate(newValue);
        store.dispatch("coordinate/setLongitude", newValue);
      }
    },
    latitude: {
      get: function() {
        let latitude = this.location.getLatitude();

        if (this.isLatitudeValid.message == "temporary error") {
          this.addShakeEffect("latitude_input");
        }
        return latitude;
      },
      set: function(newValue) {
        newValue = this.trimCoordinate(newValue);
        store.dispatch("coordinate/setLatitude", newValue);
        //return newValue;
      }
    },
    altitude: {
      get: function() {
        let altitude = this.location.getAltitude();

        if (this.isAltitudeValid.message == "temporary error") {
          this.addShakeEffect("altitude_input");
        }
        return altitude;
      },
      set: function(newValue) {
        newValue = newValue.toString();
        newValue = newValue.trim();
        //newValue = this.trimCoordinate(newValue);
        store.dispatch("coordinate/setAltitude", newValue);
      }
    },
    center: {
      get: function() {
        return [this.latitude, this.longitude];
      },
      set: function(newValue) {
        this.latitude = newValue.lat;
        this.longitude = newValue.lng;
        this.getAddress();
        return newValue;
      }
    },
    country: {
      get: function() {
        let country = this.location.getCountry();
        if (this.isCountryValid.message == "temporary error") {
          this.addShakeEffect("country_input");
        }
        return country;
      },
      set: function(newValue) {
        store.dispatch("location/setCountry", newValue);
      }
    },
    countryState: {
      get: function() {
        let countryState = this.location.getCountryState();

        if (this.isCountryStateValid.message == "temporary error") {
          this.addShakeEffect("country_state_input");
        }
        return countryState;
      },
      set: function(newValue) {
        store.dispatch("location/setCountryState", newValue);
      }
    },
    municipality: {
      get: function() {
        let municipality = this.location.getMunicipality();

        if (this.isMunicipalityValid.message == "temporary error") {
          this.addShakeEffect("municipality_input");
        }
        return municipality;
      },
      set: function(newValue) {
        console.log(newValue);
        store.dispatch("location/setMunicipality", newValue);
      }
    },
    locality: {
      get: function() {
        let locality = this.location.getLocality();

        if (this.isLocalityValid.message == "temporary error") {
          this.addShakeEffect("locality_input");
        }
        return locality;
      },
      set: function(newValue) {
        store.dispatch("location/setLocality", newValue);
      }
    },
    internetConnection() {
      return navigator.onLine;
    }
  },
  methods: {
    backwardStep() {
      store.commit("addDatacard/setActiveStep", 1);
    },
    forwardStep() {
      store.commit("addDatacard/setActiveStep", 3);
    },
    getAddress() {
      if (this.internetConnection) {
        //nominatim es la biblioteca de OpenStreetMaps para obtener direcciones
        let nominatimAPIRequest =
          "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
          this.latitude +
          "&lon=" +
          this.longitude;

        this.axios
          .get(nominatimAPIRequest)
          .then(response => {
            let address = response.data.address;

            this.locality = this.getLocality(address);
            this.municipality = address.county;
            this.countryState = address.state;
            this.country = address.country;
          })
          .catch(error => {
            this.locality = "";
            this.municipality = "";
            this.countryState = "";
            this.country = "";
          });
      } else {
        this.openToastMessage("Sin conexión a internet", "is-warning");
      }
    },
    getLocality(address) {
      //asumiremos como localidad aquellos poblados que tengan las siguientes propiedades
      let localityProperties = ["city", "town", "village", "hamlet"];

      for (let i = 0; i < localityProperties.length; i++) {
        if (address.hasOwnProperty(localityProperties[i])) {
          return address[localityProperties[i]];
        }
      }
      return "";
    },
    //debido a un error en leaflet en el cual no puede detectar el tamaño total de renderizado
    //cada vez que el mapa sea visible se inhabilitará esta opción
    visibilityChanged(isVisible, entry) {
      this.isVisible = isVisible;
      this.$refs.map.mapObject.invalidateSize();
    },
    openToastMessage(message, type) {
      this.$buefy.toast.open({
        duration: 5000,
        message: message,
        position: "is-bottom",
        type: type
      });
    },
    addShakeEffect(elemenId) {
      let element = document.getElementById(elemenId);
      if (element != null) {
        element.classList.remove("shake_field");
        void element.offsetWidth; // trigger a DOM reflow
        element.classList.add("shake_field");
      }
    },
    trimCoordinate(coordinate) {
      coordinate = coordinate.toString();
      coordinate = coordinate.trim();
      let splittedCoordinate = coordinate.split(".");
      if (splittedCoordinate.length > 1) {
        let number = splittedCoordinate[0];
        let decimalNumber = splittedCoordinate[1];
        if (decimalNumber >= 999999) {
          decimalNumber = decimalNumber.substring(0, 6);
          coordinate = number + "." + decimalNumber;
          return coordinate;
        } else {
          return coordinate;
        }
      } else {
        return coordinate;
      }
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
  grid-template-rows: 50px 230px 550px 630px 80px;
  height: 1560px;
  width: 100%;
  margin-top: 10px;
  align-items: center;
}

#geographicalData_component_header {
  grid-row: 1 / 2;
  justify-self: center;
  height: 50px;
}

#geographicalData_component_content_topFields {
  grid-row: 2 / 3;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 10% 45% 45%;
  grid-gap: 5px;
}

#geographicalData_component_content_topFields_header {
  grid-row: 1 / 2;
  grid-column: 1 / -1;
}

#geographicalData_component_content_topFields_coordinates {
  grid-row: 2 / 3;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;
  grid-gap: 5px;
  justify-items: center;
}

#geographicalData_component_content_topFields_namedLocation {
  grid-row: 3 / 4;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-gap: 5px;
  justify-content: center;
}

#geographicalData_component_map {
  grid-row: 3 / 4;
}

#geographicalData_component_bottom {
  grid-row: 4 / 5;
  display: grid;
  grid-template-rows: 280px 350px;
}

#climateTypeHelper {
  grid-row: 1 / 2;
}

#vegetationTypeHelper {
  grid-row: 2 / 3;
}

#geographicalData_component_bottomButtons {
  grid-row: 5 / 6;
  justify-self: end;
}

#longitude_helper {
  grid-column: 1 / 2;
  justify-self: end;
}

#longitude_input_field {
  grid-column: 2 / 3;
}

#latitude_helper {
  grid-column: 3 / 4;
  justify-self: end;
}

#latitude_input_field {
  grid-column: 4 / 5;
  justify-self: start;
}

#altitude_helper {
  grid-column: 5 / 6;
  justify-self: end;
}

#altitude_input_field {
  grid-column: 6 / 7;
  justify-self: start;
}

#altitude_input_message {
  margin-top: 24px;
}

#country_input_field {
  grid-column: 1 / 2;
  justify-self: center;
}

#state_input_field {
  grid-column: 2 / 3;
  justify-self: center;
}

#municipality_input_field {
  grid-column: 3 / 4;
  justify-self: center;
}

#locality_input_field {
  grid-column: 4 / 5;
  justify-self: center;
}

#map {
  height: 500px;
  width: 1050px;
}

@media screen and (max-width: 1200px) {
  #map {
    height: 500px;
    width: 900px;
  }
}

.shake_field {
  outline-color: red;
  /* also need animation and -moz-animation */
  animation: shake 0.5s linear;
}
/* also need keyframes and -moz-keyframes */
@keyframes shake {
  8%,
  41% {
    -webkit-transform: translateX(-10px);
  }
  25%,
  58% {
    -webkit-transform: translateX(10px);
  }
  75% {
    -webkit-transform: translateX(-5px);
  }
  92% {
    -webkit-transform: translateX(5px);
  }
  0%,
  100% {
    -webkit-transform: translateX(0);
  }
}
</style>