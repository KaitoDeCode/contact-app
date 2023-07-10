const chalk = require('chalk');

const { existsSync, mkdirSync, writeFileSync, readFileSync,readFile,writeFile } = require('fs');
const {createInterface,} = require('readline');
const validator  = require('validator');
const DIR_PATH = './data'
const DATA_PATH = `${DIR_PATH}/contacts.json`

 if (!existsSync(DIR_PATH)) mkdirSync('./data') 

 if (!existsSync(DATA_PATH)){
    writeFileSync(DATA_PATH,'[]','utf-8')
 }

function pertanyaan (pertanyaan,){
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan,(params)=>{resolve(params)})
    })
}

const simpanContact = (nama,email,noHp) =>{
    const contact={nama,email,noHp}
    const jsonFile =  readFileSync(DATA_PATH)
            const contacts = JSON.parse(jsonFile)
            
            const duplikat = contacts.find((person) => person.nama === nama)
            if(duplikat){ 
                console.log(chalk.red.inverse.bold(`Contact dengan nama ${nama} sudah digunakan,carilah nama lain`))
                return false
            }
            
            if(!validator.isEmail(email)){
                console.log(chalk.red.inverse.bold(`Email yang anda berikan tidak valid`))
                return false
            }

            if(!validator.isMobilePhone(noHp,'id-ID')){
                console.log(chalk.red.inverse.bold(`Nomor Hp tidak valid`))
                return false
            }
            
            console.log(chalk.green.inverse.bold( "Terima Kasih sudah mengisi"))
           contacts.push(contact)            
            writeFileSync(DATA_PATH,JSON.stringify(contacts))
            // rl.close()
}

module.exports = {simpanContact}