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
    let firsts = [Number(sequence[0])];
    while(!isDone(sequence)){
        let next = [];
        for(let i=1;i<sequence.length;i++){
            next.push(sequence[i]-sequence[i-1]);
        }
        firsts.push(next[0])
        sequence = next;
    }
    let ex=firsts[firsts.length-1];
    for(let i=firsts.length-2;i>=0;i--){
        ex = firsts[i]-ex;
    }
    res+=ex;
}

console.log('res', res);