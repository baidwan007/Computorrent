// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const ipc = require('electron').ipcMain
const express=require('express')
// const ipc=require('ipc').ipcMain

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createMainWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: 'preload.js',
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function createProcessorWindow(){
  processorWindow=new BrowserWindow({
    width: 500,
    height: 500,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  processorWindow.loadFile('window/processorWindow.html')
  return processorWindow
}

function createSubmitterWindow(){
  submitterWindow=new BrowserWindow({
    width: 500,
    height: 500,
    show: false
  })
  submitterWindow.loadFile('window/submitterWindow.html')
  return submitterWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
  createMainWindow();
  var processorWindow=createProcessorWindow();
  var submitterWindow=createSubmitterWindow();
  ipc.on('show-processor-window',function(){
    console.log("hi")
      processorWindow.show();
  })
  ipc.on('show-submitter-window',function(){
      submitterWindow.show();
  })
  ipc.on('start-express',function(){
    console.log("in express shit")
      var app=express();
      app.get('/',function(req,res)
      {
      res.send('Hello World!');
      });
      var server=app.listen(3000,function() {});
      console.log(server)
                            })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
