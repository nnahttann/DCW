let net = require('net')
const HOST = '127.0.0.1'
const PORT = '12345'
let client = new net.Socket()



client.connect(PORT,HOST,function(){
    console.log('Connected!');
});

client.on("data",(data)=>{
    console.log(data+"");

    client.destroy();
}
);