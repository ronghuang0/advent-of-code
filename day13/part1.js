const fs = require('fs');
let data = fs.readFileSync('input.txt', 'utf8');
data = data.trim().split('\n\n');
for(let [i, v] of data.entries()){
    data[i] = data[i].split('\n');
}

let numRow = 0;
let numCol = 0;
data.forEach((rows)=>{
    let cols = Array(rows[0].length).fill('');
    for(let i=0;i<rows.length;i++){
        for(let j=0;j<rows[0].length;j++){
            cols[j] += rows[i][j];
        }
    }
    
    for(let r=0;r<rows.length-1;r++){
        let perfect = true;
        for(let i=0;i<=Math.min(r, rows.length-r-2);i++){
            if(rows[r-i] !== rows[r+i+1]){
                perfect = false;
                break;
            }
        }
        if(perfect){
            numRow += r+1;
        }
    }
    for(let c=0;c<cols.length-1;c++){
        let perfect = true;
        for(let i=0;i<=Math.min(c, cols.length-c-2);i++){
            if(cols[c-i] !== cols[c+i+1]){
                perfect = false;
                break;
            }
        }
        if(perfect){
            numCol += c+1;
        }
    }
})
let res = numCol + 100*numRow;
console.log('res', res);
