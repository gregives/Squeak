<template>
  <b-container class="d-flex flex-column vh-100" fluid>
    <header-controls class="flex-shrink-0"></header-controls>
    <b-row class="flex-grow-1">
      <b-col class="d-flex flex-column pr-0" cols="8">
        <selected-controls class="my-3"></selected-controls>
        <action-table class="flex-grow-1"></action-table>
      </b-col>
      <b-col cols="4">
        <edit-action></edit-action>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import HeaderControls from '@/components/HeaderControls'
import ActionTable from '@/components/ActionTable'
import EditAction from '@/components/EditAction'
import SelectedControls from '@/components/SelectedControls'

const { ipcRenderer, remote } = require('electron')

export default {
  components: {
    HeaderControls,
    ActionTable,
    EditAction,
    SelectedControls
  },
  created () {
    ipcRenderer.on('SAVE_FILE', (event) => {
      if (this.$store.state.actions.filePath !== null) {
        this.$store.dispatch('SAVE_FILE')
      } else {
        this.SAVE_FILE_AS()
      }
    })
    ipcRenderer.on('SAVE_FILE_AS', (event) => {
      this.SAVE_FILE_AS()
    })
    ipcRenderer.on('UNDO_HISTORY', (event) => {
      this.$store.dispatch('UNDO_HISTORY')
    })
    ipcRenderer.on('REDO_HISTORY', (event) => {
      this.$store.dispatch('REDO_HISTORY')
    })
  },
  methods: {
    SAVE_FILE_AS () {
      remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
        filters: [
          { name: 'Custom File Type', extensions: ['json'] }
        ]
      }).then(({ filePath }) => {
        this.$store.dispatch('SAVE_FILE_AS', { filePath })
      })
    }
  }
}
</script>
