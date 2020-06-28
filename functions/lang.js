const fs = require('fs')
let language = {
    getLanguage() {
        let obj = fs.readFileSync('./data/language.json')
        obj = JSON.parse(obj)
        return obj.lang
    },
    getLanguages() {
        let obj = fs.readFileSync('./data/language.json')
        obj = JSON.parse(obj)
        return obj.langs
    },
    setLanguage(lang) {
        fs.writeFileSync('./data/language.json', JSON.stringify({lang: lang, langs: this.getLanguages()}))
    }
}

module.exports = language