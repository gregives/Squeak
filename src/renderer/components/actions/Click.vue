<template>
  <form>
    <b-form-group label="Button">
      <b-form-select v-model="editAction.button" @change="updateAction">
        <option value="left">Left</option>
        <option value="right">Right</option>
        <option value="middle">Middle</option>
      </b-form-select>
    </b-form-group>
    <b-form-group label="Click type">
      <b-form-select v-model="editAction.type" @change="updateAction">
        <option value="click">Single click</option>
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
    },
    selected () {
      return this.$store.state.Actions.selected
    }
  },
  methods: {
    defaultAction () {
      return {
        action: 'click',
        button: 'left',
        type: 'click'
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
