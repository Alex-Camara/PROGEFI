import DatacardHandler from './handlers/datacardHandler.js'
import CatalogueHandler from './handlers/catalogueHandler.js'
import CollectionHandler from './handlers/collectionHandler.js'
import Datacard from './models/Datacard.js';

const {
    ipcMain
} = require('electron')

function listen() {
    console.log('Empecé a escuchar...')
    var datacardHandler = null;
    var catalogueHandler = new CatalogueHandler();
    var collectionHandler =  new CollectionHandler();
    var datacard = null;

    ipcMain.on('savePhotoCollect', (event, photocollect) => {

        datacard = new Datacard();
        datacardHandler = new DatacardHandler(datacard);
        datacardHandler.savePhotoCollect(photocollect)
            .then(result => {
                console.log('result: ' + result)
                if (result == 'not-supported-format') {
                    event.reply('photoCollectNotSaved', result);
                } else {
                    console.log('result: ' + result)
                    event.reply('photoCollectSaved', result);
                }
            })
            .catch(error => {
                console.log(error)
            })
    })

    ipcMain.on('getCatalogues', (event) => {
        console.log('obteniendo catálogos')
        catalogueHandler.getCatalogues(function (catalogues) {
            console.log('catalogos a enviar: ' + catalogues)
            event.reply('catalogues', catalogues);
        });
    })

    ipcMain.on('getCollections', (event) => {
        collectionHandler.getCollections(function(collections){
            event.reply('collections', collections);
        });
    })

    ipcMain.on('getImageMetadata', (event) => {
        console.log('inicia el listener')
        datacardHandler.getImageMetadata()
            .then(result => {
                console.log('result: ' + result.model)
                //event.reply('savePhotoCollectSuccess');
            })
            .catch(error => {
                console.log(error)
            })
    })
}

export default {
    listen
};