<template>
  <div class="clearfix">
    <div class="float-left">
      <b-input-group prepend="Repeat" append="times">
        <b-form-input type="number" number :step="1" class="repeat-input" :value="repeat" @input="updateRepeat"></b-form-input>
      </b-input-group>
    </div>
    <div class="float-right">
      <b-button-toolbar key-nav aria-label="Toolbar with button groups">
        <b-button-group class="mr-2">
          <b-button @click="moveActionUp">
            <font-awesome-icon icon="caret-up"/>
          </b-button>
          <b-button @click="moveActionDown">
            <font-awesome-icon icon="caret-down"/>
          </b-button>
        </b-button-group>
        <b-button-group class="mx-1">
          <b-button variant="danger" @click="deleteAction">
            <font-awesome-icon icon="trash"/>
          </b-button>
        </b-button-group>
      </b-button-toolbar>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    repeat () {
      return this.$store.state.Actions.repeat
    },
    selected () {
      const selected = this.$store.state.Actions.selected
      return selected[selected.length - 1]
    },
    action () {
      return this.$store.state.Actions.actions[this.selected]
    }
  },
  methods: {
    updateRepeat (repeat) {
      return this.$store.dispatch('UPDATE_REPEAT', {
        repeat
      })
    },
    deleteAction () {
      return this.$store.dispatch('DELETE_ACTION')
    },
    moveActionUp () {
      return this.$store.dispatch('MOVE_ACTION_UP')
    },
    moveActionDown () {
      return this.$store.dispatch('MOVE_ACTION_DN')
    }
  }
}
</script>

<style lang="sass">
.repeat-input
  width: 100px !important
</style>
