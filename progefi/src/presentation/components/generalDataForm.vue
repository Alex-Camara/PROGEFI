<template>
  <div>
    <div id="generalDataForm_content">
      <b-field
        id="colection_select_field"
        custom-class="is-small is-centered"
        label="Colección"
      >
        <input
          id="colection_select"
          class="input"
          :value="collection.getName()"
          :disabled="true"
        />
      </b-field>
      <!-- ------- catalogue select ----- -->
      <b-field id="catalogue_select_field" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper
            :name="'Catálogo:'"
            :valid="catalogueValid"
          ></required-field-helper>
        </template>
        <div class="select" v-if="!disableFields">
          <select
            id="catalogue_select"
            placeholder="Selecciona un catálogo"
            v-model="selectedCatalogue"
          >
            <option
              v-for="catalogue in catalogues"
              :key="catalogue.getId()"
              :value="catalogue"
              >{{ catalogue.getName() }}</option
            >
          </select>
        </div>
        <input
          id="colection_select"
          class="input"
          :value="selectedCatalogue.getName()"
          :disabled="true"
          v-if="disableFields"
        />
      </b-field>

      <!-- ------- proyect select ----- -->
      <b-field id="project_select_field" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper
            :name="'Proyecto:'"
            :valid="projectValid"
          ></required-field-helper>
        </template>
        <div class="select">
          <select
            id="project_select"
            placeholder="Selecciona un proyecto"
            v-model="selectedProject"
          >
            <option id="general_data_form_add_project">
              <div >{{ addProjectText }}</div ></option>
            <option
              v-for="project in projects"
              :key="project.name"
              :value="project"
              >{{ project.name }}</option
            >
          </select>
        </div>
      </b-field>

      <!-- ------- collector select ----- -->
      <b-field
        id="collector_select_field"
        class="autocomplete_box_field"
        custom-class="is-small is-centered"
      >
        <template slot="label">
          <required-field-helper
            :name="'Colector:'"
            :valid="collectorValid"
          ></required-field-helper>
        </template>
        <input
          id="collector_select"
          ref="collector_select"
          placeholder="Selecciona un colector"
          class="input"
          v-model="selectedCollector"
          @focus="autocompleteCollectorStatus = true"
          @click.stop="autocompleteCollectorStatus = true"
          :disabled="datacard.getCatalogue().getId() == null || disableFields"
        />
        <div
          class="autocomplete_box"
          v-if="autocompleteCollectorStatus && collectors.length > 0"
        >
          <ul class="autocomplete_list">
            <li
              v-for="collector in collectors"
              :key="collector.getName()"
              :value="collector"
              @click="setCollector($event, collector)"
            >
              {{ collector.getName() }}
            </li>
          </ul>
        </div>
      </b-field>
      <!--  -->
      <!-- ------- device select ----- -->
      <metadata-helper
        id="device_helper"
        v-bind:selectedValue="selectedDevice"
        v-bind:attribute="'device'"
        v-if="deviceMetadata != null"
      ></metadata-helper>
      <b-field
        id="device_select_field"
        class="autocomplete_box_field"
        custom-class="is-small is-centered"
      >
        <template slot="label">
          <required-field-helper
            :name="'Dispositivo:'"
            :valid="deviceValid"
          ></required-field-helper>
        </template>
        <input
          id="device_select"
          placeholder="Selecciona un dispositivo"
          class="input"
          v-model="selectedDevice"
          @focus="autocompleteDeviceStatus = true"
          @click.stop="autocompleteDeviceStatus = true"
        />
        <div
          class="autocomplete_box"
          v-if="autocompleteDeviceStatus && devices.length > 0"
        >
          <ul class="autocomplete_list">
            <li
              v-for="device in devices"
              :key="device.getName()"
              :value="device"
              @click="setDevice($event, device)"
            >
              {{ device.getName() }}
            </li>
          </ul>
        </div>
      </b-field>
      <!--  -->
      <!-- ------- model select ----- -->
      <metadata-helper
        id="model_helper"
        v-bind:selectedValue="selectedModel"
        v-bind:attribute="'model'"
        v-if="modelMetadata != null"
      ></metadata-helper>

      <b-field
        id="model_select_field"
        class="autocomplete_box_field"
        custom-class="is-small is-centered"
      >
        <template slot="label">
          <required-field-helper
            :name="'Modelo:'"
            :valid="modelValid"
          ></required-field-helper>
        </template>
        <input
          id="model_select"
          placeholder="Selecciona un modelo"
          class="input"
          v-model="selectedModel"
          @focus="autocompleteModelStatus = true"
          @click.stop="autocompleteModelStatus = true"
        />
        <div
          class="autocomplete_box"
          v-if="autocompleteModelStatus && models.length > 0"
        >
          <ul class="autocomplete_list">
            <li
              v-for="model in models"
              :key="model.getName()"
              :value="model"
              @click="setModel($event, model)"
            >
              {{ model.getName() }}
            </li>
          </ul>
        </div>
      </b-field>
      <!--  -->
      <!-- ------- collect date select ----- -->
      <metadata-helper
        id="collectDate_helper"
        v-bind:selectedValue="datacard.getCollect().getFormattedCollectDate()"
        v-bind:attribute="'formattedDate'"
        v-if="collectDateMetadata != null"
      ></metadata-helper>

      <b-field id="collect-date-select" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper
            :name="'Fecha de colecta:'"
            :valid="collectDateValid"
          ></required-field-helper>
        </template>
        <b-datepicker
          v-model="selectedDate"
          rounded
          placeholder="Elige una fecha..."
          icon="calendar-today"
          :max-date="maxDate"
        ></b-datepicker>
      </b-field>

      <!-- ------- collect hour select ----- -->
      <metadata-helper
        id="collectHour_helper"
        v-bind:selectedValue="datacard.getCollect().getFormattedCollectHour()"
        v-bind:attribute="'formattedHour'"
        v-if="collectDateMetadata != null"
      ></metadata-helper>

      <b-field id="collect-hour-select" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper
            :name="'Hora de colecta:'"
            :valid="collectDateValid"
          ></required-field-helper>
        </template>
        <b-timepicker
          v-model="selectedHour"
          rounded
          editable
          placeholder="Elige una hora..."
          icon="clock"
          hour-format="24"
        ></b-timepicker>
      </b-field>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Collector from "../models/collector.js";
import Catalogue from "../models/catalogue";
import metadataHelper from "../helpers/metadataHelper.vue";
import requiredFieldHelper from "../helpers/requiredFieldHelper.vue";
import Collection from "../models/collection";
import Project from "../models/project";
import Device from "../models/device";
import Model from "../models/model";
import Sex from "../models/sex";

export default {
  props: ["catalogue", "disableFields"],
  components: {
    "metadata-helper": metadataHelper,
    "required-field-helper": requiredFieldHelper
  },
  data() {
    return {
      collection: new Collection(),
      catalogues: [],
      projects: [],
      devices: [],
      models: [],
      collectors: [],
      maxDate: new Date(),
      autocompleteDeviceStatus: false,
      autocompleteCollectorStatus: false,
      autocompleteModelStatus: false,
      addProjectText: "Agregar proyecto",
      projectCreatedMessage: "El proyecto ha sido guardado",
      creatingProjectMessage: "Creando proyecto...",
      databaseErrorMessage: "Ha ocurrido un error con la base de datos",
      modalProject: new Project()
    };
  },
  async mounted() {
    this.collection = await Collection.getAll();
    this.catalogues = await Catalogue.getAll();
    this.projects = await Project.getAll();
    this.datacard.getCollect().setCollectDate(new Date());
    if (this.catalogue) {
      this.selectedCatalogue = this.catalogues.find(
        x => x.name === this.catalogue.getName()
      );
    }
  },
  computed: {
    ...mapState("datacard", {
      datacardState: state => state,
      datacard: state => state.datacard,
      catalogueValid: state => state.datacard.getCatalogue().getValid(),
      projectValid: state =>
        state.datacard
          .getCollect()
          .getProject()
          .getNameValid(),
      collectorValid: state =>
        state.datacard
          .getCollect()
          .getCollector()
          .getValid(),
      deviceValid: state =>
        state.datacard
          .getCollect()
          .getModel()
          .getDevice()
          .getValid(),
      modelValid: state =>
        state.datacard
          .getCollect()
          .getModel()
          .getValid(),
      collectDateValid: state =>
        state.datacard.getCollect().getCollectDateValid()
    }),
    ...mapState("addDatacard", {
      photoCollect: state => state.photoCollect
    }),
    ...mapState("metadata", {
      metadataState: state => state,
      deviceMetadata: state =>
        state.collect
          .getModel()
          .getDevice()
          .getName(),
      modelMetadata: state => state.collect.getModel().getName(),
      collectDateMetadata: state => state.collect.getCollectDate()
    }),
    ...mapState("modal", {
      saveProjectValue: state => state.saveProjectValue
    }),
    hasMetadata: function() {
      return this.metadataState.hasMetadata;
    },
    selectedCatalogue: {
      get: function() {
        return this.datacard.getCatalogue();
      },
      set: function(newValue) {
        //Por alguna razón, al asignar el catálogo desde mounted, el valor
        //de catalogue se asigna a undefined
        if (newValue === undefined) {
          newValue = this.selectedCatalogue;
        }
        newValue.setCollection(this.collection);

        this.datacard.setCatalogue(newValue);
      }
    },
    selectedProject: {
      get: function() {
        return this.datacard.getCollect().getProject();
      },
      set: function(newValue) {
        if (newValue === "Agregar proyecto") {
          this.addProject();
        } else {
          this.datacard.getCollect().setProject(newValue);
        }
      }
    },
    selectedCollector: {
      get: function() {
        let collector = this.datacard.getCollect().getCollector();
        if (
          !collector.isValid() ||
          collector.getValidMessage() == "temporary error"
        ) {
          this.addShakeEffect("collector_select");
        }
        return collector.getName();
      },
      set: async function(newValue) {
        let collector = await this.datacard.getCollect().setCollector(newValue);
        await this.datacard.generateCollectorCode();
        this.collectors = await Collector.getAllByName(collector.getName());
      }
    },
    selectedDevice: {
      get: function() {
        let device = this.datacard
          .getCollect()
          .getModel()
          .getDevice();
        if (
          !device.valid.isValid ||
          device.valid.message === "temporary error"
        ) {
          this.addShakeEffect("device_select");
        }
        return device.getName();
      },
      set: async function(newValue) {
        await this.datacard
          .getCollect()
          .getModel()
          .setDevice(newValue);
        let newDevice = this.datacard
          .getCollect()
          .getModel()
          .getDevice();
        this.selectedModel = this.datacard
          .getCollect()
          .getModel()
          .getName();
        this.devices = await Device.getAll(newDevice.getName());
        this.models = await Model.getAll(newDevice.getId());
      }
    },
    selectedModel: {
      get: function() {
        let model = this.datacard.getCollect().getModel();
        if (!model.valid.isValid || model.valid.message === "temporary error") {
          this.addShakeEffect("model_select");
        }
        return model.getName();
      },
      set: async function(newValue) {
        await this.datacard.getCollect().setModel(newValue);
      }
    },

    selectedDate: {
      get: function() {
        return this.datacard.getCollect().getCollectDate();
      },
      set: function(newValue) {
        this.$store.dispatch("datacard/setCollectDate", newValue);
      }
    },
    selectedHour: {
      get: function() {
        return this.datacard.getCollect().getCollectDate();
      },
      set: function(newValue) {
        this.$store.dispatch("datacard/setCollectDate", newValue);
      }
    }
  },
  watch: {
    deviceMetadata(newValue) {
      if (newValue != null) {
        this.selectedDevice = this.deviceMetadata;
        this.selectedModel = this.modelMetadata;
      }
    },
    collectDateMetadata(newValue) {
      if (newValue != null) {
        this.selectedDate = this.collectDateMetadata;
        this.selectedHour = this.collectDateMetadata;
      }
    },
    async saveProjectValue(newValue) {
      if (newValue) {
        await this.$store.dispatch(
          "loading/setActive",
          { active: true, message: this.creatingProjectMessage },
          { root: true }
        );
        let newProject = new Project();
        newProject.setProject(this.modalProject);
        newProject
          .save()
          .then(async () => {
            await this.$store.dispatch(
              "loading/setActive",
              { active: false, message: null },
              { root: true }
            );
            this.openToast(this.projectCreatedMessage);
            this.projects.push(newProject);
          })
          .catch(() => {
            this.openDialog(this.databaseErrorMessage);

          });
      }else{
        this.selectedProject = new Project();
      }
      this.modalProject = new Project();
      this.$store.commit("modal/reset");
    }
  },
  methods: {
    addShakeEffect(elemenId) {
      let element = document.getElementById(elemenId);
      if (element != null) {
        element.classList.remove("shake_field");
        void element.offsetWidth; // trigger a DOM reflow
        element.classList.add("shake_field");
      }
    },
    openToast(message) {
      this.$buefy.toast.open(message);
    },
    openDialog(message) {
      this.$buefy.dialog.alert(message);
    },
    closeAutocompletes() {
      this.autocompleteDeviceStatus = false;
      this.autocompleteCollectorStatus = false;
      this.autocompleteModelStatus = false;
    },
    setDevice(event, device) {
      this.selectedDevice = device;
      this.autocompleteDeviceStatus = false;
    },
    setModel(event, model) {
      this.selectedModel = model;
      this.autocompleteModelStatus = false;
    },
    setCollector(event, collector) {
      this.selectedCollector = collector;
      this.autocompleteCollectorStatus = false;
    },
    addProject() {
      this.$store.dispatch("modal/openModal", {
        title: "Agregar proyecto",
        fieldText: "Ingresa el nombre del proyecto:",
        model: this.modalProject,
        getter: "getName",
        setter: "setName",
        getterValid: "getNameValid"
      });
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";

#generalDataForm_content {
  display: grid;
  height: 340px;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 25% 25% 25% 25%;
  grid-gap: 5px;
  justify-items: start;
}

#colection_select_field {
  grid-row: 1 / 2;
  grid-column: 1 / 3;
}

#colection_select {
  width: 400px;
}

#catalogue_select_field {
  grid-row: 1 / 2;
  grid-column: 4 / 5;
}

#project_select_field {
  width: 400px;
  grid-row: 2 / 3;
  grid-column: 1 / 3;
}

#collector_select_field {
  grid-row: 2 / 3;
  grid-column: 4 / 6;
}

#device_helper {
  grid-row: 3 / 4;
  grid-column: 1 / 2;
  justify-self: end;
}

#device_select_field {
  grid-row: 3 / 4;
  grid-column: 2 / 3;
}

#model_helper {
  grid-row: 3 / 4;
  grid-column: 3 / 4;
  justify-self: end;
}

#model_select_field {
  grid-row: 3 / 4;
  grid-column: 4 / 5;
  // display: flex;
  // flex-direction: column;
}

#collectDate_helper {
  grid-row: 4 / 5;
  grid-column: 1 / 2;
  justify-self: end;
}

#collect-date-select {
  grid-row: 4 / 5;
  grid-column: 2 / 3;
}

#collectHour_helper {
  grid-row: 4 / 5;
  grid-column: 3 / 4;
  justify-self: end;
}

#collect-hour-select {
  grid-row: 4 / 5;
  grid-column: 4 / 5;
}

#required_label_field {
  display: flex;
  flex-direction: row;
}

#required_icon {
  height: 8px;
  width: 8px;
  margin-right: 5px;
  align-self: center;
  border-radius: 50%;
  background-color: $accent;
  transition: 0.1s;
}

#required_icon:hover {
  height: 10px;
  width: 10px;
  margin-right: 3px;
  transition: 0.1s;
  cursor: pointer;
}

#general_data_form_add_project{
  display: flex!important;
  justify-content: center!important;
  opacity: 0.8!important;
  font-weight: bold!important;
  margin-bottom: 5px!important;
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

.slideIn {
  animation: menuSlide 0.5s 1;
  animation-fill-mode: forwards;
}

.slideOut {
  animation: menuSlideOut 0.5s 1;
}

/*Keyframes*/

@keyframes menuSlide {
  from {
    transform: translateX(0px);
    transition-timing-function: ease-in;
  }
  to {
    transform: translateX(300px);
    transition-timing-function: ease-out;
  }
}

@keyframes menuSlideOut {
  from {
    transform: translateX(300px);
    transition-timing-function: ease-in;
  }
  to {
    transform: translateX(0px);
    transition-timing-function: ease-out;
  }
}
</style>
