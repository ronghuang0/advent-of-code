const fs = require('fs');
let data = fs.readFileSync('input.txt', 'utf8');
data = data.replace(/(\r\n|\n|\r)/gm, "");
let arr = data.trim().split(',');

let hash = (str) => {
    let res = 0;
    for(let s of str) {
        res+=s.charCodeAt(0);
        res*=17;
        res%=256;
    }
    return res;
}

let res = 0;
for(let a of arr){
    res+=hash(a);
}
console.log('res', res);

