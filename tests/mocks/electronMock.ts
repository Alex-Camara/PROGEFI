// export const ipcRenderer = {
    // on: jest.fn().mockReturnValue('hey'),
    // send: jest.fn().mockReturnValue('hey')
//   };
// 
//   "electron": "<rootDir>/tests/mocks/electronMock.js"

import createIPCMock from 'electron-mock-ipc'

const mocked = createIPCMock()
const ipcMain = mocked.ipcMain
const ipcRenderer = mocked.ipcRenderer
export { ipcMain, ipcRenderer }