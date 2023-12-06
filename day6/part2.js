
const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8');

let [time, distance] = data.trim().split('\n').map(e=>Number(([...e.matchAll(/\d+/g)].map(v=>v[0])).join('')));

//quadratic formula method
let quadratic = (time, distance) => {
    let discriminant = Math.pow(time,2)-4*distance;
    let last = Math.floor((time + Math.sqrt(discriminant))/2);
    let first = Math.ceil((time - Math.sqrt(discriminant))/2);
    let count = last-first+1;
    console.log('count', count);
}

// binary search method
let getDistance = (buttonTime) => {
    return buttonTime*(time-buttonTime);
}
let isIncreasing = (buttonTime) => {
    return getDistance(buttonTime) < getDistance(buttonTime+1)
}
let binarySearch = (time, distance) => {
    let l=1;
    let r=time;
    while(l<r){
        let mid = Math.floor((l+r)/2);
        if(getDistance(mid) > distance || !isIncreasing(mid)){
            r=mid;
        } else {
            l = mid+1;
        }
    }
    let first = l;
    l=1;
    r=time;
    while(l<r){
        let mid = Math.ceil((l+r)/2);
        if(getDistance(mid) > distance || isIncreasing(mid)){
            l=mid;
        } else {
            r = mid-1;
        }
    }
    let last = l;
    console.log('count', last-first+1);
}



