const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

let lines = data.trim().split('\r\n');
let res = 0;
for(let line of lines){
    let digits = [];
    for(let char of line){
        if(!isNaN(char)){
            digits.push(char);
        }
    }
    res += Number(digits[0]+digits[digits.length-1]);
}
console.log('res', res);