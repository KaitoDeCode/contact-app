const yargs = require('yargs');
const { simpanContact,listContact,detailContact,removeContact} = require('./Contact');

yargs.command({
    command:'add',
    describe:'Menambahkan data baru',
    builder:{
        nama:{
            describe: 'Nama anda?',
            demanOption:true,
            type: 'string'
        },
        email:{
            describe: 'Email anda ?',
            demandOption: true,
            type: 'string'
        },
        noHp:{
            describe: 'Nomor hp anda ?',
            demandOption: true,
            type: 'string'
        }
    },
        handler(argv){
            const contact = {
                nama: argv.nama,
                email: argv.email,
                noHp: argv.noHp
            }
            const {nama,email,noHp} = contact
        simpanContact(nama,email,noHp)
    }
}).demandCommand()


yargs.command({
    command:'list',
    describe:'Menampilkan contact',
    handler(){
        listContact()
    }
})

yargs.command({
    command:'detail',
    describe:'Menampilkan detail person contact',
    builder:{
        nama:{
            describe: 'Nama anda?',
            demanOption:true,
            type: 'string'
        }
    },
    handler(argv){
        detailContact(argv.nama)
    }
}).demandCommand()

yargs.command({
    command:'remove',
    describe:'Menghapus deta person contact',
    builder:{
        nama:{
            describe: 'Nama anda?',
            demanOption:true,
            type: 'string'
        }
    },
    handler(argv){
        removeContact(argv.nama)
    }
}).demandCommand()


yargs.parse()
// const {simpanContact,pertanyaan} = require('./Contact');

// const main = async()=>{
//     const name = await pertanyaan('Masukan nama : ')
//     const email = await pertanyaan('Masukan Email : ')
//     const noHp = await pertanyaan('Masukan nomor hp : ')
//     simpanContact(name,email,noHp)
// }

// main()