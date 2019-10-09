"use strict";

function createPresentationProcess(BrowserWindow) {
    console.log('capa de presentación :D')
    var presentationProcess = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        presentationProcess.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        if (!process.env.IS_TEST) presentationProcess.webContents.openDevTools();
    } else {
        createProtocol("app");
        // Load the index.html when not in development
        presentationProcess.loadURL("app://./index.html");
    }

    presentationProcess.on("closed", () => {
        presentationProcess = null;
    });

    return presentationProcess;
}

export
default {
    createPresentationProcess
}