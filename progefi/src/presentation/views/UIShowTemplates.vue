<template>
  <div id="show_templates_component">
    <div id="show_templates_component_title">
        <p class="component_title">Plantillas</p>
    </div>
  </div>
</template>

<style lang="scss">
#show_templates_component {
  display: grid;
  grid-template-rows: 10% 90%;
  height: 100%;
}
#show_templates_component_title {
  grid-row: 1 / 2;
  display: flex;
  justify-self: center;
  align-self: center;
}
#show_templates_component_content {
  grid-row: 2 / 3;
  margin-top: 20px;
}
</style>