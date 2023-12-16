const fs = require('fs');
let data = fs.readFileSync('input.txt', 'utf8');
data = data.trim().split('\n\n');
for(let [i, v] of data.entries()){
    data[i] = data[i].split('\n');
}
// data = [
//     [
//         '#.##..##.',
//         '..#.##.#.',
//         '##......#',
//         '##......#',
//         '..#.##.#.',
//         '..##..##.',
//         '#.#.##.#.'
//     ],
//     [
//         '#...##..#',
//         '#....#..#',
//         '..##..###',
//         '#####.##.',
//         '#####.##.',
//         '..##..###',
//         '#....#..#'
//     ]
// ]

let go = (rows, avoid=[-1,-1]) =>{
    let res = [-1,-1];
    let cols = Array(rows[0].length).fill('');
    for(let i=0;i<rows.length;i++){
        for(let j=0;j<rows[0].length;j++){
            cols[j] += rows[i][j];
        }
    }
    
    for(let r=0;r<rows.length-1;r++){
        if(r===avoid[0]){
            continue;
        }
        let perfect = true;
        for(let i=0;i<=Math.min(r, rows.length-r-2);i++){
            if(rows[r-i] !== rows[r+i+1]){
                perfect = false;
                break;
            }
        }
        if(perfect){
            res[0]= r+1;
        }
    }
    for(let c=0;c<cols.length-1;c++){
        if(c===avoid[1]){
            continue;
        }
        let perfect = true;
        for(let i=0;i<=Math.min(c, cols.length-c-2);i++){
            if(cols[c-i] !== cols[c+i+1]){
                perfect = false;
                break;
            }
        }
        if(perfect){
            res[1]= c+1;
        }
    }
    return res;
}

let arr = [];
data.forEach((rows, i)=>{
    let [a,b] =go(rows);
    arr[i] = [a,b]
})

data.forEach((rows,index)=>{
    let br = false;
    for(let i=0;i<rows.length;i++){
        for(let j=0;j<rows[0].length;j++){
            let smudge;
            let original;
            if(rows[i][j]==='#'){
                smudge = '.';
                original = '#';
            } else {
                smudge = '#';
                original = '.';
            }
            rows[i] = rows[i].slice(0,j)+smudge+rows[i].slice(j+1);

            let [a,b] = go(rows, [arr[index][0]-1, arr[index][1]-1]);
            if(a!==-1){
                arr[index][0] = a;
                arr[index][1] = 0;
                br = true;
                break;
            }
            if(b!==-1){
                arr[index][1] = b;
                arr[index][0] = 0;
                br = true;
                break;
            }
            rows[i] = rows[i].slice(0,j)+original+rows[i].slice(j+1);
        }
        if(br){
            break;
        }
    }
})
let numRow = 0;
let numCol = 0;
for(let i=0;i<arr.length;i++){
    let [a,b] = arr[i];
    numRow+=a;
    numCol+=b;
}
let ans = numCol + 100*numRow;
console.log('ans', ans);
