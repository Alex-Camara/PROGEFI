<template>
  <!-- --------GeographicalData Component----- -->
  <div id="geographicalData_component" class="box">
    <!-- --------GeographicalData Component Header----- -->
    <div id="geographicalData_component_header">
      <p class="subtitle is-5">Datos geográficos</p>
    </div>

    <!-- --------GeographicalData Component Content----- -->
    <div id="geographicalData_component_content_topFields" class='box has-background-light'>
      <div id="geographicalData_component_content_topFields_coordinates">
        <!-- ------- longitude field ----- -->
        <b-field id="longitude_input" custom-class="is-small is-centered" label="Longitud:">
          <b-input
            size="is-small"
            v-model="datacard.longitude"
            placeholder="Longitud"
            type="text"
            required
            validation-message="Caracteres no permitidos"
            pattern="^-?\d+(\.\d{1,12})?$"
          ></b-input>
        </b-field>

        <!-- ------- latitude field ----- -->
        <b-field id="latitude_input" custom-class="is-small is-centered" label="Latitud:">
          <b-input
            size="is-small"
            v-model="datacard.latitude"
            placeholder="Latitud"
            type="text"
            required
            validation-message="Caracteres no permitidos"
            pattern="^-?\d+(\.\d{1,12})?$"
          ></b-input>
        </b-field>

        <!-- ------- altitude field ----- -->
        <b-field id="altitude_input" custom-class="is-small is-centered" label="Altitud:">
          <b-input
            size="is-small"
            v-model="datacard.altitude"
            placeholder="Altitud"
            type="text"
            required
            validation-message="Caracteres no permitidos"
            pattern="^\d+(\.\d{1,13})?$"
          ></b-input>
        </b-field>
      </div>

      <div id="geographicalData_component_content_topFields_namedLocation">
        <!-- ------- country select ----- -->
        <b-field id="country_select" custom-class="is-small is-centered" label="País:">
          <b-input size="is-small" type="text" v-model="country"></b-input>
        </b-field>

        <!-- ------- state select ----- -->
        <b-field id="state_select" custom-class="is-small is-centered" label="Estado:">
          <b-input size="is-small" type="text" v-model="state"></b-input>
        </b-field>

        <!-- ------- municipality select ----- -->
        <b-field id="municipality_select" custom-class="is-small is-centered" label="Municipio:">
          <b-input size="is-small" type="text" v-model="municipality"></b-input>
        </b-field>

        <!-- ------- locality select ----- -->
        <b-field id="locality_select" custom-class="is-small is-centered" label="Localidad:">
          <b-input size="is-small" type="text" v-model="locality"></b-input>
        </b-field>
      </div>
    </div>

    <div id="geographicalData_component_map" v-observe-visibility="visibilityChanged" class='box'>
      <v-map
        ref="map"
        id="map"
        :max-zoom="maxZoom"
        :min-zoom="minZoom"
        :zoom="zoom"
        :center="center"
        :options="{zoomControl: true}"
      >
        <v-tile-layer :url="url"></v-tile-layer>
        <v-marker :lat-lng.sync="center" :draggable="true"></v-marker>
      </v-map>
    </div>

    <!-- --------GeographicalData Bottom Buttons----- -->
    <div id="geographicalData_component_bottomButtons">
      <b-button type="is-light" v-on:click="backwardStep()">Anterior</b-button>
      <b-button type="is-accent" v-on:click="forwardStep()">Siguiente</b-button>
    </div>
  </div>
</template>

<script>
import store from "../../store/store.js";
import { mapState } from "vuex";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";

export default {
  components: {
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
      country: null,
      state: null,
      municipality: null,
      locality: null
    };
  },
  mounted() {
    //inicializar el marcador del mapa en el centro de México
    this.center = { lat: this.latitude, lng: this.longitude };
  },
  computed: {
    ...mapState("datacard", {
      datacard: state => state.datacard
    }),
    longitude: {
      get: function() {
        return this.datacard.longitude;
      },
      set: function(newValue) {
        store.commit("datacard/setLongitude", newValue);
        return newValue;
      }
    },
    latitude: {
      get: function() {
        return this.datacard.latitude;
      },
      set: function(newValue) {
        store.commit("datacard/setLatitude", newValue);
        return newValue;
      }
    },
    altitude: function() {
      if (this.datacard.altitude != null) {
        return this.datacard.altitude;
      } else {
        return "Altitude:";
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
    }
  },
  methods: {
    backwardStep() {
      store.commit("datacard/setActiveStep", 1);
    },
    forwardStep() {
      store.commit("datacard/setActiveStep", 2);
    },
    getAddress() {
      let nominatimAPIRequest =
        "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
        this.datacard.latitude +
        "&lon=" +
        this.datacard.longitude;
      var self = this;

      this.axios.get(nominatimAPIRequest).then(response => {
        let address = response.data.address;

        let localityProperties = ["city", "town", "village", "hamlet"];

        for (let i = 0; i < localityProperties.length; i++) {
          if (address.hasOwnProperty(localityProperties[i])) {
            self.locality = address[localityProperties[i]];
            break;
          } else {
            self.locality = "";
          }
        }
        self.municipality = address.county;
        self.state = address.state;
        self.country = address.country;
      });
    },
    visibilityChanged(isVisible, entry) {
      this.isVisible = isVisible;
      this.$refs.map.mapObject.invalidateSize();
    }
  }
};
</script>

<style lang="scss">
#geographicalData_component {
  display: grid;
  grid-template-rows: 10% 15% 70% 5%;
  height: 100%;
  width: 100%;
  margin-top: 10px;
  align-items: center;
}

#geographicalData_component_header {
  grid-row: 1 / 2;
  justify-self: center;
  height: 100px;
  //margin-top: 30px;
  //margin-bottom: 20px;
}

#geographicalData_component_content_topFields {
  grid-row: 2 / 3;
  display: grid;
  //height: 150px;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 50% 50%;
  grid-gap: 5px;
  //justify-items: start;
}

#geographicalData_component_content_topFields_coordinates {
  grid-row: 1 / 2;
  grid-column: 1 / -1;
  display: grid;
  //height: 450px;
  grid-template-columns: 33.3% 33.3% 33.3%;
  grid-gap: 5px;
  justify-self: start;
  //margin-top: 10px;
  //margin-bottom: 10px;
}

#geographicalData_component_content_topFields_namedLocation {
  grid-row: 2 / 3;
  grid-column: 1 / -1;
  display: grid;
  //height: 450px;
  grid-template-columns: 25% 25% 25% 25%;
  grid-gap: 5px;
  //justify-self: space-around;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

#geographicalData_component_map {
  grid-row: 3 / 4;
  //grid-column: 1 / -1;
}

#geographicalData_component_bottomButtons {
  grid-row: 4 / 5;
  justify-self: end;
}

#longitude_input {
  //grid-row: 1 / 2;
  grid-column: 1 / 2;
  justify-self: center;
  width: 250px;
}

#latitude_input {
  //grid-row: 1 / 2;
  grid-column: 2 / 4;
  justify-self: center;
  width: 250px;
}

#altitude_input {
  //grid-row: 1 / 2;
  grid-column: 4 / 5;
  justify-self: center;
  width: 250px;
}

#country_select {
  //grid-row: 2 / 3;
  grid-column: 1 / 2;
  justify-self: center;
}

#state_select {
  //grid-row: 2 / 3;
  grid-column: 2 / 3;
  justify-self: center;
}

#municipality_select {
  //grid-row: 2 / 3;
  grid-column: 3 / 4;
  justify-self: center;
}

#locality_select {
  //grid-row: 2 / 3;
  grid-column: 4 / 5;
  justify-self: center;
}

/*#geographicalData_component_content {
  grid-row: 4 / 5;
  display: grid;
  height: 700px;
  //grid-template-columns: 25% 25% 25% 25%;
  //grid-template-rows: 12% 12% 1% 75%;
  //grid-gap: 5px;
  //justify-items: start;
  margin-top: 20px;
  margin-bottom: 20px;
}*/

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
</style>