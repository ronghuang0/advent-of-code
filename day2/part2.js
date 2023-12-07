const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

let res = 0;
const games = data.trim().split('\n');
for(let i=0;i<games.length;i++){
    let game = games[i].split(':')[1].trim().split('; ');
    let amount = { red: 0, blue: 0, green: 0 };
    for(let grab of game){
        for(let group of grab.split(', ')){
            let [number, color] = group.split(' ');
            amount[color] = Math.max(amount[color], Number(number));
        }
    }
    res+= amount['red']*amount['blue']*amount['green'];
}
console.log('res', res);