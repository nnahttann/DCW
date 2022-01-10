// const score = 50;
// if (score >= 80) {
//     console.log('A');
// }else if (score >= 70) {
//     console.log('B')
// }else if (score >= 60) {
//     console.log('C')
// }else if (score >= 50){
//     console.log('D');
// }else{
//     console.log('E');
// }
// console.log(score.toString().trim());
// process.stdout.write(score.toString().trim());

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question('Enter Your score: ', (Score) => {
    if (Score >= 80 && Score<=100) {
        console.log('Your score %d is grade A',Score);
        rl.close();
    }else if (Score >= 75&&Score<80) {
        console.log('Your score %d is grade B+',Score);
        rl.close();
    }else if (Score >= 70&&Score<80) {
        console.log('Your score %d is grade B',Score);
        rl.close();
    }else if (Score >= 65&&Score<70) {
        console.log('Your score %d is grade C+',Score);
        rl.close();
    }else if (Score >= 60&&Score<70) {
        console.log('Your score %d is grade C',Score);
        rl.close();
    }else if (Score >= 65&&Score<60) {
        console.log('Your score %d is grade D+',Score);
        rl.close();
    }else if (Score >= 50&&Score<60){
        console.log('Your score %d is grade D',Score);
        rl.close();
    }else if (Score >= 0 &&Score<50){
        console.log('Your score %d is grade E',Score);
        rl.close();
    }else{
        console.log('Your score is wrong,Try again!!');
        rl.close();
    }
  });