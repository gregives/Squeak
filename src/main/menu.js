const { shell } = require('electron')
const isMac = process.platform === 'darwin'

function createMenu (window) {
  return [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    {
      label: 'File',
      submenu: [
        {
          label: 'New File',
          accelerator: 'CmdOrCtrl+N',
          click () {
            window.webContents.send('NEW_FILE')
          }
        },
        {
          label: 'Open File...',
          accelerator: 'CmdOrCtrl+O',
          click () {
            window.webContents.send('OPEN_FILE')
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click () {
            window.webContents.send('SAVE_FILE')
          }
        },
        {
          label: 'Save As...',
          accelerator: 'CmdOrCtrl+Shift+S',
          click () {
            window.webContents.send('SAVE_FILE_AS')
          }
        },
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          click () {
            window.webContents.send('UNDO_HISTORY')
          }
        },
        {
          label: 'Redo',
          accelerator: 'CmdOrCtrl+Y',
          click () {
            window.webContents.send('REDO_HISTORY')
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          click () {
            window.webContents.send('CUT_ACTION')
          }
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          click () {
            window.webContents.send('COPY_ACTION')
          }
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          click () {
            window.webContents.send('PASTE_ACTION')
          }
        }
      ]
    },
    {
      label: 'Selection',
      submenu: [
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          click () {
            window.webContents.send('SELECT_ALL')
          }
        }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () {
            return shell.openExternal('https://github.com/gregives/Squeak')
          }
        }
      ]
    }
  ]
}

export {
  createMenu
}
