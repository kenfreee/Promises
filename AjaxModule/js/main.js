"use strict";

Ajax.sendRequest()
	.then(function(response) {		
		if (response === "OK!") {
			console.log(`STATUS: ${response}`);
		} else return Promise.reject("Bad response!");
	})
	.catch(function(error){
		console.error(error);
	});