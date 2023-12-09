const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

let sequence = 'LRRRLLRLLRRLRLRRRLRLRRRLRRLLRRRLRRLRLLRLLRRLRLLLLRRLRRLRLLRRLRRRLLLRRLRLRRLRRRLRRRLLRLRRRLLRRLRRRLRRLRLRRLRRLLRLRLRRRLRRLRRLRRRLRRLRRLRLRRRLRRRLRRRLLLRLRRLRLRRRLRRRLRRLRRLLRLRRLLRRLLRLRRLRLRRLRRRLRLRRLRLRRRLLRRLLRLRRRLRRRLRRRLRRRLLLRLRRLRRRLRRRLRLLRRLLRRLRLRLLRRLRRLLRRRLRLRRRLRRRR';

let arr = data.split('\n');
let map = {}
for(let i=0;i<arr.length;i++){
    let [a,b] = arr[i].split('=');
    a = a.trim();
    map[a]=[b.slice(2,5),b.slice(7,10)];
}

let steps = 0;
let curr = 'AAA';
let n = sequence.length;
while(curr !== 'ZZZ'){
    let index = steps%n;
    let dir;
    if(sequence[index] === 'R'){
        dir = 1;
    } else {
        dir = 0;
    }
    curr = map[curr][dir];
    steps++;
}
console.log('steps', steps);