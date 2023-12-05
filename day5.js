var fs = require('fs');
var data = fs.readFileSync('input.txt', 'utf8');
//var arr = data.trim().split(/\r?\n|\r|\n/g);

let seedIndex = data.indexOf('seed-to-soil');
let soilIndex = data.indexOf('soil-to-fertilizer');
let fertilizerIndex = data.indexOf('fertilizer-to-water');
let waterIndex = data.indexOf('water-to-light');
let lightIndex = data.indexOf('light-to-temperature');
let temperatureIndex = data.indexOf('temperature-to-humidity');
let humidityIndex = data.indexOf('humidity-to-location');

let seedToSoil = data.slice(seedIndex+'seed-to-soil map:'.length, soilIndex).trim();
let soilToFertilizer = data.slice(soilIndex+ 'soil-to-fertilizer map:'.length, fertilizerIndex).trim();
let fertilizerToWater = data.slice(fertilizerIndex+'fertilizer-to-water map:'.length, waterIndex).trim();
let waterToLight = data.slice(waterIndex+ 'water-to-light map:'.length, lightIndex).trim();
let lightToTemperature = data.slice(lightIndex+ 'light-to-temperature map:'.length, temperatureIndex).trim();
let temperatureToHumidity = data.slice(temperatureIndex+ 'temperature-to-humidity map:'.length, humidityIndex).trim();
let humidityToLocation = data.slice(humidityIndex + 'humidity-to-location map:'.length).trim();

// let findNext = (num, array) =>{
//     for(let i=0;i<array.length;i++){
//         let [dest, src, range] = array[i];
//         dest = Number(dest);
//         src = Number(src);
//         range = Number(range);
//         if(num>=src && num<src+range){
//             return dest+num-src;
//         }
//     }
//     return num;
// }
// let input = [919339981, 562444630, 3366006921, 67827214, 1496677366, 101156779, 4140591657, 5858311, 2566406753, 71724353, 2721360939, 35899538, 383860877, 424668759, 3649554897, 442182562, 2846055542, 49953829, 2988140126, 256306471]

// seedToSoil = seedToSoil.split(/\r?\n|\r|\n/g);
// seedToSoil.forEach((e,i)=>seedToSoil[i]=e.split(' '));

// soilToFertilizer = soilToFertilizer.split(/\r?\n|\r|\n/g);
// soilToFertilizer.forEach((e,i)=>soilToFertilizer[i]=e.split(' '));

// fertilizerToWater = fertilizerToWater.split(/\r?\n|\r|\n/g);
// fertilizerToWater.forEach((e,i)=>fertilizerToWater[i]=e.split(' '));

// waterToLight = waterToLight.split(/\r?\n|\r|\n/g);
// waterToLight.forEach((e,i)=>waterToLight[i]=e.split(' '));

// lightToTemperature = lightToTemperature.split(/\r?\n|\r|\n/g);
// lightToTemperature.forEach((e,i)=>lightToTemperature[i]=e.split(' '));

// temperatureToHumidity = temperatureToHumidity.split(/\r?\n|\r|\n/g);
// temperatureToHumidity.forEach((e,i)=>temperatureToHumidity[i]=e.split(' '));

// humidityToLocation = humidityToLocation.split(/\r?\n|\r|\n/g);
// humidityToLocation.forEach((e,i)=>humidityToLocation[i]=e.split(' '));
// let res = Infinity;
// for(let i=0;i<input.length;i++){
    // res=Math.min(res, findNext(findNext(findNext(findNext(findNext(findNext(findNext(9388198, seedToSoil), soilToFertilizer), fertilizerToWater), waterToLight), lightToTemperature), temperatureToHumidity), humidityToLocation));
// }
// console.log('res', res )


//part 2
let input = [919339981, 562444630, 3366006921, 67827214, 1496677366, 101156779, 4140591657, 5858311, 2566406753, 71724353, 2721360939, 35899538, 383860877, 424668759, 3649554897, 442182562, 2846055542, 49953829, 2988140126, 256306471]
let ranges = [];
for(let i=0;i<input.length;i+=2){
    ranges.push([input[i], input[i]+input[i+1]-1]);
}
console.log('ranges', ranges);

let findNext = (num, array) =>{
    for(let i=0;i<array.length;i++){
        let [src, dest, range] = array[i];
        dest = Number(dest);
        src = Number(src);
        range = Number(range);
        if(num>=src && num<src+range){
            return dest+num-src;
        }
    }
    return num;
}

seedToSoil = seedToSoil.split(/\r?\n|\r|\n/g);
seedToSoil.forEach((e,i)=>seedToSoil[i]=e.split(' '));

soilToFertilizer = soilToFertilizer.split(/\r?\n|\r|\n/g);
soilToFertilizer.forEach((e,i)=>soilToFertilizer[i]=e.split(' '));

fertilizerToWater = fertilizerToWater.split(/\r?\n|\r|\n/g);
fertilizerToWater.forEach((e,i)=>fertilizerToWater[i]=e.split(' '));

waterToLight = waterToLight.split(/\r?\n|\r|\n/g);
waterToLight.forEach((e,i)=>waterToLight[i]=e.split(' '));

lightToTemperature = lightToTemperature.split(/\r?\n|\r|\n/g);
lightToTemperature.forEach((e,i)=>lightToTemperature[i]=e.split(' '));

temperatureToHumidity = temperatureToHumidity.split(/\r?\n|\r|\n/g);
temperatureToHumidity.forEach((e,i)=>temperatureToHumidity[i]=e.split(' '));

humidityToLocation = humidityToLocation.split(/\r?\n|\r|\n/g);
humidityToLocation.forEach((e,i)=>humidityToLocation[i]=e.split(' '));
let res = Infinity;
for(let i=0;i<1000000000;i++){
    let dog = findNext(findNext(findNext(findNext(findNext(findNext(findNext(0, humidityToLocation), temperatureToHumidity), lightToTemperature), waterToLight), fertilizerToWater), soilToFertilizer), seedToSoil);
    for(let j=0;j<ranges.length;j++){
        if(dog>=ranges[j][0] && dog<=ranges[j][1]){
            res = i;
        }
    }
}
console.log('res', res);