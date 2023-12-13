const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

let sequences = data.trim().split('\n');
let isDone = (arr) =>{
    for(let i=1;i<arr.length;i++){
        if(arr[i]!==arr[i-1]){
            return false;
        }
    }
    return true;
}
let res = 0;
for(let s of sequences){
    let sequence = s.split(' ');
    let lasts = [Number(sequence[sequence.length-1])];
    while(!isDone(sequence)){
        let next = [];
        for(let i=1;i<sequence.length;i++){
            next.push(sequence[i]-sequence[i-1]);
        }
        lasts.push(next[next.length-1])
        sequence = next;
    }
    res+=lasts.reduce((curr, accum)=>curr+accum);
}

console.log('res', res);