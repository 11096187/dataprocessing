"use strict"

const amount = 8;
let arr = [9, 0, 12, 132, 73];
let sum = 0;

// voor iedere entry in de array r
arr.forEach(function(d){
	sum+= d;
})

console.log(sum);

sum = 0;

arr.forEach(d => sum += d);