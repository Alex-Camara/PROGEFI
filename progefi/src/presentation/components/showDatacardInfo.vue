<template>
  <div>
    <div id="show_datacard_info_container">
      <div id="show_datacard_info_general_data" class="gray_box">
        <p class="title">DATOS GENERALES:</p>

        <div class="show_datacard_info_attributes_div">
          <p class="attribute_name">Código:</p>
          <p class="attribute_value">{{ datacard.getCode() }}</p>
        </div>

        <div class="show_datacard_info_attributes_div">
          <p class="attribute_name">Código del colector:</p>
          <p class="attribute_value">{{ datacard.getCollectorCode() }}</p>
        </div>

        <div class="show_datacard_info_attributes_div">
          <p class="attribute_name">Plantilla:</p>
          <p class="attribute_value">{{ datacard.getTemplate().getName() }}</p>
        </div>

        <div class="show_datacard_info_attributes_div">
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Colección:</p>
            <p class="attribute_value">
              {{
                datacard
                  .getCatalogue()
                  .getCollection()
                  .getName()
              }}
            </p>
          </div>
          <span class="space"></span>
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Catálogo:</p>
            <p class="attribute_value">
              {{ datacard.getCatalogue().getName() }}
            </p>
          </div>
        </div>

        <div class="show_datacard_info_attributes_div">
          <p class="attribute_name">Proyecto:</p>
          <p class="attribute_value">
            {{
              datacard
                .getCollect()
                .getProject()
                .getName()
            }}
          </p>
        </div>

        <div class="show_datacard_info_attributes_div">
          <p class="attribute_name">Colector:</p>
          <p class="attribute_value">
            {{
              datacard
                .getCollect()
                .getCollector()
                .getName()
            }}
          </p>
        </div>

        <div class="show_datacard_info_attributes_div">
          <p class="attribute_name">Curador:</p>
          <div v-for="curator in datacard.getCurators()" :key="curator.getId()">
            <p class="attribute_value">
              |{{ curator.getName() }}|
              <!-- <span class="space"></span> -->
            </p>
          </div>
        </div>

        <div class="show_datacard_info_attributes_div">
          <p class="attribute_name">Creador de la ficha:</p>
          <p class="attribute_value">Christian Alejandro Delfín Alfonso</p>
        </div>

        <div class="show_datacard_info_attributes_div">
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Dispositivo:</p>
            <p class="attribute_value">
              {{
                datacard
                  .getCollect()
                  .getModel()
                  .getDevice()
                  .getName()
              }}
            </p>
          </div>
          <span class="space"></span>
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Modelo:</p>
            <p class="attribute_value">
              {{
                datacard
                  .getCollect()
                  .getModel()
                  .getName()
              }}
            </p>
          </div>
        </div>

        <div class="show_datacard_info_attributes_div">
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Fecha de creación:</p>
            <p class="attribute_value">
              {{ datacard.getFormattedCreationDate() }}
            </p>
          </div>
          <span class="space"></span>
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Fecha de colecta:</p>
            <p class="attribute_value">
              {{ datacard.getCollect().getFormattedCollectDate() }}
            </p>
          </div>
        </div>
      </div>

      <div id="show_datacard_info_geographical_data" class="gray_box">
        <p class="title">DATOS GEOGRÁFICOS:</p>

        <p class="subtitle">Localización</p>

        <div class="show_datacard_info_attributes_div">
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Latitud:</p>
            <p class="attribute_value">
              {{ datacard.getCollect().getLatitude() }}
            </p>
          </div>
          <span class="space"></span>
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Longitud:</p>
            <p class="attribute_value">
              {{ datacard.getCollect().getLongitude() }}
            </p>
          </div>
          <span class="space"></span>
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Altitud:</p>
            <p class="attribute_value">
              {{ datacard.getCollect().getAltitude() }}
            </p>
          </div>
        </div>

        <div class="show_datacard_info_attributes_div">
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">País:</p>
            <p class="attribute_value">
              {{ datacard.getCollect().getCountry() }}
            </p>
          </div>
          <span class="space"></span>
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Estado:</p>
            <p class="attribute_value">
              {{ datacard.getCollect().getCountryState() }}
            </p>
          </div>
          <span class="space"></span>
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Municipio:</p>
            <p class="attribute_value">
              {{ datacard.getCollect().getMunicipality() }}
            </p>
          </div>
          <span class="space"></span>
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Localidad:</p>
            <p class="attribute_value">
              {{ datacard.getCollect().getLocality() }}
            </p>
          </div>
        </div>

        <p class="subtitle">Tipo de clima</p>

        <div class="show_datacard_info_attributes_div">
          <p class="attribute_value">
            {{
              datacard
                .getCollect()
                .getClimateType()
                .getCode()
            }}
          </p>
        </div>

        <p class="subtitle">Tipo de vegetación</p>

        <div class="show_datacard_info_attributes_div">
          <p class="attribute_value">
            {{
              datacard
                .getCollect()
                .getVegetationType()
                .getName()
            }}
          </p>
        </div>
      </div>

      <div id="show_datacard_info_taxonomical_data" class="gray_box">
        <p class="title">DATOS DEL ESPÉCIMEN:</p>

        <p class="subtitle">Clasificación Taxonómica</p>

        <div class="show_datacard_info_attributes_div">
          <p class="attribute_name">Nombre científico:</p>
          <p class="attribute_value">
            {{
              datacard
                .getCollect()
                .getSpecimen()
                .getSpecies()
                .getScientificName()
            }}
          </p>
        </div>

        <div class="show_datacard_info_attributes_div">
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Género:</p>
            <p class="attribute_value">
              {{
                datacard
                  .getCollect()
                  .getSpecimen()
                  .getSpecies()
                  .getGenus()
              }}
            </p>
          </div>
          <span class="space"></span>
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Familia:</p>
            <p class="attribute_value">
              {{
                datacard
                  .getCollect()
                  .getSpecimen()
                  .getSpecies()
                  .getFamily()
              }}
            </p>
          </div>
          <span class="space"></span>
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Order:</p>
            <p class="attribute_value">
              {{
                datacard
                  .getCollect()
                  .getSpecimen()
                  .getSpecies()
                  .getOrder()
              }}
            </p>
          </div>
        </div>

        <div class="show_datacard_info_attributes_div">
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Clase:</p>
            <p class="attribute_value">
              {{
                datacard
                  .getCollect()
                  .getSpecimen()
                  .getSpecies()
                  .getSpeciesClass()
              }}
            </p>
          </div>
          <span class="space"></span>
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Filo:</p>
            <p class="attribute_value">
              {{
                datacard
                  .getCollect()
                  .getSpecimen()
                  .getSpecies()
                  .getPhylum()
              }}
            </p>
          </div>
          <span class="space"></span>
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Reino:</p>
            <p class="attribute_value">
              {{
                datacard
                  .getCollect()
                  .getSpecimen()
                  .getSpecies()
                  .getKingdom()
              }}
            </p>
          </div>
        </div>

        <p class="subtitle">Datos de observación</p>

        <div class="show_datacard_info_attributes_div">
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Sexo:</p>
            <p class="attribute_value">
              {{
                datacard
                  .getCollect()
                  .getSpecimen()
                  .getSex()
                  .getName()
              }}
            </p>
          </div>
          <span class="space"></span>
          <div class="show_datacard_info_attributes_div">
            <p class="attribute_name">Etapa de vida:</p>
            <p class="attribute_value">
              {{
                datacard
                  .getCollect()
                  .getSpecimen()
                  .getLifeStage()
                  .getName()
              }}
            </p>
          </div>
        </div>

        <div class="show_datacard_info_attributes_div">
          <p class="attribute_name">Observaciones:</p>
          <p class="attribute_value">
            {{
              datacard
                .getCollect()
                .getSpecimen()
                .getObservations()
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["datacard"],
  computed: {
    device: function() {
      let model = this.datacard.getModel();
      let device = model.getDevice();
      // debugger;
      return device.getName();
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";
#show_datacard_image_container {
  display: grid;
  grid-template-rows: 35% 30% 35%;
  justify-content: center;
}

#show_datacard_info_general_data {
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;
}
#show_datacard_info_geographical_data {
  margin-top: 20px;
  grid-row: 2 / 3;
}
#show_datacard_info_taxonomical_data {
  margin-top: 20px;
  margin-bottom: 30px;
  grid-row: 3 / 4;
}
.show_datacard_info_attributes_div {
  display: flex;
}
</style>
