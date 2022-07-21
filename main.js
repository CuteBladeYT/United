// Modules to control application life and create native browser window
const electron = require("electron");
const { app, BrowserWindow, BrowserView } = require("electron");
const path = require("path");
const fs = require("fs");

const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const sound_play = require("sound-play");

// API modules
const network_speed = require("network-speed");
const loudness = require("loudness");
const system_info = require("systeminformation");

const SOCKET_LOCALHOST_PORT = 3000;
const SOCKET_LOCALHOST = `localhost:${SOCKET_LOCALHOST_PORT}`;

let settings_raw = fs.readFileSync("storage/system/settings.mjs", "utf-8");
settings_raw = settings_raw.slice(21, settings_raw.length);
let settings = "";
settings_raw.split("\n").forEach(line => {
  if (line.match("//"))
    line = line.slice(0, line.indexOf("//"));
  if (line.match(": ")) {
    let ls = line.split(": ")[0];
    let ps = line.indexOf(ls.trimStart());
    ls = ls.slice(ps, ls.length);
    line = line.replace(ls, `"${ls}"`);
  };
  settings += `${line}\n`;
});
const experimental_mode = JSON.parse(settings).experimental_mode;
if (experimental_mode)
  console.warn(`Running in Nightly (experimental) mode`);
else console.log(`Running in normal mode`);

const expressapp = express();
const httpserver = http.Server(expressapp);
const io = socketio(httpserver);
expressapp.use(express.static("./"));
httpserver.listen(3000);

function createWindow() {
  let iconname = "icon";
  let iconext = "png";
  if (experimental_mode) iconname = "nightly";
  switch (process.platform) {
    case "win32":
      iconext = "ico";
      break;
    case "darwin":
      iconext = "icns";
      break;
  };
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: `storage/system/icns/${iconname}.${iconext}`,
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`http://${SOCKET_LOCALHOST}/`);
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setFullScreen(true);

  io.on("connection", async (socket) => {
    socket.on("getFPS", (channel) => {
      socket.emit(channel, mainWindow.webContents.getFrameRate());
    });

    socket.on("screenshot", () => {
      mainWindow.webContents.capturePage().then(img => {
        let date = new Date();
        let d = date.getDate();
        let dof = date.getDay();
        let mo = date.getMonth();
        let y = date.getFullYear();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        let ms = date.getMilliseconds();
    
        if (d.toString().length == 1) d = "0" + d;
        if (mo.toString().length == 1) mo = "0" + mo;
        if (h.toString().length == 1) h = "0" + h;
        if (m.toString().length == 1) m = "0" + m;
        if (s.toString().length == 1) s = "0" + s;

        if (!fpath) fpath = `storage/user/images/screenshots/${d}-${mo}-${y}_${h}-${m}-${s}-${ms}.png`;
        else {
          if (fpath.startsWith("./")) {
            fpath.replace("./", "storage/user/images/screenshots/");
          };
          if (fpath.match(".")) fpath.replace(".", "_");
          if (!fpath.endsWith(".png" || ".jpg" || ".jpeg")) fpath += ".png";
        };

        filenameForbiddenNames.forEach(fn => {
          if (fpath.match(fn)) fpath = fpath.replace(fn, "_");
        });

        fs.writeFile(fpath, img.toPNG(), (err) => {
          if (err) throw err;
        });
      });
    });

    socket.on("reload", () => mainWindow.reload());
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// CONSTS
const filenameForbiddenNames = [
  "\\", "<", ">", ":", ";", "\"", "'", "|", "?", "*",
  "CON", "PRN", "AUX", "NUL", "COM1", "COM2", "COM3", "COM4",
  "COM5", "COM6", "COM7", "COM8", "COM9", "LPT1", "LPT2",
  "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9"
];

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.setName("United");

  app.on("activate", function () {
    // On macOS it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it"s common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

io.on("connection", async (socket) => {
  socket.leaveAll();
  socket.join();

  socket.on("quit", () => app.quit());

  socket.on("save_string_to_file", async (patht = String, data = String) => {
    let err = fs.writeFileSync(patht, data);
    if (err) throw err;
  });

  socket.on("read_file", async (patht = String, return_channel = String) => {
    let data = fs.readFileSync(patht, "utf-8");
    socket.emit(return_channel, data);
  });

  socket.on("save_settings", async (settings = {} || String) => {
    let data = `export let settings = ${JSON.stringify(settings)}`;
    let err = fs.writeFileSync("storage/system/settings.mjs", data);
    if (err) throw err;
  });

});
