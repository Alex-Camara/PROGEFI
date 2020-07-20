"use strict";

import BussinessProcess from "./bussiness/bussinessListener";
const KnexConfig = require("./persistence/knexfile");
const { ipcMain } = require("electron");
const fs = require("fs");
const log = require("electron-log");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const protocol = electron.protocol;

const vueCliPlugIn = require("vue-cli-plugin-electron-builder/lib");
const createProtocol = vueCliPlugIn.createProtocol;

const installVueDevtools = vueCliPlugIn.installVueDevtools;

const isDevelopment = process.env.NODE_ENV !== "production";
let win;
let storageRoute = app.getPath("userData");

protocol.registerSchemesAsPrivileged([
  {
    scheme: "app",
    privileges: {
      secure: true,
      standard: true
    }
  }
]);

function createWindow() {
  // Create the browser window.
  console.log("hola");
  var screenElectron = electron.screen;
  var mainScreen = screenElectron.getPrimaryDisplay();
  var dimensions = mainScreen.size;
  let partialWidth = Math.round((70 * dimensions.width) / 100);

  let partialHeight = Math.round((67 * partialWidth) / 100);
  win = new BrowserWindow({
    width: partialWidth,
    height: partialHeight,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST)
    win.webContents.openDevTools();
  } else {
    win.webContents.openDevTools();
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  win.on("closed", () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools();
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
  win.setMenu(null);
  win.setResizable(false);
  // process.setFdLimit(12000);
  app.commandLine.appendSwitch("disable-http-cache");

  let databasePath = app.getPath("userData") + "/progefiDB.db";

  KnexConfig.productionLinux.connection.filename = databasePath;
  KnexConfig.productionWindows.connection.filename = databasePath;
  KnexConfig.productionDarwin.connection.filename = databasePath;
  KnexConfig.developmentWindows.connection.filename = databasePath;
  KnexConfig.developmentDarwin.connection.filename = databasePath;
  KnexConfig.developmentLinux.connection.filename = databasePath;

  if (!fs.existsSync(databasePath)) {

    let knex = require("knex")(KnexConfig.developmentWindows);

    log.info("user data: ");
    log.info(app.getPath("userData"));
    log.info("nuevo camino: ");
    log.info(KnexConfig.developmentWindows);

    await knex.migrate
      .latest()
      .then(() => {
        return knex.seed.run().catch(err => {
          log.info("error: ");
          log.error(err);
        });
      })
      .catch(err => {
        log.info("error: ");
        log.error(err);
      });
  }


  protocol.registerFileProtocol("file", (request, callback) => {
    const pathname = decodeURI(request.url.replace("file:///", ""));
    callback(pathname);
  });

  // protocol.registerFileProtocol('file', (request, callback) => {
  //   const pathname = request.url.replace('file:///', '');
  //   callback(pathname);
  // });

  // protocol.interceptFileProtocol('file', function(req, callback) {
  //   var url = req.url.substr(7);
  //   callback({path: path.normalize(__dirname + url)})
  // },function (error) {
  //   if (error)
  //     console.error('Failed to register protocol')
  // })
});

// app.whenReady().then(() => {
//   protocol.registerFileProtocol('file', (request, callback) => {
//     const pathname = decodeURI(request.url.replace('file:///', ''));
//     callback(pathname);
//   });
// });

if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

ipcMain.on("minimize", () => {
  app.relaunch();
  app.exit();
});

ipcMain.on("maximize", event => {
  var os = require("os");
  // win.maximize();
  // win.setResizable(false);
  // win.setMovable(false)
  win.setResizable(true);
  var screenElectron = electron.screen;
  var mainScreen = screenElectron.getPrimaryDisplay();
  var dimensions = mainScreen.size;
  let partialWidth = Math.round((90 * dimensions.width) / 100);

  let partialHeight = Math.round((90 * dimensions.height) / 100);

  win.setSize(partialWidth, partialHeight);

  if (os.platform !== "darwin") {
    win.maximize();
  }
  event.reply("maximized");
});

function listenToProcesses() {
  BussinessProcess.listen(storageRoute);
}

listenToProcesses();
