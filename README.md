# Shiny Colors English Viewer
A desktop Electron app for viewing and translating [ShinyColors Enza](https://shinycolors.enza.fun/) via userscript injection of [Shiny Colors English Patch](https://github.com/snowyivu/ShinyColors).

> **Note:** This project was initially created as a proof of concept, inspired by KanColle viewers like [poi](https://poi.moe/) ([GitHub](https://github.com/poooi/poi)), to explore providing a similar experience for Shiny Colors.

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run the app:**
   ```sh
   npx electron .
   ```
   or
   ```sh
   npm start
   ```

## Building in case you want to

The app uses [Electron Forge](https://www.electronforge.io/) for packaging and distribution.

### Package the app (without installer)
```sh
npm run package
```
This creates a packaged version of the app in the `out` folder without creating an installer.

### Build distributables
```sh
npm run make
```
This creates platform-specific distributables:
- **macOS**: `.zip` archive in `out/make/zip/darwin/`
- **Windows**: Squirrel installer in `out/make/squirrel.windows/`
- **Linux**: `.deb` and `.rpm` packages in `out/make/deb/` and `out/make/rpm/`

### Build for specific platforms
To build for a specific platform, you can use the `--platform` flag:
```sh
npx electron-forge make --platform=darwin   # macOS
npx electron-forge make --platform=win32    # Windows
npx electron-forge make --platform=linux    # Linux
```

**Note:** Cross-platform building may have limitations. For best results, build on the target platform.

## How it works

- Loads the game in a `<webview>` with a preload script.
- The main process fetches the latest userscript from GitHub.
- The preload script injects the userscript into the page as early as possible.

## File Structure

- `main.js` - Electron main process, handles window and userscript fetching.
- `app.html` - Main HTML file, contains the `<webview>`.
- `game.preload.js` - Preload script for the webview, injects the userscript.
