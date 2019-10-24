import DatacardHandler from './handlers/datacardHandler.js'
import CatalogueHandler from './handlers/catalogueHandler.js'
import CollectionHandler from './handlers/collectionHandler.js'
import ProjectHandler from './handlers/projectHandler.js'
import ClimateTypeHandler from './handlers/climateTypeHandler.js'

const {
    ipcMain
} = require('electron')

function listen() {
    console.log('Empecé a escuchar...')
    var ExifImage = require('exif').ExifImage;

    var datacardHandler = new DatacardHandler();;
    var catalogueHandler = new CatalogueHandler();
    var collectionHandler = new CollectionHandler();
    var projectHandler = new ProjectHandler();
    var climateTypeHandler = new ClimateTypeHandler();

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

    ipcMain.on('getImageMetadata', (event) => {
        datacardHandler.getImageMetadata()
            .then(result => {
                console.info(result)
                console.log('enviando resultados...')
                event.reply('imageMetadata', result);
            })
            .catch(error => {
                event.reply('imageMetadataFailed');
            })
    })

    ipcMain.on('getClimateTypes', (event) => {
        climateTypeHandler.getClimateTypes(function (climateTypes) {
            event.reply('climateTypes', climateTypes);
        });
    })

    ipcMain.on('getVegetationTypes', (event) => {
        climateTypeHandler.getVegetationTypes(function (vegetationTypes) {
            event.reply('vegetationTypes', vegetationTypes);
        });
    })
}

export default {
    listen
};