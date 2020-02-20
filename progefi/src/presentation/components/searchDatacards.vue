<template>
  <div>
    <div>
      <div id="search_datacards_search_field">
        <b-field>
          <div class="select">
            <select id="search_datacards_select">
              <option selected>Búsqueda normal</option>
              <option>Búsqueda avanzada</option>
            </select>
          </div>
          <b-input
            id="search_datacards_search_input"
            placeholder="Buscar ficha..."
            type="search"
            rounded
            @input="searchDatacard($event)"
          ></b-input>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    searchDatacard(input) {
      this.$emit("searchDatacards", input);
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";
#search_datacards_select {
  background-color: $secondary;
}

#search_datacards_select :hover {
  //   position: absolute;
  background-color: red;
}

#search_datacards_search_input {
  width: 600px;
}

#show_datacards_component_top_controls {
  grid-row: 2 / 3;
  align-self: center;
  display: grid;
  grid-template-columns: 60% 20% 20%;
}

#search_datacards_search_field {
  display: flex;
  background-color: aquamarine;
  justify-content: center;
  width: 1200px;
  //   margin: 0 auto;
}

@media screen and (max-width: 1200px) {
  #search_datacards_search_input {
    width: 500px;
  }

  #search_datacards_search_field {
    width: 1000px;
  }
}
</style>