import DatacardHandler from './handlers/datacardHandler.js'
import CatalogueHandler from './handlers/catalogueHandler.js'
import CollectionHandler from './handlers/collectionHandler.js'
import ProjectHandler from './handlers/projectHandler.js'

const {
    ipcMain
} = require('electron')

function listen() {
    console.log('Empecé a escuchar...')

    var datacardHandler = new DatacardHandler();;
    var catalogueHandler = new CatalogueHandler();
    var collectionHandler = new CollectionHandler();
    var projectHandler = new ProjectHandler();

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

    ipcMain.on('getCatalogues', (event) => {
        catalogueHandler.getCatalogues(function (catalogues) {
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
                event.reply('imageMetadata', result);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

export default {
    listen
};