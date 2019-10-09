"use strict";
const path = require("path");

function createBussinessProcess(BrowserWindow) {
    console.log('capa de negocio :D')
    var bussinessProcess = new BrowserWindow({
        width: 100,
        height: 100,
        //show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    //bussinessProcess.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    //createProtocol("app");
    // Load the index.html when not in development
    bussinessProcess.webContents.openDevTools();

    var bussinessListenerFile = path.resolve(".") + '/public/bussinessIndex.html'
    console.log('file://' + bussinessListenerFile)
    bussinessProcess.loadURL('file://' + bussinessListenerFile);

    bussinessProcess.on("closed", () => {
        bussinessProcess = null;
    });

    //bussinessListener.listen();

    return bussinessProcess
}

export
default {
    createBussinessProcess
}