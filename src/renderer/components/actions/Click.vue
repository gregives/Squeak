<template>
  <form>
    <b-form-group label="Button">
      <b-form-select v-model="editAction.button" @input="updateAction">
        <option value="left">Left</option>
        <option value="right">Right</option>
        <option value="middle">Middle</option>
      </b-form-select>
    </b-form-group>
    <b-form-group label="Click type">
      <b-form-select v-model="editAction.type" @input="updateAction">
        <option value="single">Single click</option>
        <option value="double">Double click</option>
        <option value="down">Button down</option>
        <option value="up">Button up</option>
      </b-form-select>
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
        action: 'Click',
        button: 'left',
        type: 'single'
      }
    },
    getTableValue (action) {
      const toTitleCase = (string) => string.charAt(0).toUpperCase() + string.substr(1)
      return `${toTitleCase(action.type)} ${action.button} click`
    },
    updateAction () {
      this.$store.dispatch('UPDATE_ACTION', {
        action: this.editAction
      })
    },
    actionFunction (action, robot, callback) {
      if (action.type === 'single' || action.type === 'double') {
        robot.mouseClick(action.button, action.type === 'double')
      } else {
        robot.mouseToggle(action.type, action.button)
      }
      callback()
    }
  }
}
</script>
