const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

let lines = data.trim().split('\r\n');
let res = 0;
let nums = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
for(let line of lines){
    let re = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g;
    let digits = [...line.matchAll(re)].map(e=>e[1]);
    digits = digits.map(e=>{
        if(!isNaN(e)){
            return e;
        }
        return String(nums.indexOf(e));
    });
    res += Number(digits[0] + digits[digits.length-1]);
}
console.log('res', res);