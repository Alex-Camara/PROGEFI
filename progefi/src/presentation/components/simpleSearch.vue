<template>
  <div>
    <div id="search_datacards_container">
      <div id="search_datacards_search_field">
        <b-dropdown
          aria-role="list"
          v-model="selectedSearchOption"
          @change="setSearchType"
        >
          <button class="button is-secondary" type="button" slot="trigger">
            <template>
              <span>{{ selectedSearchOption.name }}</span>
            </template>
          </button>
          <b-dropdown-item
            id="search_datacards_options"
            aria-role="listitem"
            v-for="(option, index) in searchOptions"
            :key="index"
            :value="option"
            >{{ option.name }}</b-dropdown-item
          >
        </b-dropdown>
        <input
          id="search_datacards_search_input"
          :placeholder="placeholder"
          class="input"
          v-model="searchString"
          @input="searchDatacards"
        />
        <transition name="fade">
          <button
            v-if="
              selectedSearchOption.name === 'Búsqueda simple' &&
                searchString !== ''
            "
            class="button is-danger"
            @click="resetSearchField"
          >
            <img id="search_datacards_close_icon" src="../assets/close.png" />
          </button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchString: "",
      selectedSearchOption: null,
      searchOptions: [
        { name: "Búsqueda simple" },
        { name: "Búsqueda avanzada" }
      ],
      placeholder: "Buscar ficha por <Código>"
    };
  },
  mounted() {
    this.selectedSearchOption = this.searchOptions[0];
  },
  watch: {
    selectedSearchOption(newValue) {
      let element = document.getElementById("search_datacards_search_input");
      if (element !== null) {
        if (newValue.name === "Búsqueda avanzada") {
          element.classList.add("hidden_search_input");
        } else {
          element.classList.remove("hidden_search_input");
        }
      }
    }
  },
  methods: {
    searchDatacards() {
      this.$emit("search", this.searchString);
    },
    setSearchType(event) {
      if (event.name === "Búsqueda avanzada") {
        this.$emit("showAdvancedSearch", true);
      } else {
        this.$emit("showAdvancedSearch", false);
      }
    },
    resetSearchField(){
      this.searchString = "";
      this.searchDatacards();
    }
  }
};
</script>

<style lang="scss" scoped>
#search_datacards_close_icon {
  height: 10px;
}
.hidden_search_input {
  width: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  border-width: 0;
  /*display: none!important;*/
  transition: 0.2s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<style lang="scss">
@import "../style/style.scss";

#search_datacards_search_input {
  width: 700px;
  transition: 0.2s;
}

#search_datacards_search_field {
  display: flex;
  justify-content: center;
  justify-items: center;
}

@media screen and (max-width: 1200px) {
  #search_datacards_search_input {
    width: 500px;
  }
}
</style>
