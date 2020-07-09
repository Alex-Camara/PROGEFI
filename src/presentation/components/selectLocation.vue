<template>
  <div>
    <div id="select_location_component">
      <!-- --------GeographicalData Component Content----- -->
      <div id="geographicalData_component_content_topFields" class="box">
        <div id="geographicalData_component_content_topFields_header">
          <information_helper :message="informationMessage"></information_helper>
          <b class="is-size-6">Datos de ubicación:</b>
        </div>
        <div id="geographicalData_component_content_topFields_coordinates">
          <!-- ------- longitude field ----- -->
          <metadata-helper
            id="longitude_helper"
            v-bind:selectedValue="longitude"
            v-bind:attribute="'longitude'"
            v-if="longitudeMetadata != -181"
          ></metadata-helper>

          <b-field
            id="longitude_input_field"
            custom-class="is-small is-centered"
          >
            <template slot="label">
              <required-field-helper
                :name="'Longitud:'"
                :valid="isLongitudeValid"
              ></required-field-helper>
            </template>
            <input
              id="longitude_input"
              class="input"
              v-model="longitude"
              placeholder="Longitud"
            />
          </b-field>

          <!-- ------- latitude field ----- -->

          <metadata-helper
            id="latitude_helper"
            v-bind:selectedValue="latitude"
            v-bind:attribute="'latitude'"
            v-if="latitudeMetadata != -181"
          ></metadata-helper>

          <b-field
            id="latitude_input_field"
            custom-class="is-small is-centered"
          >
            <template slot="label">
              <required-field-helper
                :name="'Latitud:'"
                :valid="isLatitudeValid"
              ></required-field-helper>
            </template>
            <input
              id="latitude_input"
              class="input"
              v-model="latitude"
              placeholder="Latitud"
            />
          </b-field>

          <!-- ------- altitude field ----- -->

          <metadata-helper
            id="altitude_helper"
            v-bind:selectedValue="altitude"
            v-bind:attribute="'altitude'"
            v-if="altitudeMetadata != null"
          ></metadata-helper>

          <b-field id="altitude_input_field">
            <b-field custom-class="is-small is-centered">
              <template slot="label">
                <required-field-helper
                  :name="'Altitud:'"
                  :valid="isAltitudeValid"
                ></required-field-helper>
              </template>
              <input
                id="altitude_input"
                class="input"
                v-model="altitude"
                placeholder="Altitud"
              />
            </b-field>
            <p id="altitude_input_message" class="control">
              <span class="button is-static">msnm</span>
            </p>
          </b-field>
        </div>

        <div id="geographicalData_component_content_topFields_namedLocation">
          <!-- ------- country select ----- -->
          <b-field
            id="country_input_field"
            custom-class="is-small is-centered"
            label="País:"
          >
            <template slot="label">
              <required-field-helper
                :name="'País:'"
                :valid="isCountryValid"
              ></required-field-helper>
            </template>
            <input
              id="country_input"
              class="input is-small"
              v-model="country"
            />
          </b-field>

          <!-- ------- countryState select ----- -->
          <b-field
            id="country_state_input_field"
            custom-class="is-small is-centered"
            label="Estado:"
          >
            <template slot="label">
              <required-field-helper
                :name="'Estado:'"
                :valid="isCountryStateValid"
              ></required-field-helper>
            </template>
            <input
              id="country_state_input"
              class="input is-small"
              v-model="countryState"
            />
          </b-field>

          <!-- ------- municipality select ----- -->
          <b-field
            id="municipality_input_field"
            custom-class="is-small is-centered"
            label="Municipio:"
          >
            <template slot="label">
              <required-field-helper
                :name="'Municipio:'"
                :valid="isMunicipalityValid"
              ></required-field-helper>
            </template>
            <input
              id="municipality_input"
              class="input is-small"
              v-model="municipality"
            />
          </b-field>

          <!-- ------- locality select ----- -->
          <b-field
            id="locality_input_field"
            custom-class="is-small is-centered"
            label="Localidad:"
          >
            <template slot="label">
              <required-field-helper
                :name="'Localidad:'"
                :valid="isLocalityValid"
              ></required-field-helper>
            </template>
            <input
              id="locality_input"
              class="input is-small"
              v-model="locality"
            />
          </b-field>
        </div>
      </div>
      <!--  -->
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
          :options="{
            zoomControl: true,
            attributionControl: false,
            scrollWheelZoom: false
          }"
        >
          <v-tile-layer :url="url" :noWrap="noWrap"></v-tile-layer>
          <v-marker :lat-lng.sync="center" :draggable="true"></v-marker>
        </v-map>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import metadataHelper from "../helpers/metadataHelper.vue";
import requiredFieldHelper from "../helpers/requiredFieldHelper.vue";
import informationHelper from "../helpers/informationHelper.vue";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";

export default {
  components: {
    "metadata-helper": metadataHelper,
    "required-field-helper": requiredFieldHelper,
    "information_helper": informationHelper,
    "v-map": LMap,
    "v-tile-layer": LTileLayer,
    "v-marker": LMarker
  },
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 5,
      maxZoom: 18,
      minZoom: 2,
      noWrap: true,
      maxBounds: [{ lat: -90, lng: -180 }, { lat: 90, lng: 180 }],
      informationMessage: "El país, estado, municipio y localidad serán " +
              "rellenados a partir de las coordenadas que introduzcas (Si hay Internet)..."
    };
  },
  mounted() {
    //inicializar el marcador del mapa en el IIBUV
    this.datacard.getCollect.setLongitude(-96.873879);
    this.datacard.getCollect.setLatitude(19.516454);
  },
  computed: {
    ...mapState("metadata", {
      metadataState: state => state,
      longitudeMetadata: state => state.collect.getLongitude(),
      latitudeMetadata: state => state.collect.getLatitude(),
      altitudeMetadata: state => state.collect.getAltitude()
    }),
    ...mapState("datacard", {
      datacardState: state => state,
      datacard: state => state.datacard,
      isLongitudeValid: state =>
        state.datacard.getCollect().getLongitudeValid(),
      isLatitudeValid: state => state.datacard.getCollect().getLatitudeValid(),
      isAltitudeValid: state => state.datacard.getCollect().getAltitudeValid(),
      isCountryValid: state => state.datacard.getCollect().getCountryValid(),
      isCountryStateValid: state =>
        state.datacard.getCollect().getCountryStateValid(),
      isMunicipalityValid: state =>
        state.datacard.getCollect().getMunicipalityValid(),
      isLocalityValid: state => state.datacard.getCollect().getLocalityValid()
    }),
    longitude: {
      get: function() {
        let longitude = this.datacard.getCollect().getLongitude();

        if (
          this.datacard.getCollect().getLongitudeValidMessage() ===
          "temporary error"
        ) {
          this.addShakeEffect("longitude_input");
        }
        return longitude;
      },
      set: function(newValue) {
        newValue = this.trimCoordinate(newValue);
        this.datacard.getCollect().setLongitude(newValue);
        // this.$store.commit("datacard/setDatacard", this.datacard);
      }
    },
    latitude: {
      get: function() {
        let latitude = this.datacard.getCollect().getLatitude();

        if (
          this.datacard.getCollect().getLatitudeValidMessage() ===
          "temporary error"
        ) {
          this.addShakeEffect("latitude_input");
        }
        return latitude;
      },
      set: function(newValue) {
        newValue = this.trimCoordinate(newValue);
        this.datacard.getCollect().setLatitude(newValue);
        // this.$store.commit("datacard/setDatacard", this.datacard);
      }
    },
    altitude: {
      get: function() {
        let altitude = this.datacard.getCollect().getAltitude();

        if (
          this.datacard.getCollect().getAltitudeValidMessage() ===
          "temporary error"
        ) {
          this.addShakeEffect("altitude_input");
        }
        return altitude;
      },
      set: function(newValue) {
        newValue = newValue.toString();
        newValue = newValue.trim();
        this.datacard.getCollect().setAltitude(newValue);
        this.$store.commit("datacard/setDatacard", this.datacard);
      }
    },
    center: {
      get: function() {
        return [this.latitude, this.longitude];
      },
      set: function(newValue) {
        this.latitude = newValue.lat;
        this.longitude = newValue.lng;
        if (this.internetConnection){
          this.getAddress(this.latitude, this.longitude);
        }
      }
    },
    country: {
      get: function() {
        let country = this.datacard.getCollect().getCountry();
        if (
          this.datacard.getCollect().getCountryValidMessage() ===
          "temporary error"
        ) {
          this.addShakeEffect("country_input");
        }
        return country;
      },
      set: function(newValue) {
        this.datacard.getCollect().setCountry(newValue);
        this.$store.commit("datacard/setDatacard", this.datacard);
      }
    },
    countryState: {
      get: function() {
        let countryState = this.datacard.getCollect().getCountryState();

        if (
          this.datacard.getCollect().getCountryStateValidMessage() ===
          "temporary error"
        ) {
          this.addShakeEffect("country_state_input");
        }
        return countryState;
      },
      set: function(newValue) {
        this.datacard.getCollect().setCountryState(newValue);
        this.$store.commit("datacard/setDatacard", this.datacard);
      }
    },
    municipality: {
      get: function() {
        let municipality = this.datacard.getCollect().getMunicipality();

        if (
          this.datacard.getCollect().getMunicipalityValidMessage() ==
          "temporary error"
        ) {
          this.addShakeEffect("municipality_input");
        }
        return municipality;
      },
      set: function(newValue) {
        this.datacard.getCollect().setMunicipality(newValue);
        this.$store.commit("datacard/setDatacard", this.datacard);
      }
    },
    locality: {
      get: function() {
        let locality = this.datacard.getCollect().getLocality();

        if (
          this.datacard.getCollect().getLocalityValidMessage() ==
          "temporary error"
        ) {
          this.addShakeEffect("locality_input");
        }
        return locality;
      },
      set: function(newValue) {
        this.datacard.getCollect().setLocality(newValue);
        this.$store.commit("datacard/setDatacard", this.datacard);
      }
    },
    internetConnection() {
      return navigator.onLine;
    }
  },
  watch: {
    longitudeMetadata(newValue) {
      if (newValue != null) {
        this.longitude = newValue;
        // debugger
      }
    },
    latitudeMetadata(newValue) {
      if (newValue != null) {
        this.latitude = this.latitudeMetadata;
      }
    },
    altitudeMetadata(newValue) {
      if (newValue != null) {
        this.altitude = this.altitudeMetadata;
      }
    }
  },
  methods: {
    getAddress(latitude, longitude) {
      return new Promise(resolve => {
        // if (this.internetConnection) {
          //nominatim es la biblioteca de OpenStreetMaps para obtener direcciones
          let nominatimAPIRequest =
            "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
            latitude +
            "&lon=" +
            longitude;

          axios
            .get(nominatimAPIRequest)
            .then(response => {
              let address = response.data.address;

              this.locality = this.getLocality(address);
              this.municipality = address.county;
              this.countryState = address.state;
              this.country = address.country;
              resolve(address);
            })
            .catch(error => {
              this.locality = "";
              this.municipality = "";
              this.countryState = "";
              this.country = "";
              resolve("")
            });
        // } else {
          // this.openToastMessage("Sin conexión a internet", "is-warning");
          // resolve("");
        // }
      });
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
    addShakeEffect(elemenId) {
      let element = document.getElementById(elemenId);
      if (element != null) {
        element.classList.remove("shake_field");
        void element.offsetWidth; // trigger a DOM reflow
        element.classList.add("shake_field");
      }
    },
    trimCoordinate(coordinate) {
      coordinate = "" + coordinate;
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
    setHelpText(message, active) {
      this.$store.dispatch("helpText/setActive", { active, message });
    },
    openToastMessage(message, type) {
      this.$buefy.toast.open({
        duration: 5000,
        message: message,
        position: "is-bottom",
        type: type
      });
    }
  }
};
</script>

<style lang="scss">
#select_location_component {
  display: grid;
  grid-template-rows: 230px 580px;
}

#geographicalData_component_content_topFields {
  grid-row: 1 / 2;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 10% 45% 45%;
  grid-gap: 5px;
}

#geographicalData_component_map {
  grid-row: 2 / 3;
}

#geographicalData_component_content_topFields_header {
  grid-row: 1 / 2;
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
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

#country_state_input_field {
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
