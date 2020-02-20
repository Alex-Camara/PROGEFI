<template>
  <div>
    <div id="validateData_component_content_options" class="box">
      <div>
        <b-field
          id="validate_field"
          custom-class="is-small is-centered"
          label="Ingresa el/los curadores:"
        >
          <!-- <b-tooltip label="Nombre del curador" position="is-top" animated> -->
          <input
            id="validate_input"
            placeholder="Nombre del curador..."
            class="input"
            v-model="selectedCurator"
            @focus="autocompleteCuratorStatus =true"
            @click.stop="autocompleteCuratorStatus =true"
          />
          <div
            id="autocomplete_box"
            v-if="autocompleteCuratorStatus && curatorState.curators.length > 0"
          >
            <ul id="autocomplete_list">
              <li
                v-for="curator in curatorState.curators"
                :key="curator.name"
                :value="curator"
                @click="setCurator($event, curator)"
              >{{curator.name}}</li>
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
        >Agregar</button>
      </div>

      <div id="curators_tags" class="box">
        <div>
          <b>Curadores:</b>
        </div>

        <div>
          <ul id="curators_tags_list">
            <li
              id="curators_tags_list_item"
              v-for="selectedCurator in selectedCuratorsName"
              :key="selectedCurator"
              :value="selectedCurator"
            >
              <span id="curators_tags_list_item_tag" class="tag is-secondary">
                {{selectedCurator}}
                <button
                  class="delete is-small"
                  @click="deleteCurator(selectedCurator)"
                ></button>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      autocompleteCuratorStatus: false
    };
  },
  computed: {
    ...mapState("curator", {
      curatorState: state => state,
      isCuratorValid: state => state.curator.valid.isValid
    }),
    ...mapGetters("curator", ["selectedCuratorsName"]),
    selectedCurator: {
      get: function() {
        let curator = this.curatorState.curator;
        if (
          !curator.valid.isValid ||
          curator.valid.message == "temporary error"
        ) {
          this.addShakeEffect("validate_input");
        }
        return curator.name;
      },
      set: function(newValue) {
        this.$store.dispatch("curator/setCurator", newValue);
      }
    }
  },
  methods: {
    addCurator() {
      this.$store.dispatch("curator/addCurator");
      this.selectedCurator = "";
    },
    deleteCurator(curator) {
      this.$store.commit("curator/deleteCurator", curator);
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

#curators_tags {
  margin-top: 0px;
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
  margin-right: 5px;
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