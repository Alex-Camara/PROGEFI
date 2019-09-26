import DatacardController from './controllers/datacardController.js'
import Datacard from './models/Datacard.js';

const {
    ipcMain
} = require('electron')

function listen() {
    var datacardController = null;
    var datacard = null;

    ipcMain.on('savePhotoCollect', (event, photocollect) => {

        datacard = new Datacard();
        datacardController = new DatacardController(datacard);
        datacardController.savePhotoCollect(photocollect)
            .then(photoCollectPath => {
                console.log('result: ' + photoCollectPath)
                event.reply('savePhotoCollectSuccess', photoCollectPath);
            })
            .catch(error => {
                console.log(error)
            })
    })

    ipcMain.on('getImageMetadata', (event) => {
        console.log('inicia el listener')
        datacardController.getImageMetadata()
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