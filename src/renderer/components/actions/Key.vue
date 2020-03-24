<template>
  <form>
    <b-button @click="getKey" block variant="primary" class="mb-3">Press key</b-button>
    <b-form-group label="Press type">
      <b-form-select v-model="editAction.key" @input="updateAction">
        <option v-for="key in Object.values(keyCodes)" :key="key" :value="key">{{ key }}</option>
      </b-form-select>
    </b-form-group>
    <b-form-group label="Press type">
      <b-form-select v-model="editAction.type" @input="updateAction">
        <option value="press">Press</option>
        <option value="down">Key down</option>
        <option value="up">Key up</option>
      </b-form-select>
    </b-form-group>
  </form>
</template>

<script>
const ioHook = require('iohook')

// Number codes
const numCodes = [...Array(10).keys()].reduce((object, index) => {
  object[index + 48] = `${index}`
  return object
}, {})

// Numpad codes
const padCodes = [...Array(10).keys()].reduce((object, index) => {
  object[index + 96] = `numpad_${index}`
  return object
}, {})

// Function codes
const funCodes = [...Array(12).keys()].reduce((object, index) => {
  object[index + 112] = `f${index + 1}`
  return object
}, {})

// Letter codes
const letCodes = [...Array(26).keys()].reduce((object, index) => {
  object[index + 65] = String.fromCharCode(index + 97)
  return object
}, {})

// Keycode reference
// TODO: Must be a better way to do this
const keyCodes = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  27: 'escape',
  32: 'space',
  33: 'pageup',
  34: 'pagedown',
  35: 'end',
  36: 'home',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  44: 'printscreen',
  45: 'insert',
  46: 'delete',
  ...numCodes,
  ...letCodes,
  91: 'command',
  93: 'command',
  ...padCodes,
  ...funCodes,
  160: 'shift',
  161: 'right_shift',
  162: 'control',
  163: 'control',
  164: 'alt'
}

export default {
  props: {
    action: Object
  },
  computed: {
    editAction () {
      return { ...this.action }
    }
  },
  data () {
    return {
      keyCodes
    }
  },
  methods: {
    getKey () {
      ioHook.start()
      ioHook.disableClickPropagation()
      this.$nextTick(() => {
        ioHook.on('keyup', (event) => {
          const keyCode = this.keyCodes[event.rawcode]

          if (keyCode !== undefined) {
            this.editAction.key = keyCode
            this.updateAction()
          }

          ioHook.enableClickPropagation()
          ioHook.removeAllListeners()
        })
      })
    },
    defaultAction () {
      return {
        action: 'Key',
        key: 'enter',
        type: 'press'
      }
    },
    getTableValue (action) {
      const type = action.type === 'press' ? 'Press' : `Key ${action.type}`
      return `${type} ${action.key}`
    },
    updateAction () {
      this.$store.dispatch('UPDATE_ACTION', {
        action: this.editAction
      })
    },
    actionFunction (action, robot, callback) {
      if (action.type === 'press') {
        robot.keyTap(action.key)
      } else {
        robot.keyToggle(action.key, action.type)
      }
      callback()
    }
  }
}
</script>
