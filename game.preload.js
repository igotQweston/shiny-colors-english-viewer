// game.preload.js

const { ipcRenderer } = require('electron');

// Listen for the userscript content from main process
ipcRenderer.on('userscript-fetched', (event, scriptContent) => {
    // Inject as early as possible
    function inject() {
        const script = document.createElement('script');
        script.textContent = scriptContent;
        (document.head || document.documentElement).prepend(script);
    }
    if (document.head) {
        inject();
    } else {
        window.addEventListener('DOMContentLoaded', inject, { once: true });
    }
});

// Request the userscript as soon as possible
ipcRenderer.send('fetch-userscript');