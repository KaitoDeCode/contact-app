const { existsSync, mkdirSync, writeFileSync, readFileSync,readFile,writeFile } = require('fs');
const { stdin, stdout, env } = require('process');
const {createInterface,} = require('readline');
const validator  = require('validator');
const DIR_PATH = './data'
const DATA_PATH = `${DIR_PATH}/contacts.json`
const rl = createInterface({
    input: stdin,
    output: stdout
})

 if (!existsSync(DIR_PATH)) mkdirSync('./data') 

 if (!existsSync(DATA_PATH)){
    writeFileSync(DATA_PATH,'[]','utf-8')
 }

function pertanyaan (pertanyaan,){
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan,(params)=>{resolve(params)})
    })
}

const simpanContact = (name,email,noHp) =>{
    console.log("Terima Kasih sudah mengisi")
            const jsonFile =  readFileSync(DATA_PATH)
            const contacts = JSON.parse(jsonFile)
            contacts.push({name,email,noHp})
            writeFileSync(DATA_PATH,JSON.stringify(contacts))
            rl.close()
}

module.exports = {simpanContact,pertanyaan}