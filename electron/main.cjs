const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

const DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 900,
    height: 650,
    minWidth: 720,
    minHeight: 520,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    void shell.openExternal(url);
    return { action: 'deny' };
  });

  if (DEV_SERVER_URL) {
    void win.loadURL(DEV_SERVER_URL);
    win.webContents.openDevTools({ mode: 'detach' });
    return;
  }

  void win.loadFile(path.join(__dirname, '../dist/index.html'));
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
