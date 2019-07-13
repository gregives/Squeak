<template>
  <b-card class="shadow-sm">
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
    <component :is="action ? `action-${action.action}` : null" :action="action"></component>
  </b-card>
</template>

<script>
import ActionClick from './actions/Click'
import ActionMove from './actions/Move'
import ActionPixel from './actions/Pixel'
import ActionWait from './actions/Wait'

export default {
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
  },
  components: {
    ActionClick,
    ActionMove,
    ActionPixel,
    ActionWait
  }
}
</script>

<style lang="sass">
.card-header .float-right
  margin-top: -6.5px
  margin-bottom: -6.5px

form > .form-group:last-of-type
  margin-bottom: 0
</style>
