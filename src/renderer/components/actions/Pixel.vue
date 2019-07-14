<template>
  <form>
    <b-button @click="getPosition" block variant="primary" class="mb-3">Click position</b-button>
    <b-row>
      <b-col>
        <b-form-group label="X position">
          <b-form-input v-model="editAction.position.x" type="number" number :step="1" @change="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Y position">
          <b-form-input v-model="editAction.position.y" type="number" number :step="1" @change="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group label="Color">
      <b-form-input v-model="editAction.pixel.color" type="color" @change="updateAction"></b-form-input>
    </b-form-group>
    <b-form-group label="Poll every">
      <b-input-group append="ms">
        <b-form-input v-model="editAction.polling" type="number" number @change="updateAction"></b-form-input>
      </b-input-group>
    </b-form-group>
    <b-form-group label="Timeout">
      <b-input-group append="ms">
        <b-form-input v-model="editAction.timeout" type="number" number @change="updateAction"></b-form-input>
      </b-input-group>
    </b-form-group>
    <b-form-group label="After timeout">
      <b-input-group prepend="#">
        <b-form-input v-model="editAction.goTo" type="number" number @change="updateAction"></b-form-input>
      </b-input-group>
    </b-form-group>
  </form>
</template>

<script>
const robot = require('robotjs')
const ioHook = require('iohook')

export default {
  props: {
    action: Object
  },
  computed: {
    editAction () {
      return { ...this.action }
    },
    selected () {
      return this.$store.state.Actions.selected
    }
  },
  methods: {
    getPosition () {
      ioHook.start()
      ioHook.disableClickPropagation()
      this.$nextTick(() => {
        ioHook.on('mousedown', firstEvent => {
          ioHook.on('mouseup', secondEvent => {
            const color = robot.getPixelColor(secondEvent.x, secondEvent.y)
            this.editAction.position.x = secondEvent.x
            this.editAction.position.y = secondEvent.y
            this.editAction.pixel.color = '#' + color
            ioHook._events = []
            ioHook._eventsCount = 0
            ioHook.enableClickPropagation()
          })
        })
      })
    },
    defaultAction () {
      return {
        action: 'pixel',
        position: {
          x: 0,
          y: 0
        },
        pixel: {
          color: '#000000'
        },
        polling: 100,
        timeout: 10000,
        goTo: this.selected + 1
      }
    },
    updateAction () {
      this.$store.dispatch('UPDATE_ACTION', {
        index: this.selected,
        action: this.editAction
      })
    }
  }
}
</script>
