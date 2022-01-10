const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question('Enter Your Number: ', (number) => {
    for(i=1;i<=12;i++){
    console.log("%d x %d = %d",number,i,number*i);
    rl.close();
    }
  });