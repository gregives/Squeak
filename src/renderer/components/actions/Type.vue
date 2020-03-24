<template>
  <form>
    <b-form-group label="Text">
      <b-form-input v-model="editAction.text" type="text" @input="updateAction"></b-form-input>
    </b-form-group>
    <b-form-group label="Words per minute">
      <b-form-input v-model="editAction.wpm" type="number" number :min="1" @input="updateAction"></b-form-input>
    </b-form-group>
  </form>
</template>

<script>
export default {
  props: {
    action: Object
  },
  computed: {
    editAction () {
      return { ...this.action }
    }
  },
  methods: {
    defaultAction () {
      return {
        action: 'Type',
        text: '',
        wpm: 120
      }
    },
    getTableValue (action) {
      return `“${action.text}”, ${action.wpm} WPM`
    },
    updateAction () {
      this.$store.dispatch('UPDATE_ACTION', {
        action: this.editAction
      })
    },
    actionFunction (action, robot, callback) {
      let index = 0

      const words = action.text.split(' ')
      const wordLength = (action.text.length - (words.length - 1)) / words.length

      // TODO: Investigate background timer throttling
      const intervalID = setInterval(() => {
        robot.typeString(action.text[index++])
        if (index === action.text.length) {
          clearInterval(intervalID)
          callback()
        }
      }, 60000 / (wordLength * action.wpm))
    }
  }
}
</script>
