"use strict";

Ajax.send()
	.then(function(response) {		
		if (response === "OK!") {
			console.log(`STATUS: ${response} - POST`);
		} else return Promise.reject("Bad response!");
	})
	.catch(function(error){
		console.error(error);
	});

Ajax.method("GET")
	.url("php/server.php")
	.params("testGET=1")
	.send()
	.then(function(response) {		
		if (response === "OK!") {
			console.log(`STATUS: ${response} - GET`);
		} else return Promise.reject("Bad response!");
	})
	.catch(function(error){
		console.error(error);
	});