<template>
  <div id="ui_create_catalogue_container">
    <div id="ui_create_catalogue_component_title">
      <p class="is-size-4">Crear catálogo</p>
    </div>
    <div id="ui_create_catalogue_component_content">
      <create-catalogue></create-catalogue>
    </div>
  </div>
</template>

<script>
import createCatalogue from "../components/createCatalogue";
export default {
  // props:["selectedCollection"],
  components: {
    "create-catalogue": createCatalogue
  },
  beforeRouteLeave(to, from, next) {
    // Si la ruta destino tiene el parametro 'askToLeave',
    // esta especificando si se quiere preguntar antes de abandonar la ruta actual
    if (to.params.askToLeave || to.params.askToLeave == undefined) {
      this.showDialog().then(answer => {
        if (answer) {
          next();
        } else {
          next(false);
        }
      });
    } else {
      next();
    }
  },
  methods: {
    showDialog() {
      return new Promise((resolve, reject) => {
        let f = this.$buefy.dialog.confirm({
          message: "¿Deseas salir de esta ventana? Tu trabajo no se guardará",
          confirmText: "Cancelar",
          cancelText: "Salir",
          onConfirm: () => {
            resolve(false);
          },
          onCancel: () => {
            resolve(true);
          }
        });
        console.info(f);
      });
    }
  }
};
</script>

<style lang="scss">
#ui_create_catalogue_container {
  display: grid;
  grid-template-rows: 10% 10% 80%;
  height: 100%;
}
#ui_create_catalogue_component_title {
  grid-row: 1 / 2;
  justify-self: center;
  align-self: center;
}
#ui_create_catalogue_component_content {
  grid-row: 3 / 4;
  width: 1000px;
  // background-color: red;
  justify-self: center;
}
</style>