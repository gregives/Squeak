<template>
  <div>
    <b-dropdown split text="Play" variant="success" class="mr-2" @click="startPlayback">
      <b-dropdown-item @click="startPlaybackSelected">Play from selected</b-dropdown-item>
    </b-dropdown>
    <b-button variant="info" @click="pausePlayback">Stop</b-button>
    <small class="position-absolute text-muted bottom-left text-center w-100">Playback</small>
  </div>
</template>

<script>
import ActionClick from '@/components/actions/Click'
import ActionMove from '@/components/actions/Move'
import ActionKey from '@/components/actions/Key'
import ActionGoTo from '@/components/actions/GoTo'
import ActionPixel from '@/components/actions/Pixel'
import ActionWait from '@/components/actions/Wait'

const actionFunctions = {
  click: ActionClick.methods.actionFunction.toString(),
  move: ActionMove.methods.actionFunction.toString(),
  key: ActionKey.methods.actionFunction.toString(),
  wait: ActionWait.methods.actionFunction.toString(),
  pixel: ActionPixel.methods.actionFunction.toString(),
  goTo: ActionGoTo.methods.actionFunction.toString()
}

const { ipcRenderer } = require('electron')

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
    }
  },
  methods: {
    startPlayback () {
      ipcRenderer.send('START_PLAYBACK', this.actions, actionFunctions, 0, this.repeat)
    },
    startPlaybackSelected () {
      ipcRenderer.send('START_PLAYBACK', this.actions, actionFunctions, this.selected, this.repeat)
    },
    pausePlayback () {
      ipcRenderer.send('PAUSE_PLAYBACK')
    }
  }
}
</script>