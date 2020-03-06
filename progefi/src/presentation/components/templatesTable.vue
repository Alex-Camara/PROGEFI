<template>
  <div id="templates_table_container">
    <div id="templates_table_null_templates_message" v-if="templateState.templates.length == 0">
      <p class="is-size-5">Aún no hay plantillas...</p>
    </div>
  </div>
</template>



<style lang="scss">
@import "../style/style.scss";
#templates_table_container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
#templates_table_null_templates_message {
  text-align: center;
}
#templates_table_table_container {
  display: flex;
  justify-content: center;
}
</style>