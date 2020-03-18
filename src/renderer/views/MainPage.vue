<template>
  <main class="main-page d-flex flex-column">
    <header-controls class="flex-shrink-0"></header-controls>
    <b-row no-gutters class="flex-grow-1">
      <b-col cols="8" class="d-flex flex-column">
        <selected-controls></selected-controls>
        <action-table class="flex-grow-1"></action-table>
      </b-col>
      <b-col cols="4">
        <edit-action></edit-action>
      </b-col>
    </b-row>
  </main>
</template>

<script>
import HeaderControls from '@/components/HeaderControls'
import ActionTable from '@/components/ActionTable'
import EditAction from '@/components/EditAction'
import SelectedControls from '@/components/SelectedControls'

const { ipcRenderer, remote } = require('electron')
const { basename } = require('path')
const customTitleBar = require('custom-electron-titlebar')
const mousetrap = require('mousetrap')

const titleBar = new customTitleBar.Titlebar({
  backgroundColor: customTitleBar.Color.fromHex('#3C3C3C'),
  icon: require('@/assets/images/24x24.png')
})

export default {
  metaInfo () {
    return {
      title: this.title,
      titleTemplate: '%s - Squeak'
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

    // TODO: Refactor all commands out of created()
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

    // Keyboard shortcuts which Chrome overrides
    ipcRenderer.on('CUT_ACTION', this.CUT_ACTION)
    ipcRenderer.on('COPY_ACTION', this.COPY_ACTION)
    ipcRenderer.on('PASTE_ACTION', this.PASTE_ACTION)
    ipcRenderer.on('SELECT_ALL', this.SELECT_ALL)

    // Also handle using mousetrap
    mousetrap.bind(['command+x', 'ctrl+x'], this.CUT_ACTION)
    mousetrap.bind(['command+c', 'ctrl+c'], this.COPY_ACTION)
    mousetrap.bind(['command+v', 'ctrl+v'], this.PASTE_ACTION)
    mousetrap.bind(['command+a', 'ctrl+a'], this.SELECT_ALL)
  },
  methods: {
    updateTitle () {
      this.titleBar.updateTitle(`${this.title || 'Untitled'} - Squeak`)
    },
    confirmUnsavedChanges (callback) {
      // If there are no unsaved changes
      if (this.$store.state.actions.history.saved) {
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
        title: 'Squeak',
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
        defaultPath: remote.app.getPath('documents'),
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
        defaultPath: remote.app.getPath('documents'),
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
    },
    CUT_ACTION () {
      this.$store.dispatch('COPY_ACTION')
      this.$store.dispatch('DELETE_ACTION')
      return false
    },
    COPY_ACTION () {
      this.$store.dispatch('COPY_ACTION')
      return false
    },
    PASTE_ACTION () {
      this.$store.dispatch('PASTE_ACTION')
      return false
    },
    SELECT_ALL () {
      this.$store.dispatch('SELECT_ALL')
      return false
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
