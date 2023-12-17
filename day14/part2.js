const fs = require('fs');
let data = fs.readFileSync('input.txt', 'utf8');
let matrix = data.trim().split('\n');

for(let i=0;i<matrix.length;i++){
    matrix[i] = matrix[i].split('');
}

// matrix = [
//     ['O','.','.','.','.','#','.','.','.','.',],
//     ['O','.','O','O','#','.','.','.','.','#',],
//     ['.','.','.','.','.','#','#','.','.','.',],
//     ['O','O','.','#','O','.','.','.','.','O',],
//     ['.','O','.','.','.','.','.','O','#','.',],
//     ['O','.','#','.','.','O','.','#','.','#',],
//     ['.','.','O','.','.','#','O','.','.','O',],
//     ['.','.','.','.','.','.','.','O','.','.',],
//     ['#','.','.','.','.','#','#','#','.','.',],
//     ['#','O','O','.','.','#','.','.','.','.',]
// ]
let north = (mat) =>{
    for(let j=0;j<mat[0].length;j++){
        let avail = [];
        for(let i=0;i<mat.length;i++){
            if(mat[i][j]==='.'){
                avail.push(i);
            } else if(mat[i][j]==='O'){
                if(avail.length){
                    let a = avail.shift();
                    mat[a][j] = 'O';
                    mat[i][j] = '.';
                    avail.push(i);
                }
            } else {
                avail = [];
            }
        }
    }
}

let south = (mat) => {
    for(let j=0;j<mat[0].length;j++){
        let avail = [];
        for(let i=mat.length-1;i>=0;i--){
            if(mat[i][j]==='.'){
                avail.push(i);
            } else if(mat[i][j]==='O'){
                if(avail.length){
                    let a = avail.shift();
                    mat[a][j] = 'O';
                    mat[i][j] = '.';
                    avail.push(i);
                }
            } else {
                avail = [];
            }
        }
    }
}

let west = (mat) => {
    for(let i=0;i<mat.length;i++){
        let avail = [];
        for(let j=0;j<mat[0].length;j++){
            if(mat[i][j]==='.'){
                avail.push(j);
            } else if(mat[i][j]==='O'){
                if(avail.length){
                    let a = avail.shift();
                    mat[i][a] = 'O';
                    mat[i][j] = '.';
                    avail.push(j);
                }
            } else {
                avail = [];
            }
        }
    }
}

let east = (mat) => {
    for(let i=0;i<mat.length;i++){
        let avail = [];
        for(let j=mat[0].length-1;j>=0;j--){
            if(mat[i][j]==='.'){
                avail.push(j);
            } else if(mat[i][j]==='O'){
                if(avail.length){
                    let a = avail.shift();
                    mat[i][a] = 'O';
                    mat[i][j] = '.';
                    avail.push(j);
                }
            } else {
                avail = [];
            }
        }
    }
}

let spin = (mat) =>{
    north(mat);
    west(mat);
    south(mat);
    east(mat);
}

let curr = JSON.stringify(matrix);
let hash = {};
let count = 0;
while(!hash[curr]){
    hash[curr] = count;
    spin(matrix);
    count++;
    curr = JSON.stringify(matrix);
}
let start = hash[curr];
let cycleLength = count - start;
let num = (1000000000-count)%cycleLength;
for(let i=0;i<num;i++){
    spin(matrix);
}
let res = 0;
for(let i=0;i<matrix.length;i++){
    for(let j=0;j<matrix[0].length;j++){
        if(matrix[i][j]==='O'){
            res+= matrix[0].length-i;
        }
    }
}
console.log('res', res);

