<template>
  <div class="box">
    <b-field label="Observaciones:">
      <textarea
        id="observation_input_text_area"
        ref="observation_input_text_area"
        v-model="observations"
        rows="2"
        maxlength="200"
        placeholder="Introduce aquí tus observaciones generales..."
        class="textarea has-fixed-size"
      ></textarea>
    </b-field>
  </div>
</template>

<script>
import store from "../store/store.js";
import { mapState, mapMutations } from "vuex";

export default {
  name: "observationInput",
  computed: {
    ...mapState("datacard", {
      datacard: state => state.datacard
    }),
    observations: {
      get: function() {
        return this.datacard.getObservations();
      },
      set: function(newValue) {
        this.setObservations(newValue);
      }
    }
  },
  methods: {
    ...mapMutations("datacard", {
      setObservations: "setObservations"
    })
  }
};
</script>

<style lang="scss">
#observation_input_text_area {
  height: 80px;
}
</style>