"use strict";
  
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const protocol = electron.protocol;

const vueCliPlugIn = require('vue-cli-plugin-electron-builder/lib');
const createProtocol = vueCliPlugIn.createProtocol;
const installVueDevtools = vueCliPlugIn.installVueDevtools;
 
const isDevelopment = process.env.NODE_ENV !== "production";
            
import "core-js/stable"; 
import "regenerator-runtime/runtime";

//--------- CONEXIÓN A LA BASE DE DATOS-----------------               

/*const sqlite3 = require("sqlite3").verbose();
                       
let db = new sqlite3.Database(
  "./db/testDatabase.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  err => {
    console.log("Connected to the test database.");
  }      
);

let sql = `SELECT photocollectDataCardId 
FROM photocollectDataCard`;

function getDatabase() {
  db.serialize(function () {
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row.photocollectDataCardId);
      });
    });
  });
}
*/
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: "app",
  privileges: {
    secure: true,
    standard: true
  }
}]);

function createWindow() {
  // Create the browser window.
  console.log('hola')
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
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
    //getDatabase();
    /*try {
      await installVueDevtools();
    } catch (e) {
      console.error("Vue Devtools failed      to install:", e.toString());
    }*/      
  }
  createWindow(); 
  win.setMenu(null);
});

// Exit cleanly on request from parent process in development mode.
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

import listener from './listeners.js';
listener.listen();