const state = {
  playing: false
}

const mutations = {
  START_PLAYBACK (state, { index, actions }) {
    state.playing = true
    let nextAction = index
    actions[nextAction].play(function finishedPlay (nextAction) {
      state.playing = nextAction < actions.length
      if (state.playing) {
        actions[nextAction].play(finishedPlay)
      }
    })
  },
  PAUSE_PLAYBACK (state) {
    state.playing = false
  }
}

const actions = {
  START_PLAYBACK ({ commit, rootState }, { index }) {
    commit('START_PLAYBACK', {
      index,
      actions: rootState.ActionList.actions
    })
  },
  PAUSE_PLAYBACK ({ commit }) {
    commit('PAUSE_PLAYBACK')
  }
}

export default {
  state,
  mutations,
  actions
}
