let net = require('net')
const HOST = '127.0.0.1'
const PORT = '6969'
let client = new net.Socket()

client.connect(PORT, HOST, () => {
    console.log(`Connected: ${HOST}:${PORT}`)
    client.write('6135512060')
})

client.on('data', (data) => {
    let answer = Math.floor(Math.random() * 21);
    let ans = parseInt(answer)
    
    if (data.toString() === 'OK') {
        console.log(data.toString())

        client.write(ans.toString())
    }
    else if (data.toString() === 'END' || data.toString() === 'BINGO') {
        console.log(data.toString())
        client.destroy()
    }
    else if (data.toString() === 'WRONG') {
        console.log(data.toString())
        client.write(ans.toString())
    }
    else {
        console.log(data.toString())
    }
})
client.on('close', () => {
    console.log('Close connetion')
})