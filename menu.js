const {BrowserWindow} = require('electron')
let win = new BrowserWindow({show: false})
win.once('ready-to-show', () => {
  win.show()
})