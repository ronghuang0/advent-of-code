const fs = require('fs');
let data = fs.readFileSync('input.txt', 'utf8');
data = data.replace(/(\r\n|\n|\r)/gm, "");
let arr = data.trim().split(',');

let hash = (str) => {
    let res = 0;
    for(let s of str) {
        res+=s.charCodeAt(0);
        res*=17;
        res%=256;
    }
    return res;
}

let map = {};
for(let i=0;i<256;i++){
    map[i] = [];
}
for(let i=0;i<arr.length;i++){
    if(arr[i].includes('=')){
        let [label, focal] = arr[i].split('=');
        let box = hash(label);
        let exists = false;
        for(let j=0; j<map[box].length;j++){
            if(map[box][j][0]===label){
                map[box][j][1] = focal;
                exists = true;
            }
        }
        if(!exists){
            map[box].push([label, focal]);
        }

    } else {
        let label = arr[i].slice(0, arr[i].length-1);
        let box = hash(label);
        for(let j=0;j<map[box].length;j++){
            if(map[box][j][0]===label){
                map[box].splice(j,1);
            }
        }
    }
}
let res = 0;
for(let i=0;i<256;i++){
    for(let j=0;j<map[i].length;j++){
        res+=(i+1)*(j+1)*Number(map[i][j][1]);
    }
}
console.log('res', res);



