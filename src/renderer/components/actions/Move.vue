<template>
  <form>
    <b-row>
      <b-col>
        <b-form-group label="X position">
          <b-form-input v-model="editAction.position.x" type="number" :step="1" @change="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Y position">
          <b-form-input v-model="editAction.position.y" type="number" :step="1" @change="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group label="Duration (ms)" class="mt-3">
      <b-form-input v-model="editAction.duration" type="number" :step="1" @change="updateAction"></b-form-input>
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
        action: 'move',
        position: {
          x: 0,
          y: 0
        },
        duration: 0
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
