<template>
  <form>
    <b-form-group label="Button">
      <b-form-select v-model="editAction.button" @change="updateAction">
        <option value="left">Left click</option>
        <option value="right">Right click</option>
        <option value="middle">Middle click</option>
      </b-form-select>
    </b-form-group>
    <b-form-group>
      <b-form-checkbox v-model="editAction.doubleClick" @change="updateAction">
        Double click
      </b-form-checkbox>
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
      return this.$store.state.ActionList.selected
    }
  },
  methods: {
    defaultAction () {
      return {
        name: 'action-click',
        button: 'left',
        doubleClick: false,
        play () {
          console.log(this)
        }
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
