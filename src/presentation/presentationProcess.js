'use strict'

const vueCliPlugIn = require('vue-cli-plugin-electron-builder/lib')
const createProtocol = vueCliPlugIn.createProtocol;
const installVueDevtools = vueCliPlugIn.installVueDevtools;

function createPresentationProcess (BrowserWindow) {
  console.log('capa de presentación :D')
  const electron = require('electron');
  var screenElectron = electron.screen;
  var mainScreen = screenElectron.getPrimaryDisplay();
  var dimensions = mainScreen.size;
  // let partialHeight = Math.round(70 * dimensions.height / 100);
  let partialWidth = Math.round(70 * dimensions.width / 100);

  let partialHeight = Math.round(67 * partialWidth / 100);
  console.info("partial height: " + partialHeight)
  console.info("partial width: " + partialWidth)
  var presentationProcess = new BrowserWindow({
    width: partialWidth,
    height: partialHeight,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    presentationProcess.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) presentationProcess.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    presentationProcess.loadURL('app://./index.html')
  }
  presentationProcess.on('closed', () => {
    presentationProcess = null
  })

  return presentationProcess
}

export default {
  createPresentationProcess
}
