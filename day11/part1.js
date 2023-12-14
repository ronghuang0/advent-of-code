const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');
let matrix = Array.from(data.trim().split('\n'), (r)=>r.split(''));

let m = matrix.length;
let n = matrix[0].length;
let expandRows = [];
let expandCols = [];

for(let i=0;i<m;i++){
    let expand = true;
    for(let j=0;j<n;j++){
        if(matrix[i][j]==='#'){
            expand = false;
        }
    }
    if(expand){
        expandRows.push(i);
    }
}
for(let j=0;j<n;j++){
    let expand = true;
    for(let i=0;i<m;i++){
        if(matrix[i][j]==='#'){
            expand = false;
        }
    }
    if(expand){
        expandCols.push(j);
    }
}

for(let i=0;i<expandRows.length;i++){
    matrix.splice(expandRows[i]+i,0,Array(n).fill('.'));
}
m = matrix.length;
for(let j=0;j<expandCols.length;j++){
    for(let i=0;i<m;i++){
        matrix[i].splice(expandCols[j]+j,0,'.');
    }
}
n=matrix[0].length;

let galaxies = [];
for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
        if(matrix[i][j]==='#'){
            galaxies.push([i,j]);
        }
    }
}

let res = 0;
for(let i=0;i<galaxies.length;i++){
    for(let j=i+1;j<galaxies.length;j++){
        let [a,b] = galaxies[i];
        let [c, d] = galaxies[j];
        res+= Math.abs(a-c)+Math.abs(b-d);
    }
}
console.log('res', res);