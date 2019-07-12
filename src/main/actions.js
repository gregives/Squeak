const robot = require('robotjs')

// Similar to requestAnimationFrame
function animationFrame (fun) {
  setImmediate(() => fun(Date.now()))
}

export default {
  click (action, callback) {
    if (action.type === 'click' || action.type === 'double') {
      robot.mouseClick(action.button, action.type === 'double')
    } else {
      robot.mouseToggle(action.type, action.button)
    }
    callback()
  },
  key (action, callback) {
    if (action.type === 'press') {
      robot.keyTap(action.key)
    } else {
      robot.keyToggle(action.key, action.type)
    }
    callback()
  },
  wait (action, callback) {
    setTimeout(callback, action.wait)
  },
  move (action, callback) {
    const endPosition = {
      x: Math.floor(Math.random() *
        (action.firstPosition.x - action.secondPosition.x + 1)) + action.secondPosition.x,
      y: Math.floor(Math.random() *
        (action.firstPosition.y - action.secondPosition.y + 1)) + action.secondPosition.y
    }

    if (action.duration === 0) {
      robot.moveMouse(endPosition.x, endPosition.y)
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
  },
  wheel (action, callback) {
    robot.scrollMouse(action.scroll.x, action.scroll.y)
    callback()
  }
}
