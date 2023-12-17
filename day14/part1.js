const fs = require('fs');
let data = fs.readFileSync('input.txt', 'utf8');
let matrix = data.trim().split('\n');

for(let i=0;i<matrix.length;i++){
    matrix[i] = matrix[i].split('');
}

for(let j=0;j<matrix[0].length;j++){
    let avail = [];
    for(let i=0;i<matrix.length;i++){
        if(matrix[i][j]==='.'){
            avail.push(i);
        } else if(matrix[i][j]==='O'){
            if(avail.length){
                let a = avail.shift();
                matrix[a][j] = 'O';
                matrix[i][j] = '.';
                avail.push(i);
            }
        } else {
            avail = [];
        }
    }
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


