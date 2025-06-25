const { ipcRenderer } = require('electron');

// Only inject userscript if on the game URL
function isGameUrl() {
    return location.hostname === 'shinycolors.enza.fun';
}

// Listen for the userscript content from main process
ipcRenderer.on('userscript-fetched', (event, scriptContent) => {
    if (!isGameUrl()) return;
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

ipcRenderer.send('fetch-userscript');