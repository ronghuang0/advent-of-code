var fs = require('fs');

var data = fs.readFileSync('input.txt', 'utf8');
var arr = data.trim().split(/\r?\n|\r|\n/g);
let map = {
    'one': '1',
    'two': '2',
    'three':'3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}
let findCode = (str)=>{
    let first=1000;
    let last = -1;
    let firstAlpha;
    let lastAlpha;
    for(let n in map){
        let pos = str.indexOf(n);
        if(pos !== -1){
            if(pos < first){
                first = pos;
                firstAlpha = map[n];
            }
        }
        pos = str.lastIndexOf(n);
        if(pos !== -1){
            if(pos > last){
                last = pos;
                lastAlpha = map[n];
            }
        }
    }
    for(let i=0;i<str.length;i++){
        if(!isNaN(str[i])){
            if(i<first){
                firstAlpha = str[i];
            }
            break;
        }
    }
    for(let i=str.length-1;i>=0;i--){
        if(!isNaN(str[i])){
            if(i>last){
                lastAlpha = str[i];
            }
            break;
        }
    }
    console.log('firstAlpha', firstAlpha);
    console.log('lastAlpha', lastAlpha);
    return Number(firstAlpha+lastAlpha);
}
let res = 0;
for(let i=0;i<arr.length;i++){
    let num = findCode(arr[i]);
    
    console.log('num',num);
    res+=num;
}
console.log(res);