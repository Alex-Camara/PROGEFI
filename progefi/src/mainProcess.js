"use strict";                  
                  
import PresentationProcess from './presentation/presentationProcess'
import BussinessProcess from './bussiness/bussinessListener'
 
const electron = require('electron');
const app = electron.app;     
const BrowserWindow = electron.BrowserWindow; 
const protocol = electron.protocol;   
     
const vueCliPlugIn = require('vue-cli-plugin-electron-builder/lib');
//const createProtocol = vueCliPlugIn.createProtocol;
//const installVueDevtools = vueCliPlugIn.installVueDevtools;
               
const isDevelopment = process.env.NODE_ENV !== "production";
                         
const { 
    ipcMain
} = require('electron')               
 
var presentationProcess = null; 
          
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
  
function main() {
                                     
    // Scheme must be registered before the app is ready
    protocol.registerSchemesAsPrivileged([{        
        scheme: "app",
        privileges: {
            secure: true,
            standard: true  
        }
    }]);     
                           
    function createWindows() {
        presentationProcess = PresentationProcess.createPresentationProcess(BrowserWindow) 
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
        if (presentationProcess === null) {
            createWindows();
        }
    });

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on("ready", async () => {
        createWindows();
        presentationProcess.setMenu(null);
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
}
  
function listenToProcesses() {
    BussinessProcess.listen()
}

main();
listenToProcesses();