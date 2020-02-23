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

const { ipcRenderer } = require('electron')
const { writeFile } = require('fs')

export default {
  components: {
    HeaderControls,
    ActionTable,
    EditAction,
    SelectedControls
  },
  created () {
    ipcRenderer.on('SAVE_FILE_AS', (event, { filePath }) => {
      const contents = JSON.stringify(this.$store.state.actions, null, 2)
      writeFile(filePath, contents, (error) => {
        console.log(error ? 'Failed to save' : 'Saved successfully')
      })
    })
  }
}
</script>
