'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import actionFunctions from './actions.js'

/**
* Control playing of actions, from server-side Node.js
*/
(function () {
  let playing = false

  // Start playback from Vue
  ipcMain.on('START_PLAYBACK', (event, actions, index, repeat) => {
    // Minimize window
    BrowserWindow.getFocusedWindow().minimize()

    // Set playing to true
    playing = true
    repeat += 1

    let nextAction = actions[index]
    let actionFunction = actionFunctions[nextAction.action]

    actionFunction(nextAction, function finishedPlay (goTo) {
      // Get next action index
      index = goTo !== undefined ? goTo - 1 : index + 1
      if (repeat > 1 && index === actions.length) {
        repeat -= 1
        index = 0
      }
      playing = playing && index < actions.length

      if (playing) {
        // Next action and its function
        nextAction = actions[index]
        actionFunction = actionFunctions[nextAction.action]

        // Play the next action
        actionFunction(nextAction, finishedPlay)
      }
    })
  })

  // Pause/stop playback
  ipcMain.on('PAUSE_PLAYBACK', (event) => {
    playing = false
  })
})()

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
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      nodeIntegration: true,
      zoomFactor: 0.8
    }
  })

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
