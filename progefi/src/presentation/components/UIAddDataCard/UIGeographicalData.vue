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
        ></metadata-helper>

        <b-field id="longitude_input" custom-class="is-small is-centered" label="Longitud:">
          <b-input
           
            v-model="datacard.longitude"
            placeholder="Longitud"
            type="text"
            required
            validation-message="Caracteres no permitidos"
            pattern="^-?\d+(\.\d{1,12})?$"
          ></b-input>
        </b-field>
        
        <!-- ------- latitude field ----- -->
        
        <metadata-helper
          id="latitude_helper"
          v-bind:selectedValue="latitude"
          v-bind:attribute="'latitude'"
        ></metadata-helper>

        <b-field id="latitude_input" custom-class="is-small is-centered" label="Latitud:">
          <b-input
          
            v-model="datacard.latitude"
            placeholder="Latitud"
            type="text"
            required
            validation-message="Caracteres no permitidos"
            pattern="^-?\d+(\.\d{1,12})?$"
          ></b-input>
        </b-field>

        <!-- ------- altitude field ----- -->

        <metadata-helper
          id="altitude_helper"
          v-bind:selectedValue="altitude"
          v-bind:attribute="'altitude'"
        ></metadata-helper>

        <b-field id="altitude_input" custom-class="is-small is-centered" label="Altitud:">
          <b-input
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
        :zoom="zoom"
        :center="center"
        :options="{zoomControl: true}"
      >
        <v-tile-layer :url="url"></v-tile-layer>
        <v-marker :lat-lng.sync="center" :draggable="true"></v-marker>
      </v-map>
    </div>

    <div id="geographicalData_component_bottom" >
      <climateType-helper id="climateTypeHelper" class="box"></climateType-helper>
      <vegetationType-helper id="vegetationTypeHelper" class="box"></vegetationType-helper>
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
import metadataHelper from "../../helpers/metadataHelper.vue";
import climateTypeHelper from "../../helpers/climateTypeHelper.vue";
import vegetationTypeHelper from "../../helpers/vegetationTypeHelper.vue";

export default {
  components: {
    "v-map": LMap,
    "v-tile-layer": LTileLayer,
    "v-marker": LMarker,
    "metadata-helper": metadataHelper,
    "climateType-helper": climateTypeHelper,
    "vegetationType-helper": vegetationTypeHelper
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
  //height: 90px;
  //margin-top: 30px;
  //margin-bottom: 20px;
}

#geographicalData_component_content_topFields {
  grid-row: 2 / 3;
  display: grid;
  //height: 200px;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 10% 45% 45%;
  grid-gap: 5px;
  //margin-top: 0px;
  //padding-left: 0px;
  //justify-items: start;
}

#geographicalData_component_content_topFields_header{
  grid-row: 1 / 2;
  grid-column: 1 / -1;
}

#geographicalData_component_content_topFields_coordinates {
  grid-row: 2 / 3;
  grid-column: 1 / -1;
  display: grid;
  //height: 450px;
  grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;
  grid-gap: 5px;
  justify-items: center;
  
  //align-items: center;
  //margin-top: 10px;
  //margin-bottom: 10px;
}

#geographicalData_component_content_topFields_namedLocation {
  grid-row: 3 / 4;
  grid-column: 1 / -1;
  display: grid;
  //height: 450px;
  grid-template-columns: 25% 25% 25% 25%;
  grid-gap: 5px;
  //justify-self: space-around;
  justify-content: center;
  //margin-top: 10px;
  //margin-bottom: 10px;
}

#geographicalData_component_map {
  grid-row: 3 / 4;
  //height: 550px;
  //grid-column: 1 / -1;
}

#geographicalData_component_bottom{
  grid-row: 4 / 5;
  //height: 600px;
  display: grid;
  //height: 450px;
  grid-template-rows: 280px 350px;
}

#climateTypeHelper{
  grid-row: 1 / 2;
  //height: 200px;
}

#vegetationTypeHelper{
  grid-row: 2 / 3;
  //height: 400px;
}

#geographicalData_component_bottomButtons {
  grid-row: 5 / 6;
  justify-self: end;
  //height: 20px;
}

#longitude_helper{
  grid-column: 1 / 2;
  justify-self: end;
}

#longitude_input {
  //grid-row: 1 / 2;
  grid-column: 2 / 3;
  //justify-self: end;
  //width: 150px;
}

#latitude_helper{
  grid-column: 3 / 4;
  justify-self: end;
}

#latitude_input {
  //grid-row: 1 / 2;
  grid-column: 4 / 5;
  justify-self: start;
  //width: 150px;
}

#altitude_helper{
  grid-column: 5 / 6;
  justify-self: end;
} 

#altitude_input {
  //grid-row: 1 / 2;
  grid-column: 6 / 7;
  justify-self: start;
  //width: 150px;
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