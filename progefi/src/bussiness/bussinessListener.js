import DatacardHandler from './handlers/datacardHandler.js'
import CatalogueHandler from './handlers/catalogueHandler.js'
import CollectionHandler from './handlers/collectionHandler.js'
import ProjectHandler from './handlers/projectHandler.js'
import ClimateTypeHandler from './handlers/climateTypeHandler.js'
import VegetationTypeHandler from './handlers/vegetationTypeHandler.js'
import SpeciesDataHandler from './handlers/speciesDataHandler.js'
import DeviceHandler from './handlers/deviceHandler.js'
import CollectorHandler from './handlers/collectorHandler.js'
import CuratorHandler from './handlers/curatorHandler.js'

const {
    ipcMain
} = require('electron')

function listen() {
    console.log('Empecé a escuchar...')

    var datacardHandler = new DatacardHandler();;
    var catalogueHandler = new CatalogueHandler();
    var collectionHandler = new CollectionHandler();
    var projectHandler = new ProjectHandler();
    var climateTypeHandler = new ClimateTypeHandler();
    var vegetationTypeHandler = new VegetationTypeHandler();
    var speciesDataHandler = new SpeciesDataHandler();
    var deviceHandler = new DeviceHandler();
    var collectorHandler = new CollectorHandler();
    var curatorHandler = new CuratorHandler();

    ipcMain.on('savePhotoCollect', (event, photocollect) => {

        datacardHandler.savePhotoCollect(photocollect)
            .then(result => {
                if (result == 'not-supported-format') {
                    event.reply('photoCollectNotSaved', result);
                } else {
                    event.reply('photoCollectSaved', result);
                }
            })
            .catch(error => {
                console.log(error)
            })
    })

    ipcMain.on('getCatalogues', (event, collectionId) => {
        catalogueHandler.getCatalogues(collectionId, function (catalogues) {
            event.reply('catalogues', catalogues);
        });
    })

    ipcMain.on('getCollections', (event) => {
        collectionHandler.getCollections(function (collections) {
            event.reply('collections', collections);
        });
    })

    ipcMain.on('getProjects', (event) => {
        projectHandler.getProjects(function (projects) {
            event.reply('projects', projects);
        });
    })

    ipcMain.on('getCollectors', (event, selectedCollector) => {
        collectorHandler.getCollectors(selectedCollector, function (collectors) {
            event.reply('collectors', collectors);
        });
    })

    ipcMain.on('getCurators', (event, selectedCurator) => {
        curatorHandler.getCurators(selectedCurator, function (curators) {
            console.info(curators)
            event.reply('curators', curators);
        });
    })

    ipcMain.on('getDevices', (event) => {
        deviceHandler.getDevices(function (devices) {
            event.reply('devices', devices);
        });
    })

    ipcMain.on('getModels', (event, deviceId) => {
        deviceHandler.getModels(deviceId, function (models) {
            event.reply('models', models);
        });
    })

    ipcMain.on('getImageMetadata', (event) => {
        datacardHandler.getImageMetadata()
            .then(result => {
                console.info(result)
                console.log('enviando resultados...')
                event.reply('imageMetadata', result);
            })
            .catch(error => {
                console.log('falló recolección de metadatos...')
                event.reply('imageMetadataFailed');
            })
    })

    ipcMain.on('getClimateTypes', (event) => {
        climateTypeHandler.getClimateTypes(function (climateTypes) {
            event.reply('climateTypes', climateTypes);
        });
    })

    ipcMain.on('getVegetationTypes', (event) => {
        vegetationTypeHandler.getVegetationTypes(function (vegetationTypes) {
            event.reply('vegetationTypes', vegetationTypes);
        });
    })

    ipcMain.on('getSexes', (event) => {
        speciesDataHandler.getSexes(function (sexes) {
            event.reply('sexes', sexes);
        });
    })

    ipcMain.on('getLifeStages', (event) => {
        speciesDataHandler.getLifeStages(function (lifeStages) {
            event.reply('lifeStages', lifeStages);
        });
    })
}

export default {
    listen
};