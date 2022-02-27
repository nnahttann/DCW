let net = require('net') //module net
const HOST = '127.0.0.1'
const PORT = '6969'
let i = 0
let user = RegExp('[0-9]{2}35512[0-9]{3}', 'i') // recommend by Jack

net.createServer((sock) => {

    console.log(`Connected : ${sock.remoteAddress}: ${sock.remotePort}`)
    let random = Math.floor(Math.random() * 21);
    let rand = parseInt(random)
    console.log(`Random Number : ${rand}`)
    sock.on('data', (data) => {
        if (i < 6)
            console.log(`Data[${i}]: ${data} form ${sock.remotePort}`)
        if (i === 0) {
            let numInt = parseInt(data)
            //if(isNaN(numInt) === false && data.length === 10){
            if (user.test(data.toString())) {
                sock.write('OK')
            }
            else {
                sock.end('Wrong username')
            }
        }
        else if (i > 5) {
            sock.end('END')
        }
        else {
            if (data.toString() === rand.toString()) {
                sock.end('BINGO')
            }
            else {
                sock.write('WRONG')
            }
        }
        i++
    })
    sock.on('close', (data) => { //event close
        i = 0
        console.log('Colse connection')
    })
    sock.on('error', (err) => console.log(`${err}`))

}).listen(PORT, HOST)
console.log(`server start: ${HOST}:${PORT}`)