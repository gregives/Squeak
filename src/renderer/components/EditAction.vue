<template>
  <b-card>
    <h6 slot="header" class="mb-0">
      Edit Action
      <div class="float-right">
        <b-button size="sm" @click="moveActionUp">
          <font-awesome-icon icon="caret-up"/>
        </b-button>
        <b-button size="sm" @click="moveActionDown">
          <font-awesome-icon icon="caret-down"/>
        </b-button>
        <b-button variant="danger" size="sm" @click="deleteAction">
          <font-awesome-icon icon="trash"/>
        </b-button>
      </div>
    </h6>
    {{ action }}
  </b-card>
</template>

<script>
export default {
  name: 'edit-action',
  computed: {
    selected () {
      return this.$store.state.Actions.selected
    },
    action () {
      return this.$store.state.Actions.actions[this.selected]
    }
  },
  methods: {
    deleteAction () {
      return this.$store.dispatch('DELETE_ACTION', {
        index: this.selected
      })
    },
    moveActionUp () {
      return this.$store.dispatch('MOVE_ACTION_UP', {
        index: this.selected
      })
    },
    moveActionDown () {
      return this.$store.dispatch('MOVE_ACTION_DN', {
        index: this.selected
      })
    }
  }
}
</script>

<style lang="sass">
.card-header .float-right
  margin-top: -6.5px
  margin-bottom: -6.5px
</style>
