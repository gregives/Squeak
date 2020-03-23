<template>
  <form>
    <!-- <b-button @click="getKey" block variant="primary" class="mb-3">Press key</b-button> -->
    <b-form-group label="Key">
      <b-form-input v-model="editAction.key" type="text" @input="updateAction"></b-form-input>
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
        action: 'Key',
        type: 'press',
        key: 'enter'
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
