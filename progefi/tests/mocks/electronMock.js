import { EventEmitter } from 'events'

export const ipcRenderer = {
  on: jest.fn().mockReturnValue('hey'),
  send: jest.fn().mockReturnValue('hey')
}

export const ipcMain = {
  on: jest.fn().mockImplementation(function () {
    return 'catalogues'
  })
}
//
//   "electron": "<rootDir>/tests/mocks/electronMock.js"

// import createIPCMock from 'electron-mock-ipc'
//
// const mocked = createIPCMock()
// const ipcMain = mocked.ipcMain
// const ipcRenderer = mocked.ipcRenderer
// export { ipcMain, ipcRenderer }
