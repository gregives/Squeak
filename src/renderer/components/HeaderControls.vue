<template>
  <div class="header-controls border-bottom d-flex flex-row flex-nowrap">
    <div class="flex-shrink-0 border-right position-relative p-3 pb-4">
      <playback-controls />
    </div>
    <div class="overflow-auto text-nowrap">
      <div class="d-inline-block border-right position-relative p-3 pb-4">
        <b-button @click="createAction('Click')">Click</b-button>
        <b-button @click="createAction('Move')">Move</b-button>
        <small class="position-absolute text-muted bottom-left text-center w-100">
          Mouse
        </small>
      </div>
      <div class="d-inline-block border-right position-relative p-3 pb-4">
        <b-button @click="createAction('Key')">Key</b-button>
        <b-button @click="createAction('Type')">Type</b-button>
        <small class="position-absolute text-muted bottom-left text-center w-100">
          Keyboard
        </small>
      </div>
      <div class="d-inline-block border-right position-relative p-3 pb-4">
        <b-button @click="createAction('Wait')">Wait</b-button>
        <b-button @click="createAction('Pixel')">Pixel</b-button>
        <small class="position-absolute text-muted bottom-left text-center w-100">
          Wait
        </small>
      </div>
      <div class="d-inline-block border-right position-relative p-3 pb-4">
        <b-button @click="createAction('GoTo')">Go to</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import PlaybackControls from '@/components/PlaybackControls'

import actions from '@/components/actions'

export default {
  components: {
    PlaybackControls
  },
  methods: {
    createAction (action) {
      this.$store.dispatch('CREATE_ACTION', {
        action: actions[action].methods.defaultAction()
      })
    }
  }
}
</script>
