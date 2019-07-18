const robot = require('robotjs')

// Similar to requestAnimationFrame
function animationFrame (fun) {
  setImmediate(() => fun(Date.now()))
}

function click (action, callback) {
  if (action.type === 'click' || action.type === 'double') {
    robot.mouseClick(action.button, action.type === 'double')
  } else {
    robot.mouseToggle(action.type, action.button)
  }
  callback()
}

function move (action, callback) {
  const endPosition = {
    x: Math.floor(Math.random() *
      (action.firstPosition.x - action.secondPosition.x + 1)) + action.secondPosition.x,
    y: Math.floor(Math.random() *
      (action.firstPosition.y - action.secondPosition.y + 1)) + action.secondPosition.y
  }

  if (action.duration === 0) {
    robot.moveMouse(endPosition.x, endPosition.y)
    callback()
  } else {
    const startPosition = robot.getMousePos()
    let startTimestamp
    animationFrame(function moveMouse (timestamp) {
      startTimestamp = startTimestamp || timestamp
      const ratio = (timestamp - startTimestamp) / action.duration
      if (ratio < 1) {
        const x = (endPosition.x - startPosition.x) * ratio + startPosition.x
        const y = (endPosition.y - startPosition.y) * ratio + startPosition.y
        robot.moveMouse(x, y)
        animationFrame(moveMouse.bind(action))
      } else {
        robot.moveMouse(endPosition.x, endPosition.y)
        callback()
      }
    })
  }
}

function pixel (action, callback) {
  let timeout = false
  setTimeout(function () {
    timeout = true
  }, action.timeout)
  const intervalID = setInterval(function () {
    const currentColor = '#' + robot.getPixelColor(action.position.x, action.position.y)
    if (currentColor === action.pixel.color || timeout) {
      clearInterval(intervalID)
      if (timeout) {
        callback(action.afterTimeout)
      } else {
        callback()
      }
    }
  }, action.polling)
}

function wait (action, callback) {
  const waitFor = action.wait + Math.random() * action.random
  setTimeout(callback, waitFor)
}

function goTo (action, callback) {
  callback(action.goTo)
}

export default {
  click,
  move,
  pixel,
  wait,
  goTo
}
