// Import required modules
const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

let fetch;

(async () => {
    if (!fetch) {
        fetch = (await import('node-fetch')).default;
    }
})();


ipcMain.on('fetch-userscript', async (event) => {
    const scriptUrl = 'https://github.com/snowyivu/ShinyColors/raw/gh-pages/ShinyColors.user.js';
    try {
        const response = await fetch(scriptUrl);
        if (response.ok) { // Check if the response is successful
            const scriptContent = await response.text();
            event.sender.send('userscript-fetched', scriptContent);
        } else {
            console.error('Failed to fetch the userscript:', response.statusText);
            event.sender.send('userscript-fetch-error', 'Failed to fetch the userscript');
        }
    } catch (error) {
        console.error('Error fetching the userscript:', error);
        event.sender.send('userscript-fetch-error', error.message);
    }
});

async function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'game.preload.js'),
            contextIsolation: false, // <-- set to false for main window too
            nodeIntegration: false,
            webviewTag: true,
        },
    });


win.loadFile('app.html');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});