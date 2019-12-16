'use strict'

function createPresentationProcess (BrowserWindow) {
  console.log('capa de presentación :D')
  var presentationProcess = new BrowserWindow({
    width: 1200,
    height: 800,
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

  /*presentationProcess.webContents.session.on(
    'will-download',
    (event, item, webContents) => {
        console.log(item.getMimeType())
        console.info(item)
        console.info(event)
        if (item.getMimeType() === "image/png") {
            event.preventDefault()
            
        }

      // Set the save path, making Electron not to prompt a save dialog.
      /*item.setSavePath('/tmp/save.png')

      item.on('updated', (event, state) => {
        console.log('item: ')
        console.info(item.session)
        console.info(item.item)
        console.info(event)
        console.info(state)
        if (state === 'interrupted') {
          console.log('Download is interrupted but can be resumed')
        } else if (state === 'progressing') {
          if (item.isPaused()) {
            console.log('Download is paused')
          } else {
            var fs = require('fs')
            console.log(`Received bytes: ${item.getReceivedBytes()}`)

            try {
              fs.writeFileSync('myfile.png', item)
            } catch (e) {
              alert('Failed to save the file !')
            }
          }
        }
      })
      item.once('done', (event, state) => {
        if (state === 'completed') {
          console.log('Download successfully')
        } else {
          console.log(`Download failed: ${state}`)
        }
      })
    }
  )*/

  presentationProcess.on('closed', () => {
    presentationProcess = null
  })

  return presentationProcess
}

export default {
  createPresentationProcess
}
