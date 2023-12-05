var fs = require('fs');
var data = fs.readFileSync('input4.txt', 'utf8');
var arr = data.trim().split(/\r?\n|\r|\n/g);
for(let i=0;i<arr.length;i++){
    let curr = arr[i];
    let index = curr.indexOf(':');
    arr[i] = arr[i].slice(index+1);
    arr[i] = arr[i].split('|');
    arr[i][0] = arr[i][0].trim().split(' ').filter(e=>e!=='');
    arr[i][1] = arr[i][1].trim().split(' ').filter(e=>e!=='');
}
let getMatches = (winners, us)=>{
    let hash = {};
    for(let i=0;i<winners.length;i++){
        hash[winners[i]]=true;
    }
    let count = 0;
    for(let i=0;i<us.length;i++){
        if(hash[us[i]]){
            count++;
        }
    }
    return count;
}
let matches = {};
for(let i=0;i<arr.length;i++){
    matches[i] = getMatches(arr[i][0], arr[i][1]);
}
let res = {};
let findCopies = (card, i) =>{
    res[i] = (res[i] || 0)+1;
    let match = matches[i];
    for(let j=i+1;j<i+1+match;j++){
        findCopies(arr[j], j);
    }
}
for(let i=0;i<arr.length;i++){
    findCopies(arr[i], i)
}
console.log('res', res);
let total = 0;
for(let k in res){
    total += res[k];
}
console.log('total', total);

