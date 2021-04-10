/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build:main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
// import { HomeScreenSize } from './home';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let overlayWindows: Array<BrowserWindow> = [];

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 800,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  ipcMain.on('set-opacity', (event, opacity: number) => {
    event.preventDefault();
    overlayWindows.forEach((window: BrowserWindow) => {
      if (!window) {
        throw new Error('"overlayWindow" is not defined');
      } else {
        window.show();
        window.setOpacity(opacity);
        mainWindow?.focus();
      }
    });
  });

  ipcMain.on('show-overlays', () => {
    overlayWindows.forEach((window: BrowserWindow) => {
      window?.show();
    });
  });

  ipcMain.on('hide-overlays', () => {
    overlayWindows.forEach((window: BrowserWindow) => {
      window?.hide();
    });
  });

  ipcMain.on(
    'set-overlay-image',
    (event, imageAlt: string, imagePath: string) => {
      event.preventDefault();
      const overlayWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        webPreferences: {
          nodeIntegration: true,
          devTools: false,
        },
        transparent: true,
      });

      overlayWindows.push(overlayWindow);

      overlayWindow.loadURL(`file://${__dirname}/OverlayImage/index.html`);

      overlayWindow.webContents.on('did-finish-load', () => {
        overlayWindow.webContents.send('image', imageAlt, imagePath);
      });

      overlayWindow.once('ready-to-show', () => {
        overlayWindow.show();
        mainWindow?.focus();
      });
    }
  );

  ipcMain.on('close-overlay-windows', () => {
    overlayWindows.forEach((window) => {
      window?.close();
    });
    overlayWindows = [];
  });

  // ipcMain.on('change-window-size', (event, windowSize: HomeScreenSize) => {
  //   if (windowSize === HomeScreenSize.LARGE) {
  //     mainWindow?.setSize(1024, 800);
  //   } else {
  //     mainWindow?.setSize(800, 400);
  //   }
  // });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  overlayWindows.forEach((window) => {
    window.on('close', (event: SyntheticEvent) => {
      event.preventDefault();
      window?.hide();
    });
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
