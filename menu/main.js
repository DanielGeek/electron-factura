
console.log('main process working');

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu

const path = require("path");
const url = require("url");

let win;

const template = [
    {
    label: '1. Factura',
    submenu: [  
      
    ]
  },
  {
    label: '2. Notas creditos',
    submenu: [
     
    ]
  },
  {
    label: '3. Notas debitos',
    submenu: [

    ]
  },
  {
    label: '4. Configurar',
    submenu: [

    ]
  },
  {
    label: 'Ventana',
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  },
  {
    label: 'Ayuda',
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electron.atom.io') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })

  // Edit menu
  // template[1].submenu.push(
  //   {type: 'separator'},
  //   {
  //     label: 'Speech',
  //     submenu: [
  //       {role: 'startspeaking'},
  //       {role: 'stopspeaking'}
  //     ]
  //   }
  // )

  // Window menu
  // template[3].submenu = [
  //   {role: 'close'},
  //   {role: 'minimize'},
  //   {role: 'zoom'},
  //   {type: 'separator'},
  //   {role: 'front'}
  // ]
}



function createWindow() {
    win = new BrowserWindow();
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('active', () => {
    if(win === null) {
        createWindow()
    }
});