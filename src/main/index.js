'use strict'

import { app, BrowserWindow, ipcMain, Menu } from 'electron'

import createMenu from './menu'
import { startPlayback, pausePlayback } from './playback'

// Playback controls from renderer
ipcMain.on('START_PLAYBACK', (_event, ...args) => startPlayback(...args))
ipcMain.on('PAUSE_PLAYBACK', (_event, ...args) => pausePlayback(...args))

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  // Create window
  mainWindow = new BrowserWindow({
    frame: false,
    minWidth: 500,
    minHeight: 400,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Set application menu from template
  Menu.setApplicationMenu(Menu.buildFromTemplate(createMenu(mainWindow)))
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
