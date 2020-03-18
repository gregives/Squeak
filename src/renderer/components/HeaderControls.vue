<template>
  <div class="header-controls border-bottom d-flex flex-row flex-nowrap">
    <div class="flex-shrink-0 border-right position-relative p-3 pb-4">
      <playback-controls />
    </div>
    <div class="overflow-auto text-nowrap">
      <div class="d-inline-block border-right position-relative p-3 pb-4">
        <b-button @click="addClick">Click</b-button>
        <b-button @click="addMove">Move</b-button>
        <small class="position-absolute text-muted bottom-left text-center w-100">
          Mouse
        </small>
      </div>
      <div class="d-inline-block border-right position-relative p-3 pb-4">
        <b-button @click="addKey">Key</b-button>
        <small class="position-absolute text-muted bottom-left text-center w-100">
          Keyboard
        </small>
      </div>
      <div class="d-inline-block border-right position-relative p-3 pb-4">
        <b-button @click="addWait">Wait</b-button>
        <b-button @click="addPixel">Pixel</b-button>
        <small class="position-absolute text-muted bottom-left text-center w-100">
          Wait
        </small>
      </div>
      <div class="d-inline-block border-right position-relative p-3 pb-4">
        <b-button @click="addGoTo">Go to</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import PlaybackControls from '@/components/PlaybackControls'

import ActionClick from '@/components/actions/Click'
import ActionMove from '@/components/actions/Move'
import ActionKey from '@/components/actions/Key'
import ActionPixel from '@/components/actions/Pixel'
import ActionWait from '@/components/actions/Wait'
import ActionGoTo from '@/components/actions/GoTo'

export default {
  components: {
    PlaybackControls
  },
  methods: {
    addClick () {
      this.$store.dispatch('CREATE_ACTION', {
        action: ActionClick.methods.defaultAction()
      })
    },
    addMove () {
      this.$store.dispatch('CREATE_ACTION', {
        action: ActionMove.methods.defaultAction()
      })
    },
    addKey () {
      this.$store.dispatch('CREATE_ACTION', {
        action: ActionKey.methods.defaultAction()
      })
    },
    addPixel () {
      this.$store.dispatch('CREATE_ACTION', {
        action: ActionPixel.methods.defaultAction()
      })
    },
    addWait () {
      this.$store.dispatch('CREATE_ACTION', {
        action: ActionWait.methods.defaultAction()
      })
    },
    addGoTo () {
      this.$store.dispatch('CREATE_ACTION', {
        action: ActionGoTo.methods.defaultAction()
      })
    }
  }
}
</script>
