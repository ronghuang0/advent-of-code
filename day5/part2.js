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

let seedRanges = [];
for(let i=0;i<seeds.length;i+=2){
    seedRanges.push([seeds[i], seeds[i]+seeds[i+1]-1]); // start, end, inclusive
}

for(let block of blocks){
    let next = [];
    while(seedRanges.length > 0){
        let seedRange = seedRanges.pop();
        let noOverlap = true;
        for(let line of block){
            let [dest, src, range] = line;
            let [start, end] = seedRange;
            let nStart = Math.max(start, src);
            let nEnd = Math.min(end, src+range-1);
            if(nStart <= nEnd){
                next.push([nStart+dest-src, nEnd+dest-src]);
                if(end > src+range-1){
                    seedRanges.push([src+range, end]);
                }
                if(start < src) {
                    seedRanges.push([start, src-1]);
                }
                noOverlap = false;
                break;
            }
        }
        if(noOverlap){
            next.push(seedRange);
        }
    }
    seedRanges = next;
}
let min = Infinity;
for(let i=0;i<seedRanges.length;i++){
    min = Math.min(seedRanges[i][0], min);
}
console.log('min', min);


