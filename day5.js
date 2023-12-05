const fs = require('fs');
const data = fs.readFileSync('input5.txt', 'utf8');

let [seeds, ...blocks] = data.split('\r\n\r\n');
seeds = seeds.split(':')[1].trim().split(' ').map(e=>Number(e));
blocks = blocks.map(block => {
    return block.trim().split('\r\n').slice(1).map(line=>{
        return line.split(' ').map(e=>Number(e));
    })
});

console.log('seeds', seeds);
console.log('blocks', blocks);

// part 1

for(let block of blocks){
    seeds = seeds.map(seed => {
        for(let line of block){
            let [dest, src, range] = line;
            if(seed>=src && seed<(src+range)){
                return seed+dest-src;
            }
        }
        return seed;
    })
}
let min = Infinity;
for(let seed of seeds){
    min = Math.min(min, seed);
}
console.log('min', min);


