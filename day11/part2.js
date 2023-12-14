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

let galaxies = [];
for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
        if(matrix[i][j]==='#'){
            galaxies.push([i,j]);
        }
    }
}

let numBefore = (arr, num) =>{
    if(num < arr[0]){
        return 0;
    }
    for(let i=1;i<arr.length;i++){
        if(num>arr[i-1] && num<arr[i]){
            return i;
        }
    }
    return arr.length;
}

let res = 0;
for(let i=0;i<galaxies.length;i++){
    for(let j=i+1;j<galaxies.length;j++){
        let [a,b] = galaxies[i];
        a = numBefore(expandRows, a)*999999 + a;
        b = numBefore(expandCols, b)*999999 + b;
        let [c, d] = galaxies[j];
        c = numBefore(expandRows, c)*999999 + c;
        d = numBefore(expandCols, d)*999999 + d;
        res+= Math.abs(a-c)+Math.abs(b-d);
    }
}
console.log('res', res);