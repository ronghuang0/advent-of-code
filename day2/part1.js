const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

var games = data.trim().split('\n');

let res = 0;
for(let i=0;i<games.length;i++){
    let game = games[i].split(':')[1].trim().split('; ');
    let valid = true;
    for(let grab of game){
        let amount = { red: 0, blue: 0, green: 0 };
        for(let group of grab.split(', ')){
            let [number, color] = group.split(' ');
            amount[color] = Math.max(amount[color], Number(number));
        }
        if(amount['red'] > 12 || amount['green'] > 13 || amount['blue'] > 14){
            valid = false;
            break;
        }
    }
    if(valid){
        res+=i+1;
    }
}
console.log('res', res);