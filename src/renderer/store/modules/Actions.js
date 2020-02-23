const { readFile, writeFile } = require('fs')

const state = {
  actions: [],
  repeat: 0,
  selected: [],
  history: {
    states: [],
    index: 0,
    saved: false
  },
  filePath: null
}

// Help function to maintain history
const updateHistory = (state) => {
  state.history.index += 1

  // Forget future states
  state.history.states.splice(state.history.index)

  // Push new state to stack
  state.history.states.push({
    actions: state.actions.slice(),
    repeat: state.repeat
  })
}

// Help function to bound selection
const boundSelected = (state) => {
  // Ensure 0 <= selection < actions.length
  state.selected = state.selected.filter((index) => {
    return index >= 0 && index < state.actions.length
  })

  // If nothing is selected, select the last action
  if (state.selected.length === 0 && state.actions.length > 0) {
    state.selected = [state.actions.length - 1]
  }
}

const readStateFromFile = (state, callback) => {
  readFile(state.filePath, { encoding: 'utf8' }, (error, contents) => {
    if (error) {
      return callback(error)
    }

    const { actions, repeat, selected } = JSON.parse(contents)

    // Set state from contents of file
    state.actions = actions.slice()
    state.repeat = repeat
    state.selected = selected.slice()

    // Set new history
    state.history = {
      states: [],
      index: 0,
      saved: true
    }

    callback(undefined)
  })
}

const writeStateToFile = (state, callback) => {
  const { actions, repeat, selected } = state

  // Convert saved state to JSON
  const contents = JSON.stringify({
    actions,
    repeat,
    selected
  }, null, 2)

  state.history.saved = true

  // Write state to given file path
  writeFile(state.filePath, contents, callback)
}

const mutations = {
  SELECT_ACTION (state, { indices }) {
    state.selected = indices
  },
  CREATE_ACTION (state, { action }) {
    // Create action succeeding selected action, or at start
    const selected = state.selected.length > 0 ? state.selected[state.selected.length - 1] : -1
    state.actions.splice(selected + 1, 0, { ...action })
    // Select new action
    state.selected = [selected + 1]
    state.history.saved = false
    boundSelected(state)
    updateHistory(state)
  },
  UPDATE_ACTION (state, { action }) {
    // Replace selected action with updated action
    const selected = state.selected[state.selected.length - 1]
    state.actions.splice(selected, 1, { ...action })
    state.history.saved = false
    updateHistory(state)
  },
  UPDATE_REPEAT (state, { repeat }) {
    state.repeat = repeat
    state.history.saved = false
    updateHistory(state)
  },
  DELETE_ACTION (state) {
    // Filter actions not in selection
    state.actions = state.actions.filter((_action, index) => {
      return !state.selected.includes(index)
    })
    // Select position of topmost deleted action
    state.selected = [Math.min(...state.selected)]
    state.history.saved = false
    boundSelected(state)
    updateHistory(state)
  },
  MOVE_ACTION_UP (state) {
    const selected = state.selected
    selected.sort()
    // If the topmost selected action is at start of actions
    if (selected[0] === 0) {
      return
    }
    // Move each action up one-by-one
    for (let index of selected) {
      const action = state.actions.splice(index, 1)[0]
      state.actions.splice(index - 1, 0, action)
    }
    // Move selection up
    state.selected = state.selected.map(index => index - 1)
    state.history.saved = false
    boundSelected(state)
    updateHistory(state)
  },
  MOVE_ACTION_DN (state) {
    const selected = state.selected
    selected.sort()
    selected.reverse()
    // If the bottommost action is at the bottom of actions
    if (selected[0] === state.actions.length - 1) {
      return
    }
    // Move actions down one-by-one
    for (let index of selected) {
      const action = state.actions.splice(index, 1)[0]
      state.actions.splice(index + 1, 0, action)
    }
    // Move selection down
    state.selected = state.selected.map(index => index + 1)
    state.history.saved = false
    boundSelected(state)
    updateHistory(state)
  },
  UNDO_HISTORY (state) {
    // If there are previous states
    if (state.history.index > 0) {
      state.history.index -= 1
      const { actions, repeat } = state.history.states[state.history.index]
      state.actions = actions.slice()
      state.repeat = repeat
      state.history.saved = false
      boundSelected(state)
    }
  },
  REDO_HISTORY (state) {
    // If there are future states
    if (state.history.index < state.history.states.length - 1) {
      state.history.index += 1
      const { actions, repeat } = state.history.states[state.history.index]
      state.actions = actions.slice()
      state.repeat = repeat
      state.history.saved = false
      boundSelected(state)
    }
  },
  OPEN_FILE (state, { filePath }) {
    state.filePath = filePath
    readStateFromFile(state, (error) => {
      if (error) {
        console.warn('Failed to read state from file')
      }
    })
  },
  SAVE_FILE (state) {
    writeStateToFile(state, (error) => {
      if (error) {
        console.warn('Failed to save state to file')
      }
    })
  },
  SAVE_FILE_AS (state, { filePath }) {
    state.filePath = filePath
    writeStateToFile(state, (error) => {
      if (error) {
        console.warn('Failed to save state to file')
      }
    })
  }
}

// Pass the payload of each action to the respective mutation
const actions = Object.keys(mutations).map(mutation => {
  return {
    name: mutation,
    function ({ commit }, payload) {
      commit(mutation, payload)
    }
  }
}).reduce((actions, action) => ({ ...actions, [action.name]: action.function }), {})

export default {
  state,
  mutations,
  actions
}
