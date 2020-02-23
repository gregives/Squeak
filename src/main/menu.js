const { dialog, shell } = require('electron')
const isMac = process.platform === 'darwin'

export default function (window) {
  return [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    {
      label: 'File',
      submenu: [
        {
          label: 'Save As...',
          accelerator: 'CmdOrCtrl+Shift+S',
          click () {
            dialog.showSaveDialog(window, {
              filters: [
                { name: 'Custom File Type', extensions: ['json'] }
              ]
            }).then(({ filePath }) => {
              if (filePath) {
                window.webContents.send('SAVE_FILE_AS', { filePath })
              }
            })
          }
        },
        isMac ? { role: 'close' } : { role: 'quit' }
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
