const {simpanContact,pertanyaan} = require('./Contact');

const main = async()=>{
    const name = await pertanyaan('Masukan nama : ')
    const email = await pertanyaan('Masukan Email : ')
    const noHp = await pertanyaan('Masukan nomor hp : ')
    simpanContact(name,email,noHp)
}

main()