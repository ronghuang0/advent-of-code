var fs = require('fs');
var data = fs.readFileSync('input.txt', 'utf8');
var arr = data.trim().split(/\r?\n|\r|\n/g);

let inBounds = (r, c) =>{
    return r>=0 && r<140 && c>=0 && c<140;
}

let isSymbol = (char) => {
    return isNaN(char) && char !== '.';
}

let isAdj = (start, end) =>{
    let [r, sc] = start;
    let [_, ec] = end;
    for(let j=sc-1;j<=ec+1;j++){
        if(inBounds(r-1,j) && isSymbol(arr[r-1][j])){
            return [r-1,j];
        }
        if(inBounds(r+1,j) && isSymbol(arr[r+1][j])){
            return [r+1,j];
        }
    }
    if(inBounds(r, sc-1) && isSymbol(arr[r][sc-1])){
        return [r, sc-1];
    }
    if(inBounds(r, ec+1) && isSymbol(arr[r][ec+1])){
        return [r, ec+1];
    }
    return false;
}

// part 1
let res1 = 0;
for(let i=0; i<140;i++){
    for(let j=0;j<140;j++){
        if(!isNaN(arr[i][j])){
            let curr = j;
            let number = '';
            console.log('i',i);
            console.log('j',j);
            while(inBounds(i, curr) && !isNaN(arr[i][curr])){
                number+=arr[i][curr];
                curr++;
            }
            curr--;
            let start = [i,j];
            let end = [i, curr];
            if(isAdj(start, end)){
                console.log('number', number);
                res1+=Number(number);
            }
            j=curr+1;
        }
    }
}

// part 2
let hash = {};
for(let i=0; i<140;i++){
    for(let j=0;j<140;j++){
        if(!isNaN(arr[i][j])){
            let curr = j;
            let number = '';
            console.log('i',i);
            console.log('j',j);
            while(inBounds(i, curr) && !isNaN(arr[i][curr])){
                number+=arr[i][curr];
                curr++;
            }
            curr--;
            let start = [i,j];
            let end = [i, curr];
            let adj = isAdj(start, end);
            if(adj){
                console.log('number', number);
                let [r, c] = adj;
                if(!hash[`${r}-${c}`]) {
                    hash[`${r}-${c}`] = [];
                }
                hash[`${r}-${c}`].push(number);
            }
            j=curr+1;
        }
    }
}
let res = 0;
for(let v in hash){
    if(hash[v].length === 2){
        res+=hash[v][0]*hash[v][1];
    }
}
console.log('res', res);