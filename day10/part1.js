const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

let matrix = Array.from(data.trim().split('\n'), (r)=>r.split(''));
let m = matrix.length;
let n = matrix[0].length;

let start;

for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
        if(matrix[i][j]==='S'){
            start = [i,j];
            break;
        }
    }
}

let north = [-1, 0]
let south = [1, 0]
let east = [0, 1]
let west = [0, -1]
let map = {
    '|': [north, south],
    '-': [east, west],
    'L': [north, east],
    'J': [north, west],
    '7': [south, west],
    'F': [south, east],
    '.': []
}
let inBounds = (coord)=>{
    let [r, c] = coord;
    if(r>=0 && r<m && c>=0 && c<n){
        return true;
    }
    return false
}
let isConnected=(prev, curr) =>{

    let [r, c] = curr;
    let [pr, pc] = prev;
    let dr = pr-r;
    let dc = pc-c;
    let arr = map[matrix[r][c]];
    for(let [a,b] of arr){
        if(a===dr && b===dc){
            return true;
        }
    }
    return false;

}

let isPath = (start, prev, curr) =>{
    let [sr, sc] = start;
    let count = 1;
    while(true){
        let [pr, pc] = prev;
        let [r, c] = curr;
        if(r===sr && c===sc){
            return count;
        }
        if(!inBounds(curr) || !isConnected(prev, curr)){
            return 0;
        }
        let next;
        let nextDirs = map[matrix[r][c]]
        for(let [dr, dc] of nextDirs){
            if(((r+dr) !== pr) || ((c+dc) !== pc)){
                next = [r+dr, c+dc];
            }
        }
        prev = curr;
        curr = next;
        count++;
    }
}

let dirs = [[1,0], [0,1],[0,-1], [-1,0]];
for(let [dr,dc] of dirs){
    console.log('count', isPath(start, start, [start[0]+dr, start[1]+dc]));
}