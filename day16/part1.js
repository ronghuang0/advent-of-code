const fs = require('fs');
let data = fs.readFileSync('input.txt', 'utf8');
let matrix = data.trim().split('\n');
matrix.forEach((row, i)=>{
    matrix[i] = row.split('');
})

let n = matrix.length; //square

let visited = new Set();
let vWithD = new Set();

let calc = (dir, coord) => {
    let [r,c] = coord;
    if(r<0||r>=n||c<0||c>=n){
        return [];
    }
    let res = [];
    if(vWithD.has(`${dir}-${r}-${c}`)){
        return [];
    }
    visited.add(`${r}-${c}`);
    vWithD.add(`${dir}-${r}-${c}`);
    if(matrix[r][c] === '.'){
        if(dir === 'r'){
            res.push(['r', [r,c+1]]);
        } else if(dir === 'l'){
            res.push(['l', [r,c-1]]);
        } else if(dir === 'd'){
            res.push(['d', [r+1,c]]);
        } else {
            res.push(['u', [r-1,c]]);
        }
    } else if(matrix[r][c] === '\\'){
        if(dir === 'r'){
            res.push(['d', [r+1,c]]);
        } else if(dir === 'l'){
            res.push(['u', [r-1,c]]);
        } else if(dir === 'd'){
            res.push(['r', [r,c+1]]);
        } else {
            res.push(['l', [r,c-1]]);
        }
    } else if(matrix[r][c] === '/') {
        if(dir === 'r'){
            res.push(['u', [r-1,c]]);
        } else if(dir === 'l'){
            res.push(['d', [r+1,c]]);
        } else if(dir === 'd'){
            res.push(['l', [r,c-1]]);
        } else {
            res.push(['r', [r,c+1]]);
        }
    } else if(matrix[r][c] === '-'){
        if(dir === 'r'){
            res.push(['r', [r,c+1]]);
        } else if(dir === 'l'){
            res.push(['l', [r,c-1]]);
        } else {
            res.push(['l', [r,c-1]]);
            res.push(['r', [r,c+1]]);
        }
    } else {
        if(dir === 'u'){
            res.push(['u', [r-1,c]]);
        } else if(dir === 'd'){
            res.push(['d', [r+1,c]]);
        } else {
            res.push(['d', [r+1,c]]);
            res.push(['u', [r-1,c]]);
        }
    }
    return res;
}

let beams = [['r', [0,0]]];
while(beams.length){
    let [dir, coord] = beams.pop();
    let spread = calc(dir, coord);
    beams.push(...spread);
}

console.log('res', visited.size);
