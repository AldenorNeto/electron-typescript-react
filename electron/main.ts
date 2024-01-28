import { app, BrowserWindow, ipcMain, Tray } from 'electron'

let mainWindow: BrowserWindow | null
let tray: Tray | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow () {
  mainWindow = new BrowserWindow({
    icon: './assets/ibrain.png',
    width: 1100,
    height: 700,
    show: false,
    frame: false,
    transparent: true,
    resizable: false,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.minimize();
}

function createTray () {
  tray = new Tray('./assets/ibrain.png');

  tray.setToolTip('Meu App Tray');

  tray.on('click', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      } else {
        mainWindow.minimize();
      }
    }
  });
}


async function registerListeners () {
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })
}

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('ready', createTray)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
    createTray()
  }
})
