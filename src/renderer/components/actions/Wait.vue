<template>
  <form>
    <b-form-group label="Wait">
      <b-input-group append="ms">
        <b-form-input v-model="editAction.wait" type="number" number @input="updateAction"></b-form-input>
      </b-input-group>
    </b-form-group>
    <b-form-group label="Random">
      <b-input-group append="ms">
        <b-form-input v-model="editAction.random" type="number" number @input="updateAction"></b-form-input>
      </b-input-group>
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
        action: 'wait',
        wait: 1000,
        random: 1000
      }
    },
    getTableValues (action) {
      return {
        action: 'Wait',
        value: `Wait ${action.wait}ms${action.random ? ` to ${(action.wait + action.random)}ms` : ''}`
      }
    },
    updateAction () {
      this.$store.dispatch('UPDATE_ACTION', {
        action: this.editAction
      })
    }
  }
}
</script>
