// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const ipc = require('electron');
 var buttonEl=document.getElementById('process')
  buttonEl.onClick(function(){
        ipc.send('show-processor-window')
  })