<template>
  <form>
    <b-button @click="getPosition" block variant="primary" class="mb-3">Click position</b-button>
    <b-form-group label="Color">
      <b-form-input v-model="editAction.color" type="color" @input="updateAction"></b-form-input>
    </b-form-group>
    <b-form-group label="Threshold">
      <b-input-group append="%">
        <b-form-input v-model="editAction.threshold" type="number" number :min="0" :max="100" :step="1" @input="updateAction"></b-form-input>
      </b-input-group>
    </b-form-group>
    <b-row>
      <b-col>
        <b-form-group label="X position">
          <b-form-input v-model="editAction.position.x" type="number" number :min="0" :step="1" @input="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Y position">
          <b-form-input v-model="editAction.position.y" type="number" number :min="0" :step="1" @input="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group label="Poll every">
      <b-input-group append="ms">
        <b-form-input v-model="editAction.polling" type="number" number @input="updateAction"></b-form-input>
      </b-input-group>
    </b-form-group>
    <b-form-group label="Timeout">
      <b-input-group append="ms">
        <b-form-input v-model="editAction.timeout" type="number" number @input="updateAction"></b-form-input>
      </b-input-group>
    </b-form-group>
    <b-form-group label="After timeout">
      <b-input-group prepend="#">
        <b-form-input v-model="editAction.afterTimeout" type="number" number @input="updateAction"></b-form-input>
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
      return this.$store.state.actions.selected[0]
    }
  },
  methods: {
    getPosition () {
      ioHook.start()
      ioHook.disableClickPropagation()
      this.$nextTick(() => {
        ioHook.on('mouseup', (event) => {
          const color = robot.getPixelColor(event.x, event.y)
          this.editAction.position.x = event.x
          this.editAction.position.y = event.y
          this.editAction.color = '#' + color
          this.updateAction()

          ioHook.enableClickPropagation()
          ioHook.removeAllListeners()
        })
      })
    },
    defaultAction () {
      return {
        action: 'Pixel',
        position: {
          x: 0,
          y: 0
        },
        color: '#000000',
        threshold: 90,
        polling: 100,
        timeout: 10000,
        afterTimeout: 1
      }
    },
    getTableValue (action) {
      const position = `[${action.position.x}, ${action.position.y}]`
      return `Color ${action.color}, ${position}, poll ${action.polling}ms, timeout ${action.timeout}ms, #${action.afterTimeout}`
    },
    updateAction () {
      this.$store.dispatch('UPDATE_ACTION', {
        action: this.editAction
      })
    },
    actionFunction (action, robot, callback) {
      let timeout = false
      setTimeout(function () {
        timeout = true
      }, action.timeout)

      // Convert hex #aabbcc to rgb
      const hexToRGB = (hexColor) => {
        return {
          R: parseInt(hexColor.slice(1, 3), 16),
          G: parseInt(hexColor.slice(3, 5), 16),
          B: parseInt(hexColor.slice(5, 6), 16)
        }
      }

      // Difference between 2 colours
      // TODO: Improve this function, maybe use LAB space?
      const differenceBetweenColors = (color1, color2) => {
        return (Math.abs(color1.R - color2.R) + Math.abs(color1.G - color2.G) + Math.abs(color1.B - color2.B)) / 765
      }

      const actionColorRGB = hexToRGB(action.color)

      const intervalID = setInterval(function () {
        const currentColor = '#' + robot.getPixelColor(action.position.x, action.position.y)
        const currentColorRGB = hexToRGB(currentColor)

        if (differenceBetweenColors(currentColorRGB, actionColorRGB) <= (action.threshold / 100) || timeout) {
          clearInterval(intervalID)
          if (timeout) {
            callback(action.afterTimeout)
          } else {
            callback()
          }
        }
      }, action.polling)
    }
  }
}
</script>
