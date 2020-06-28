const { app, BrowserWindow, ipcMain, remote } = require('electron')
const ejse = require('ejs-electron')
const path = require('path')
const fs = require('fs')

const language = require('./functions/lang')

ejse.data({
    "sentence": JSON.parse(fs.readFileSync(`./assets/languages/${language.getLanguage()}.json`)),
    "version": JSON.parse(fs.readFileSync('./data/version.json')).version
    })

function createWindow() {
    let win = new BrowserWindow({
        width: 480,
        height: 490,
        resizable: false,
        title: 'Welcome to BGlauncher',
        show: false,
        icon: path.join(__dirname, 'assets', 'icon.ico'),
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.setMenu(null)
    
    win.loadFile('pages/startPages/default.ejs')

    win.show()
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('app', (event, arg) => {
    let win = BrowserWindow.getFocusedWindow()

    switch (arg.type) {
        case 'reload':
            win.reload()
            break
        case 'title':
            win.setTitle(arg.data)
            break
        case 'getLang':
            event.sender.send('getLang', language.getLanguage())
            break
        case 'setLang':
            language.setLanguage(arg.data)
            ejse.data({
                "sentence": JSON.parse(fs.readFileSync(`./assets/languages/${arg.data}.json`)),
                "version": JSON.parse(fs.readFileSync('./data/version.json')).version
            })
            win.reload()
            break
        // I'll add more cases later
    }
})

app.whenReady().then(createWindow)