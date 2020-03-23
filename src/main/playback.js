import { BrowserWindow } from 'electron'
import robot from 'robotjs'

// Server-side implementation of requestAnimationFrame
global.requestAnimationFrame = function (callback) {
  setImmediate(() => callback(Date.now()))
}

let playing = false

function startPlayback (actions, actionFunctions, index, repeat, window) {
  // Parse action functions
  Object.keys(actionFunctions).map((action) => {
    // eslint-disable-next-line no-new-func
    actionFunctions[action] = new Function(`return ${actionFunctions[action]}`)()
  })

  // Get the first action to play
  let nextAction = actions[index]

  // Early return if action doesn't exist
  if (nextAction === undefined) {
    return
  }

  // Set playing to true
  playing = true

  // Minimize window
  BrowserWindow.getFocusedWindow().minimize()

  // Function of first action
  let actionFunction = actionFunctions[nextAction.action]
  window.webContents.send('PLAYBACK_ACTION', index)

  actionFunction(nextAction, robot, function finishedPlay (goTo) {
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
      window.webContents.send('PLAYBACK_ACTION', index)

      // Play the next action
      actionFunction(nextAction, robot, finishedPlay)
    } else {
      window.webContents.send('PLAYBACK_FINISHED')
    }
  })
}

function stopPlayback (window) {
  playing = false
  window.webContents.send('PLAYBACK_FINISHED')
}

export {
  startPlayback,
  stopPlayback
}
