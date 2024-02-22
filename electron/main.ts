import { BrowserWindow, Tray, app, ipcMain, screen } from 'electron'

let mainWindow: BrowserWindow | null
let tray: Tray | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    icon: './assets/ibrain.png',
    show: false,
    frame: false,
    transparent: true,
    // resizable: false,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.setBounds({
    x: width - 300,
    y: height - 300,
    width: 250,
    height: 350,
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  setInterval(() => {
    if (mainWindow) {
      if (!mainWindow.isFocused()) {
        // mainWindow.minimize()
      }
    }
  }, 1000)

  mainWindow.minimize()
}

function createTray() {
  tray = new Tray('./assets/ibrain.png')

  tray.setToolTip('IBRAIN')

  tray.on('click', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore()
      } else {
        mainWindow.minimize()
      }
    }
  })
}

async function registerListeners() {
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch((e) => console.error(e))

app
  .on('ready', createTray)
  .whenReady()
  .then(registerListeners)
  .catch((e) => console.error(e))

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
