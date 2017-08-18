"use strict";

//Function for random values
let getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Function returns the promise
let withDelay = function() {
	return new Promise(function(resolve, reject) {
		//Any asynchronous code
		let delay = getRandomInRange(1, 3) * 1000;

		setTimeout(function(){
			resolve(delay);
		}, delay);
	});
};

let example1 = function() {
	//Consecutive execution 1.1
	let recursionFunc;
	
	//Chain of promises
	withDelay()
		.then(function(delay){ //Handler on success
			console.log(`1: ${delay}`);
			return withDelay(); //This promise will be passed as the return value of "then"
		})
		.then(function(delay){
			console.log(`2: ${delay}`);
			return withDelay();
		})
		.then(function(delay){
			console.log(`3: ${delay}`);
		});

	//Consecutive execution 1.2
	recursionFunc = function(count) {
		if (count) {
			return withDelay()
				.then(function(delay){				
					return (delay / 1000); //This value will be passed to the next "then"
				})
				.then(function(infoDelay) {
					console.log(`${count}: ${infoDelay} sec`);
					return recursionFunc (--count);
				});
		} else return;
	};

	//recursionFunc(3);
};

let example2 = function() {
	//Parallel execution
	let p1 = withDelay(), p2 = withDelay(), p3 = withDelay();

	Promise.all([p1, p2, p3])
		.then(function(values) { //This "then" will be fulfilled after success in all promises
			console.log(values);
		});
};

//example1();
//example2();