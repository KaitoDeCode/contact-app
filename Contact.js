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

const getDataJson=()=>{
    const jsonFile =  readFileSync(DATA_PATH)
    return JSON.parse(jsonFile)
}

const listContact = () =>{
    const contacts = getDataJson()
    console.log(chalk.bgBlue.white.bold( `Daftar Contact`))
    contacts.forEach((contact,i) => {
        console.log(`${i+1}. ${contact.nama} ===> ${contact.noHp}`)
    });
}

const detailContact = (nama) =>{
    const contacts = getDataJson()
    const contact = contacts.find((person)=> person.nama === nama)
    
    if (!contact) {
        console.log(chalk.bgRed.white.bold( `Detail Contact dengan ${nama} tidak ditemukan`))
        
    }else{

    console.log(chalk.bgYellow.white.bold( `Detail Contact`))
    contacts.forEach((contact,i) => {
        if (contact.nama === nama) {
            console.log(`Contact ke-${i+1} \n Nama ==> ${contact.nama} \n Nomor Hape ==> ${contact.noHp} \n Email ==> ${contact.email}`)
        }
    });
}
}

const removeContact=(nama)=>{
    const contacts = getDataJson()
    const remove = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())


    
    if(contacts.length === remove.length){
        console.log(chalk.bgRed.white.bold( `Contact dengan ${nama} tidak ditemukan`))
        return false;
    }
    writeFileSync(DATA_PATH, JSON.stringify(remove),'utf-8')
    console.log(chalk.bgYellow.white.bold( `Contact dengan ${nama} berhasil dihapus`))

}

const simpanContact = (nama,email,noHp) =>{
    const contact={nama,email,noHp}
    const contacts = getDataJson()
            
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

module.exports = {simpanContact,listContact,detailContact,removeContact}