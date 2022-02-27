let net = require('net') //module net
let HOST = "0.0.0.0"
let PORT = '12345'
// const a = function(){
//     console.log('Hello')
// }
let sever = net.createServer((sock)=>{
    console.log(`Icoming client ${sock.remoteAddress} ${sock.remotePort}`)
    sock.write("Hii")
    sock.on("data",(data)=>console.log("Get data:"))
    sock.on("error",()=>console.log("Error"));
})
sever.listen(PORT,HOST);
console.log(`Connected: ${HOST}:${PORT}`);