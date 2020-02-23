const { shell } = require('electron')
const isMac = process.platform === 'darwin'

export default function (window) {
  return [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    {
      label: 'File',
      submenu: [
        {
          label: 'Open File...',
          accelerator: 'CmdOrCtrl+O',
          click () {
            window.webContents.send('OPEN_FILE')
          }
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
        }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () {
            return shell.openExternal('https://github.com/gregives/AutoClicker')
          }
        }
      ]
    }
  ]
}
