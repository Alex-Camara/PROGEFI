<template>
  <div>
    <div id="validateData_component_content_options" class="box">
      <div>
        <b-field
          id="validate_field"
          custom-class="is-small is-centered"
          :label="title"
        >
          <!-- <b-tooltip label="Nombre del curador" position="is-top" animated> -->
          <input
            id="validate_input"
            :placeholder="curatorNameText"
            class="input"
            v-model="selectedCurator"
            @focus="autocompleteCuratorStatus = true"
            @click.stop="autocompleteCuratorStatus = true"
          />
          <div
            class="autocomplete_box"
            v-if="autocompleteCuratorStatus && curators.length > 0"
          >
            <ul class="autocomplete_list">
              <li
                v-for="curator in curators"
                :key="curator.getName()"
                :value="curator"
                @click="setCurator($event, curator)"
              >
                {{ curator.getName() }}
              </li>
            </ul>
          </div>
        </b-field>
      </div>

      <div id="div_validate_button">
        <button
          id="validate_button"
          class="button"
          @click="addCurator()"
          :disabled="!isCuratorValid"
        >
          Agregar
        </button>
      </div>

      <div id="curators_tags" class="box">
        <div id="curators_tags_title">
          <information_helper
            :message="informationMessage"
          ></information_helper>
          <b>{{curatorsTagText}}</b>
        </div>

        <div class="container_flex">
          <span id="curators_tags_list_item_tag" class="tag is-secondary" v-if="datacard.getCurator().getName() !== null">
            {{ datacard.getCurator().getName() }}
            <button class="delete is-small" @click="deleteCurator()"></button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import informationHelper from "../helpers/informationHelper";
import Curator from "../models/curator";
import Datacard from "../models/datacard";

export default {
  components: {
    information_helper: informationHelper
  },
  data() {
    return {
      autocompleteCuratorStatus: false,
      curators: [],
      auxiliarDatacard: new Datacard(),
      title: "Ingresa el curador:",
      curatorNameText: "Nombre del curador...",
      curatorsTagText: "Curador:",
      informationMessage: "Solo puedes agregar un curador..."
    };
  },
  computed: {
    ...mapState("datacard", {
      datacard: state => state.datacard
    }),
    isCuratorValid: function() {
      return this.auxiliarDatacard.getCurator().getValid().isValid;
    },
    selectedCurator: {
      get: function() {
        if (
          !this.isCuratorValid ||
          this.datacard.getCurator().getValid().message === "temporary error"
        ) {
          this.addShakeEffect("validate_input");
        }
        return this.auxiliarDatacard.getCurator().getName();
      },
      set: async function(newValue) {
        if (this.datacard.getCurator().getName() === null) {
          let curator = await this.auxiliarDatacard.setCurator(newValue);
          this.curators = await Curator.getAllByName(curator.getName());
        } else {
          this.auxiliarDatacard.setCurator(new Curator());
          this.auxiliarDatacard
            .getCurator()
            .setValid({ isValid: false, message: "temporary error" });
        }
      }
    }
  },
  methods: {
    async addCurator() {
      this.datacard.setCurator(this.auxiliarDatacard.getCurator());
      await this.auxiliarDatacard.setCurator(new Curator());
      this.curators = [];
    },
    deleteCurator() {
      this.datacard.setCurator(new Curator());
    },
    setCurator(event, curator) {
      this.selectedCurator = curator;
      this.autocompleteCuratorStatus = false;
    },
    closeAutocompletes() {
      this.autocompleteCuratorStatus = false;
    },
    addShakeEffect(elemenId) {
      let element = document.getElementById(elemenId);
      if (element != null) {
        element.classList.remove("shake_field");
        void element.offsetWidth; // trigger a DOM reflow
        element.classList.add("shake_field");
      }
    }
  }
};
</script>

<style lang="scss">
#validateData_component_content_options {
  //   grid-row: 1 / 2;
  justify-self: center;
  display: grid;
  justify-content: center;
  width: 800px;
  height: 170px;
  margin-top: 0px;
  padding-top: 0px;
  grid-template-rows: 75px 75px;
  grid-template-columns: 60% 40%;
}

#enable_colors_button {
  margin-top: 15px;

  width: 200px;
  justify-content: start;
}

#validate_field {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  width: 400px;
  height: 30px;
  margin-top: 10px;
  // align-self: center;
  display: flex;
  flex-direction: column;
}

#validate_input {
  // margin-top: 4px;
  height: 40px;
  width: 450px;
}

#div_validate_button {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

#validate_button {
  margin-top: 30px;
  //margin-right: 10px;
  width: 100px;
  height: 40px;
  // align-self: center;
}

#curators_tags_title {
  display: flex;
  align-items: center;
}

#curators_tags {
  padding-top: 5px;
  grid-row: 2 / 3;
  grid-column: 1 / -1;
  margin-top: 10px;

  width: 720px;
  height: 70px;
  // justify-content: center;
  align-self: center;
}

#curators_tags_list {
  // grid-row: 2 / 3;
  display: flex;
  justify-content: center;
  align-self: center;
}

#curators_tags_list_item_tag {
  margin: auto;
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
