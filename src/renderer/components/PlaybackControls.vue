<template>
  <div>
    <b-dropdown split text="Play" variant="success" class="mr-2" @click="startPlayback" :disabled="playing || !actions.length">
      <b-dropdown-item @click="startPlaybackSelected">Play from selected</b-dropdown-item>
    </b-dropdown>
    <b-button variant="danger" @click="stopPlayback" :disabled="!playing">Stop</b-button>
    <small class="position-absolute text-muted bottom-left text-center w-100">Playback</small>
  </div>
</template>

<script>
import actions from '@/components/actions'

const { ipcRenderer } = require('electron')

const actionFunctions = Object.keys(actions).reduce((actionFunctions, action) => {
  actionFunctions[action] = actions[action].methods.actionFunction.toString()
  return actionFunctions
}, {})

export default {
  computed: {
    repeat () {
      return this.$store.state.actions.repeat
    },
    selected () {
      const selected = this.$store.state.actions.selected
      return selected[selected.length - 1]
    },
    actions () {
      return this.$store.state.actions.actions
    },
    playing () {
      return this.$store.state.actions.playing >= 0
    }
  },
  methods: {
    startPlayback () {
      ipcRenderer.send('START_PLAYBACK', this.actions, actionFunctions, 0, this.repeat)
    },
    startPlaybackSelected () {
      ipcRenderer.send('START_PLAYBACK', this.actions, actionFunctions, this.selected, this.repeat)
    },
    stopPlayback () {
      ipcRenderer.send('STOP_PLAYBACK')
    }
  },
  created () {
    ipcRenderer.on('PLAYBACK_ACTION', (event, index) => {
      this.$store.dispatch('PLAYBACK_ACTION', { index })
    })

    ipcRenderer.on('PLAYBACK_FINISHED', (event) => {
      this.$store.dispatch('PLAYBACK_FINISHED')
    })
  }
}
</script>