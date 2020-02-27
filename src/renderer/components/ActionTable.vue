<template>
  <div class="d-flex flex-column border-top">
    <b-table
      hover
      bordered
      fixed
      :fields="fields"
      :items="actions"
      sticky-header="100%"
      class="mb-0"
      @row-clicked="rowClicked"
    >
      <template v-slot:table-colgroup="scope">
        <col
          v-for="field in scope.fields"
          :key="field.key"
          :style="{ width: `${field.width}%` }"
        >
      </template>
    </b-table>
    <b-row class="bg-light border-top text-muted p-3">
      <b-col>
        {{ actions.length }} actions, {{ selected.length }} selected
      </b-col>
      <b-col class="text-right">
        {{ $store.state.actions.history.saved ? 'All changes saved' : 'Unsaved changes' }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ActionClick from '@/components/actions/Click'
import ActionGoTo from '@/components/actions/GoTo'
import ActionMove from '@/components/actions/Move'
import ActionPixel from '@/components/actions/Pixel'
import ActionWait from '@/components/actions/Wait'

const actions = {
  click: ActionClick,
  goTo: ActionGoTo,
  move: ActionMove,
  pixel: ActionPixel,
  wait: ActionWait
}

export default {
  data () {
    return {
      fields: [
        {
          key: 'index',
          label: '#',
          width: 10
        },
        {
          key: 'action',
          width: 20
        },
        {
          key: 'value',
          width: 70
        }
      ]
    }
  },
  computed: {
    selected () {
      return this.$store.state.actions.selected
    },
    actions () {
      return this.$store.state.actions.actions.map((action, index) => {
        return {
          ...actions[action.action].methods.getTableValues(action),
          index,
          _rowVariant: this.selected.includes(index) ? 'primary' : null
        }
      })
    }
  },
  methods: {
    rowClicked (action, clicked, event) {
      if (event.shiftKey) {
        const selected = this.selected[this.selected.length - 1]
        if (clicked > selected) {
          this.$store.dispatch('SELECT_ACTION', {
            indices: Array.from({
              length: clicked - selected + 1
            }, (value, index) => selected + index)
          })
        } else {
          this.$store.dispatch('SELECT_ACTION', {
            indices: Array.from({
              length: selected - clicked + 1
            }, (value, index) => selected - index)
          })
        }
      } else if (event.ctrlKey) {
        const selected = this.selected
        if (selected.includes(clicked)) {
          selected.splice(selected.indexOf(clicked), 1)
        } else {
          selected.push(clicked)
        }
        this.$store.dispatch('SELECT_ACTION', {
          indices: selected
        })
      } else {
        this.$store.dispatch('SELECT_ACTION', {
          indices: [clicked]
        })
      }
    }
  }
}
</script>

<style lang="sass">
.b-table-sticky-header
  flex: 1 1 0
  overflow-y: scroll

.b-table
  border: 0 !important
  user-select: none

  td
    cursor: pointer

  th,
  tr.b-table-empty-row td
    border-top: 0 !important

  tr:focus
    outline: 2px solid #007bff
    outline-offset: -1px

  td
    padding: 0.5rem 0.75rem !important

  td:first-child,
  th:first-child
    border-left: 0 !important
    padding-left: 1rem !important

  td:last-child,
  th:last-child
    border-right: 0 !important
</style>
