import DatacardHandler from './handlers/datacardHandler.js'
import CatalogueHandler from './handlers/catalogueHandler.js'
import CollectionHandler from './handlers/collectionHandler.js'
import ProjectHandler from './handlers/projectHandler.js'
import ClimateTypeHandler from './handlers/climateTypeHandler.js'
import VegetationTypeHandler from './handlers/vegetationTypeHandler.js'

const {
    ipcMain
} = require('electron')

function listen() {
    console.log('Empecé a escuchar...')

    var gm = require('gm');

    function resize() {
        return new Promise((res, rej) => {
            gm("ave.png")
                .resize(900)
                .write("test2.png", function (err) {
                    if (err) {
                        console.log(err)
                        rej(err)
                    } else {
                        console.log('resized')
                        res('resized')
                    }
                });
        })
    }

    function createImage() {
        return new Promise((res, rej) => {
            gm(1270, 800, 'black')
                .fill("white")
                .font('Arial', 20)
                .draw(['image over 350,130 0,0 "test2.png"'])
                .write("brandNewImg.jpg", function (err) {
                    if (err) {
                        console.log(err)
                        rej(err)
                    } else {
                        console.log('imageCreated')
                        res('imageCreated')
                    }
                });
        })
    }

    function addTitle() {
        return new Promise((res, rej) => {
            gm("brandNewImg.jpg")
                .region(1270, 30, 0, 20)
                .gravity('Center')
                .fill("white")
                .font('Arial', 30)
                .drawText(20, 0, "Colección Fotográfica de Vertebrados Terrestres 'Alvar González Cristen'")
                .write("brandNewImg.jpg", function (err) {
                    if (err) {
                        console.log(err)
                        rej(err)
                    } else {
                        res('titleAdded')
                    }
                });
        })
    }

    function resizeLogo() {
        return new Promise((res, rej) => {
            gm("logo.png")
                .resize(160)
                .write("logo.png", function (err) {
                    if (err) {
                        console.log(err)
                        rej(err)
                    } else {
                        console.log('imageCreated')
                        res('imageCreated')
                    }
                });
        })
    }

    function addLogo() {
        return new Promise((res, rej) => {
            gm("brandNewImg.jpg")
                //.region(50, 50, 50, 200)
                //.gravity('Center')
                .draw(['image over 85,70 0,0 "logo.png"'])
                .write("brandNewImg.jpg", function (err) {
                    if (err) {
                        console.log(err)
                        rej(err)
                    } else {
                        console.log('imageCreated')
                        res('imageCreated')
                    }
                });
        })
    }

    function addData() {
        return new Promise((res, rej) => {
            gm("brandNewImg.jpg")
                .region(300, 700, 20, 0)
                .gravity('West')
                .fill("white")
                .font('Arial', 20)
                .drawText(0, 0, "Adulto")
                .drawText(90, 0, "Indeterminado")
                .drawText(0, 35, "20° 55 10.84 LN")
                .drawText(0, 65, "97° 26 26.37 LW")
                .drawText(0, 125, "8 msnm")
                .drawText(100, 125, "Aw2")
                .drawText(0, 185, "Eijdo Juana Moza")
                .drawText(190, 185, "Tuxpan")
                .drawText(0, 215, "Veracruz")
                .drawText(100, 215, "México")
                .drawText(0, 275, "18 de Marzo del 2015")
                .drawText(0, 305, "10:42")
                .drawText(0, 365, "Sony")
                .drawText(30, 365, "DHC-H300 20.1 Mpixel")
                .write("brandNewImg.jpg", function (err) {
                    if (err) {
                        console.log(err)
                        rej(err)
                    } else {
                        console.log('imageCreated')
                        res('imageCreated')
                    }
                });
        })
    }

    var executePromises = Promise.resolve()
        .then(res => {
            return resize()
        })
        .then(res => {
            return createImage()
        })
        .then(res => {
            return addTitle()
        })
        .then(res => {
            return resizeLogo()
        })
        .then(res => {
            return addLogo()
        })
        .then(res => {
            return addData()
        })

    executePromises;



    /*var fontManager = require('font-manager');
    var font = fontManager.findFontSync({
        family: 'Arial',
        weight: 400
    });

    console.info(font)*/
    //var fonts = fontManager.getAvailableFontsSync();
    //console.info(fonts)

    var datacardHandler = new DatacardHandler();;
    var catalogueHandler = new CatalogueHandler();
    var collectionHandler = new CollectionHandler();
    var projectHandler = new ProjectHandler();
    var climateTypeHandler = new ClimateTypeHandler();
    var vegetationTypeHandler = new VegetationTypeHandler();

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
            console.log('collecciones en listenes: ' + collections)
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
        vegetationTypeHandler.getVegetationTypes(function (vegetationTypes) {
            event.reply('vegetationTypes', vegetationTypes);
        });
    })
}

export default {
    listen
};