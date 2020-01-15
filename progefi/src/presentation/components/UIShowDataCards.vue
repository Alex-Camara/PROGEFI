<template>
  <!-- --------showDataCards Component----- -->
  <div id="showDataCards-content-container">
    <!-- --------showDataCards Component Header----- -->
    <div id="showDataCards-component-header">
      <b-button rounded class="is-secondary">Fichas de fotocolecta</b-button>
    </div>

    <!-- --------showDataCards Component Top Controls----- -->
    <div id="showDataCards-component-top-controls">
      <div id="search-field">
        <b-field label>
          <b-field>
            <b-input placeholder="Buscar ficha..." type="search" rounded></b-input>
          </b-field>
        </b-field>
      </div>

      <div class="select-field">
        <b-field custom-class="is-small is-centered" label="Ordenar por:">
          <b-dropdown aria-role="list" v-model="selectedOrder">
            <button class="button is-secondary" slot="trigger">
              <template>
                <p>{{ selectedOrder }}</p>
                <b-icon icon="menu-down"></b-icon>
              </template>
            </button>
            <b-dropdown-item
              aria-role="listitem"
              v-for="order in orders"
              :key="order.name"
              :value="order.name"
            >{{ order.name }}</b-dropdown-item>
          </b-dropdown>
        </b-field>
      </div>

      <div class="select-field">
        <b-field custom-class="is-small is-centered" label="Agrupar por:">
          <b-dropdown aria-role="list" v-model="selectedGroup">
            <button class="button is-secondary" slot="trigger">
              <template>
                <p>{{ selectedGroup }}</p>
                <b-icon icon="menu-down"></b-icon>
              </template>
            </button>
            <b-dropdown-item
              aria-role="listitem"
              v-for="group in groups"
              :key="group.name"
              :value="group.name"
            >{{ group.name }}</b-dropdown-item>
          </b-dropdown>
        </b-field>
      </div>
    </div>
    <!-- --------showDataCards Component Content Header----- -->
    <div id="showDataCards-component-content-title">
      <a id="title" class="is-size-6">Fichas</a>
    </div>

    <!-- --------showDataCards Component Content----- -->
    <div id="showDataCards-component-content">
      <a href="#" class="float" v-on:click="createDataCard">
        <b-icon class="my-float" icon="plus" size="is-medium"></b-icon>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "UIShowDataCards",
  data() {
    return {
      selectedOrder: "Nombre",
      selectedGroup: "Especie",
      orders: [{ name: "Nombre" }, { name: "Fecha de creación" }],
      groups: [
        { name: "Especie" },
        { name: "Phylum" },
        { name: "Clase" },
        { name: "Orden" },
        { name: "Familia" },
        { name: "Género" },
        { name: "Proyecto" },
        { name: "Colector" },
        { name: "Curador" }
      ]
    };
  },
  methods: {
    createDataCard() {
      this.$router.push({ name: "UICreateDataCard" });
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";

#showDataCards-content-container {
  display: grid;
  grid-template-rows: 10% 10% 5% 75%;
  height: 100%;
}

#showDataCards-component-header {
  grid-row: 1 / 2;
  justify-self: center;
  align-self: center;
}

#showDataCards-component-top-controls {
  grid-row: 2 / 3;
  align-self: center;
  display: grid;
  grid-template-columns: 60% 20% 20%;
}

#search-field {
  margin-top: 25px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.select-field {
  align-self: center;
  justify-self: center;
  margin-bottom: 10px;
}

#showDataCards-component-content-title {
  grid-row: 3 / 4;
  margin-top: 10px;
  align-self: center;
  justify-self: center;
}

#showDataCards-component-content {
  grid-row: 4 / 5;
  margin-top: 10px;
}

#title {
  text-align: center;
}

.float {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: $accent;
  color: $white;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  align-items: center;
  justify-items: center;
}

.my-float {
  margin-top: 15px;
}
</style>
