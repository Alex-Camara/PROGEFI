import DatacardHandler from './handlers/datacardHandler.js';
import CatalogueHandler from './handlers/catalogueHandler.js';
import CollectionHandler from './handlers/collectionHandler.js';
import ProjectHandler from './handlers/projectHandler.js';
import ClimateTypeHandler from './handlers/climateTypeHandler.js';
import VegetationTypeHandler from './handlers/vegetationTypeHandler.js';
import DeviceHandler from './handlers/deviceHandler.js';
import CollectorHandler from './handlers/collectorHandler.js';
import CuratorHandler from './handlers/curatorHandler.js';
import TemplateHandler from './handlers/templateHandler.js';
import SexHandler from './handlers/sexHandler.js';
import LifeStageHandler from './handlers/lifeStageHandler.js';

const {
  ipcMain
} = require('electron');

function listen() {
  console.log('Empecé a escuchar...');

  var datacardHandler = new DatacardHandler();
  var catalogueHandler = new CatalogueHandler();
  var collectionHandler = new CollectionHandler();
  var projectHandler = new ProjectHandler();
  var climateTypeHandler = new ClimateTypeHandler();
  var vegetationTypeHandler = new VegetationTypeHandler();
  var deviceHandler = new DeviceHandler();
  var collectorHandler = new CollectorHandler();
  var curatorHandler = new CuratorHandler();
  var templateHandler = new TemplateHandler();
  var sexHandler = new SexHandler();
  var lifeStageHandler = new LifeStageHandler();

  ipcMain.on('savePhotoCollect', (event, photocollect) => {
    datacardHandler
      .savePhotoCollect(photocollect)
      .then(result => {
        if (result == 'not-supported-format') {
          event.reply('photoCollectNotSaved', result);
        } else {
          event.reply('photoCollectSaved', result);
        }
      })
      .catch(error => {
        console.log(error);
      });
  });

  ipcMain.on('getDatacards', (event, catalogueId, searchString) => {
    datacardHandler.getDatacardsInCatalogue(catalogueId, searchString, async function (datacards) {
      event.reply('datacards', datacards);
    });
  });

  ipcMain.on('getAllDatacards', (event) => {
    datacardHandler.getAllDatacards(async function (datacards) {
      event.reply('datacards', datacards);
    });
  });

  ipcMain.on('getTemplates', event => {
    templateHandler.getTemplateNames(function (templates) {
      event.reply('templates', templates);
    });
  });

  ipcMain.on('getTemplate', (event, templateId) => {
    templateHandler.getTemplate(templateId, function (template) {
      event.reply('template', template);
    });
  });

  ipcMain.on('getCatalogues', (event, collectionId) => {
    catalogueHandler.getCatalogues(collectionId, function (catalogues) {
      event.reply('catalogues', catalogues);
    });
  });

  ipcMain.on('getAllCatalogues', (event) => {
    catalogueHandler.getAllCatalogues(function (catalogues) {
      event.reply('catalogues', catalogues);
    });
  });

  ipcMain.on('getCollections', event => {
    collectionHandler.getCollections(function (collections) {
      event.reply('collections', collections);
    });
  });

  ipcMain.on('getProjects', event => {
    projectHandler.getProjects(function (projects) {
      event.reply('projects', projects);
    });
  });

  ipcMain.on('getCollectors', (event, selectedCollector) => {
    collectorHandler.getCollectors(selectedCollector, function (collectors) {
      event.reply('collectors', collectors);
    });
  });

  ipcMain.on('createCollector', (event, collector) => {
    collectorHandler.createCollector(collector, function (createdCollector) {
      event.reply('collectorCreated', createdCollector);
    });
  });

  ipcMain.on('verifyDuplicateCollectorCode', (event, code) => {
    collectorHandler.verifyDuplicateCode(code, function (isDuplicated) {
      event.reply('collectorCodeVerified', isDuplicated);
    });
  });

  ipcMain.on(
    'getDatacardsCountByCollector',
    (event, collectorCode, catalogueId) => {
      collectorHandler.getDatacardsCountByCollector(
        collectorCode,
        catalogueId,
        function (count) {
          event.reply('datacardsCountByCollector', count);
        }
      );
    }
  );

  ipcMain.on('getCurators', (event, selectedCurator) => {
    curatorHandler.getCurators(selectedCurator, function (curators) {
      event.reply('curators', curators);
    });
  });

  ipcMain.on('createCurator', (event, curator) => {
    curatorHandler.createCurator(curator, function (createdCurator) {
      event.reply('curatorCreated', createdCurator);
    });
  });

  ipcMain.on('getDevices', (event, selectedDevice) => {
    deviceHandler.getDevices(selectedDevice, function (devices) {
      event.reply('devices', devices);
    });
  });

  ipcMain.on('createDevice', (event, device) => {
    deviceHandler.createDevice(device, function (createdDevice) {
      event.reply('deviceCreated', createdDevice.id);
    });
  });

  ipcMain.on('createModel', (event, model) => {
    deviceHandler.createModel(model, function (createdModel) {
      event.reply('modelCreated', createdModel);
    });
  });

  ipcMain.on('getModels', (event, deviceId) => {
    deviceHandler.getModels(deviceId, function (models) {
      event.reply('models', models);
    });
  });

  ipcMain.on('getImageMetadata', event => {
    datacardHandler
      .getImageMetadata()
      .then(result => {
        event.reply('imageMetadata', result);
      })
      .catch(error => {
        event.reply('imageMetadataFailed');
      });
  });

  ipcMain.on('getClimateTypes', event => {
    climateTypeHandler.getClimateTypes(function (climateTypes) {
      event.reply('climateTypes', climateTypes);
    });
  });

  ipcMain.on('getVegetationTypes', event => {
    vegetationTypeHandler.getVegetationTypes(function (vegetationTypes) {
      event.reply('vegetationTypes', vegetationTypes);
    });
  });

  ipcMain.on('getSexes', event => {
    sexHandler.getSexes(function (sexes) {
      event.reply('sexes', sexes);
    });
  });

  ipcMain.on('getLifeStages', event => {
    lifeStageHandler.getLifeStages(function (lifeStages) {
      event.reply('lifeStages', lifeStages);
    });
  });

  ipcMain.on('createDatacard', (event, datacard) => {
    datacardHandler.createDatacard(datacard, function (createdDatacard) {
      event.reply('datacardCreated');
    });
  });

  ipcMain.on('updateDatacard', (event, datacard) => {
    datacardHandler.updateDatacard(datacard, function (updatedDatacard) {
      event.reply('datacardUpdated');
    });
  });

  ipcMain.on('createCatalogue', (event, catalogue) => {
    catalogueHandler.createCatalogue(catalogue, function (createdCatalogue) {
      event.reply('catalogueCreated'); 
    });
  });
}

export default {
  listen,
};