const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

let hands = data.trim().split('\n');
for(let i=0;i<hands.length;i++){
    hands[i] = hands[i].split(' ');
}
let findType = (str) => {
    let map = {};
    for(let i=0;i<str.length;i++){
        map[str[i]]= (map[str[i]] || 0)+1;
    }
    let arr = [];
    for(let key in map){
        arr.push(map[key]);
    }
    arr.sort((a,b)=>b-a);
    if(arr[0] === 5){
        return 7;
    }
    if(arr[0] === 4){
        return 6;
    }
    if(arr[0] === 3 && arr[1] === 2){
        return 5;
    }
    if(arr[0]=== 3){
        return 4;
    }
    if(arr[0] === 2 && arr[1] === 2){
        return 3;
    }
    if(arr[0]===2){
        return 2;
    }
    return 1;
}
let strength = {
    'A':13,
    'K':12,
    'Q':11,
    'J':10,
    'T':9,
    '9':8,
    '8':7,
    '7':6,
    '6':5,
    '5':4,
    '4':3,
    '3':2,
    '2':1
}

let compare = (a, b)=>{
    a = a[0];
    b = b[0];
    let diff = findType(a) - findType(b);
    if(diff === 0){
        for(let i=0;i<5;i++){
            let diff2 = strength[a[i]]-strength[b[i]];
            if(diff2 !==0){
                return diff2;
            }
        }
    }
    return diff;
    
}

hands.sort(compare);
let res = 0;
for(let i=0;i<hands.length;i++){
    res+=hands[i][1]*(i+1);
}
console.log('res', res);

