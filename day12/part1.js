const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');
let arr = Array.from(data.trim().split('\n'), (r)=>r.split(' '));

let compute = (str) =>{
    let res = [];
    let streak = 0;
    for(let i=0;i<str.length;i++){
        if(str[i]==='#'){
            streak++;
        } else {
            if(streak >0){
                res.push(streak);
            }
            streak = 0;
        }
    }
    if(streak>0){
        res.push(streak);
    }
    return res.join(',');
}
let combos = (str, target) => {
    let dfs = (s) =>{
        if(s.length === str.length){
            if(compute(s) === target){
                return 1;
            }
            return 0;
        }
        if(str[s.length]==='?'){
            return dfs(s+'.') + dfs(s+'#');
        }
        return dfs(s+str[s.length]);
    }
    return dfs('');
}
let res = 0;
for(let v of arr) {
    res+=combos(v[0], v[1]);
}
console.log('res', res);


