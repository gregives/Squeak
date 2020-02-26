<template>
  <div class="d-flex flex-wrap justify-content-between px-3">
    <div class="mr-4 mt-3">
      <b-input-group prepend="Repeat" append="times">
        <b-form-input type="number" number :step="1" :min="0" :value="repeat" @input="updateRepeat"></b-form-input>
      </b-input-group>
    </div>
    <div class="flex-shrink-0 my-3">
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
      return this.$store.state.actions.repeat
    },
    selected () {
      const selected = this.$store.state.actions.selected
      return selected[selected.length - 1]
    },
    action () {
      return this.$store.state.actions.actions[this.selected]
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
