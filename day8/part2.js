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

let currs = [];
for(let key in map){
    if(key[2] === 'A'){
        currs.push(key);
    }
}


function gcd(a, b) { 
    for (let temp = b; b !== 0;) { 
        b = a % b; 
        a = temp; 
        temp = b; 
    } 
    return a; 
} 
  
function lcm(a, b) { 
    const gcdValue = gcd(a, b); 
    return (a * b) / gcdValue; 
}
let n = sequence.length;


let findSteps = (str) =>{
    let steps = 0;
    while(str[2] !== 'Z'){
        let index = steps%n;
        let dir;
        if(sequence[index] === 'R'){
            dir = 1;
        } else {
            dir = 0;
        }
        str = map[str][dir];
        steps++;
    }
    console.log('str', str);
    return steps;
}

let steps = [];
for(let i=0;i<currs.length;i++){
    steps.push(findSteps(currs[i]));
}
console.log('steps', steps);

let res = steps[0];
for(let i=1;i<steps.length;i++){
    res = lcm(steps[i], res)
}
console.log('res', res);