<template>
  <b-row no-gutters class="main-page">
    <b-col class="d-flex flex-column" cols="8">
      <header-controls class="flex-shrink-0"></header-controls>
      <selected-controls></selected-controls>
      <action-table class="flex-grow-1"></action-table>
    </b-col>
    <b-col cols="4">
      <edit-action></edit-action>
    </b-col>
  </b-row>
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
  backgroundColor: customTitleBar.Color.fromHex('#3C3C3C'),
  icon: require('@/assets/images/24x24.png')
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
      this.confirmUnsavedChanges((response) => {
        if (response) {
          this.$store.dispatch('NEW_FILE')
        }
      })
    })
    ipcRenderer.on('OPEN_FILE', (event) => {
      this.confirmUnsavedChanges((response) => {
        if (response) {
          this.OPEN_FILE()
        }
      })
    })
    ipcRenderer.on('SAVE_FILE', (event) => {
      this.SAVE_FILE()
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
    confirmUnsavedChanges (callback) {
      // If there are no unsaved changes
      if (this.$store.state.actions.history.saved || this.$store.state.actions.history.states.length === 0) {
        callback(true)
        return
      }

      // Show unsaved changes confirmation dialog
      remote.dialog.showMessageBox(remote.getCurrentWindow(), {
        type: 'warning',
        buttons: [
          'Save',
          'Don\'t Save',
          'Cancel'
        ],
        title: 'AutoClicker',
        message: `Do you want to save the changes you made to ${this.title}?`,
        details: 'Your changes will be lost if you don\'t save them.',
        noLink: true
      }).then(({ response }) => {
        if (response === 0) {
          this.SAVE_FILE(() => {
            callback(response !== 2)
          })
        } else {
          callback(response !== 2)
        }
      })
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
    SAVE_FILE (callback) {
      if (this.$store.state.actions.filePath !== null) {
        this.$store.dispatch('SAVE_FILE')
        callback()
      } else {
        this.SAVE_FILE_AS(callback)
      }
    },
    SAVE_FILE_AS (callback) {
      remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
        filters: [
          { name: 'Custom File Type', extensions: ['json'] }
        ]
      }).then(({ filePath }) => {
        if (filePath) {
          this.$store.dispatch('SAVE_FILE_AS', { filePath })
          callback()
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
.menubar-menu-container
  .action-menu-item
    height: 2.15em

  .menu-item-icon
    margin: 0
</style>
