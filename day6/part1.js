const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

let [time, distance] = data.trim().split('\n').map(e=>([...e.matchAll(/\d+/g)].map(v=>v[0])));

let res = 1;
for(let i=0;i<time.length;i++){
    let count = 0;
    for(let t=1;t<=time[i];t++){
        if(t*(time[i]-t) > distance[i]){
            count++;
        }
    }
    res *= count;
}
console.log('res', res);