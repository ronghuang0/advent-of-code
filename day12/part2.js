const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');
let arr = Array.from(data.trim().split('\n'), (r)=>r.split(' '));

for(let i=0;i<arr.length;i++){
    let one = arr[i][0];
    let two = arr[i][1];
    for(let j=0;j<4;j++){
        arr[i][0] += '?'+one;
        arr[i][1] += ','+two;
    }
}

for(let i=0;i<arr.length;i++){
    arr[i][1]=arr[i][1].split(',');
    arr[i][1] = arr[i][1].map(e=>Number(e));
}

let dp = {};
let combos = (str, nums) =>{
    let dfs = (s, groups) =>{
        if(s===''){
            if(groups.length===0){
                return 1;
            }
            return 0;
        }
        if(groups.length === 0){
            if(s.includes('#')){
                return 0;
            }
            return 1;
        }
        if(dp[`${s}-${groups.join(',')}`] !== undefined){
            return dp[`${s}-${groups.join(',')}`];
        }
        let total=0;
        if(s[0]==='.' || s[0]==='?'){
            total += dfs(s.slice(1), groups);
        }
        if(s[0]==='#' || s[0]==='?'){
            if(s.length>=groups[0] && !s.slice(0,groups[0]).includes('.') && (groups[0]===s.length || s[groups[0]]!=='#')){
                total += dfs(s.slice(groups[0]+1), groups.slice(1));
            }
        }
        dp[`${s}-${groups.join(',')}`] = total;
        return total;
    }
    return dfs(str, nums)
}
let res = 0;
for(let v of arr) {
    res+=combos(v[0], v[1]);
}
console.log('res', res);



