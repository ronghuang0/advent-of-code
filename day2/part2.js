var fs = require('fs');

var data = fs.readFileSync('input.txt', 'utf8');
var arr = data.trim().split(/\r?\n|\r|\n/g);
let hash = {
    'red': 12,
    'green': 13,
    'blue': 14
}
let res = 0;
for(let i=0;i<arr.length;i++){
    let str = arr[i].split(';');
    let colon = str[0].indexOf(':');
    str[0]=str[0].slice(colon+1);
    str.forEach((e,i)=>{
        str[i]=e.split(',');
        str[i].forEach((f,j)=>{
            str[i][j]=f.trim().split(' ');
        })
    })
    let map = {
        'red': 0,
        'green': 0,
        'blue': 0,
    }
    for(let a of str){
        for(let b of a){
            let [num, color] = b;
            map[color] = Math.max(map[color], Number(num));
        }
    }
    res+= map['red']*map['green']*map['blue'];
    console.log('res', res);
    console.log('str', str);
}