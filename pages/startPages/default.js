const { ipcRenderer, shell } = require('electron')

ipcRenderer.send('app', {type: "getLang"})

ipcRenderer.on('getLang', (event, arg) => {
    document.getElementById(`lang-${arg}`).setAttribute('selected', 'selected')
})

function openGitHub() {
    shell.openExternal("https://github.com/Bukgeuk/BGlauncher")
}

function languageSelect() {
    let target = document.getElementById('languageSelectBox')
    ipcRenderer.send('app', {type: "setLang", data: target.options[target.selectedIndex].value})
}