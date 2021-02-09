const { app} = require('electron');
const isDev = require('electron-is-dev');
const { join } = require('path');
const AppWindow = require('./src/AppWindow');

let mainWindow;

app.on('ready', () => {
    const urlLocation = isDev
        ? 'http://localhost:3000'
        : `file://${join(__dirname, './build/index.html')}`;
        

    mainWindow = new AppWindow(
        {
            width: 1200,
            height: 900
        },
        urlLocation
    );
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
