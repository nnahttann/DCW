let net = require('net') //module net
let HOST = "0.0.0.0"
let PORT = '12345'
let sum= 0;

let sever = net.createServer((sock)=>{
    console.log(`Icoming client ${sock.remoteAddress} ${sock.remotePort}`)
    //sock.write("Hii")

    sock.on("data",(data)=>{
        sum +=data;
        console.log("Get data:"+sum)
        sock.write(sum+"");
    });

    sock.on("close",(data)=>{
        console.log("Get data:"+data)
    });
    sock.on("error",()=>console.log("Error"));
})
sever.listen(PORT,HOST);
console.log(`Connected: ${HOST}:${PORT}`);