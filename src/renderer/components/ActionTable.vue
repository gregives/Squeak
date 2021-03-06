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
import actions from '@/components/actions'

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
    playing () {
      return this.$store.state.actions.playing
    },
    selected () {
      return this.$store.state.actions.selected
    },
    actions () {
      return this.$store.state.actions.actions.map((action, index) => {
        return {
          action: action.action.replace(/(.)([A-Z])/g, (_, $1, $2) => `${$1} ${$2.toLowerCase()}`),
          value: actions[action.action].methods.getTableValue(action),
          index: index + 1,
          _rowVariant: this.rowVariant(index)
        }
      })
    }
  },
  methods: {
    rowVariant (row) {
      return this.playing === row ? 'success' : this.selected.includes(row) ? 'primary' : null
    },
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

  th
    border-bottom: none !important
    box-shadow: 0 2px #dee2e6

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
