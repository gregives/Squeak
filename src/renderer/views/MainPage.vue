<template>
  <b-container class="main-page d-flex flex-column" fluid>
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
const { basename } = require('path')
const customTitleBar = require('custom-electron-titlebar')

const titleBar = new customTitleBar.Titlebar({
  backgroundColor: customTitleBar.Color.fromHex('#3C3C3C')
})

export default {
  metaInfo () {
    return {
      title: this.title,
      titleTemplate: '%s - AutoClicker'
    }
  },
  components: {
    HeaderControls,
    ActionTable,
    EditAction,
    SelectedControls
  },
  data () {
    return {
      titleBar
    }
  },
  computed: {
    title () {
      const filePath = this.$store.state.actions.filePath
      if (filePath === null) {
        return 'Untitled'
      } else {
        return basename(filePath)
      }
    }
  },
  watch: {
    title () {
      this.updateTitle()
    }
  },
  created () {
    this.updateTitle()
    ipcRenderer.on('NEW_FILE', (event) => {
      this.$store.dispatch('NEW_FILE')
    })
    ipcRenderer.on('OPEN_FILE', (event) => {
      this.OPEN_FILE()
    })
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
    updateTitle () {
      this.titleBar.updateTitle(`${this.title || 'Untitled'} - AutoClicker`)
    },
    OPEN_FILE () {
      remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
        filters: [
          { name: 'Custom File Type', extensions: ['json'] }
        ]
      }).then(({ filePaths }) => {
        if (filePaths[0]) {
          this.$store.dispatch('OPEN_FILE', { filePath: filePaths[0] })
        } else {
          console.warn('No file selected')
        }
      })
    },
    SAVE_FILE_AS () {
      remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
        filters: [
          { name: 'Custom File Type', extensions: ['json'] }
        ]
      }).then(({ filePath }) => {
        if (filePath) {
          this.$store.dispatch('SAVE_FILE_AS', { filePath })
        } else {
          console.warn('No file selected')
        }
      })
    }
  }
}
</script>

<style lang="sass">
.main-page
  height: calc(100vh - 30px)

// Styles of custom titlebar
.menubar-menu-container .menu-item-icon
  margin: 0
</style>
