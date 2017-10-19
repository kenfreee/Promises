"use strict";

	let forGET = 'testGET=1';
	window.fetch(`php/server.php?${forGET}`)
		.then(function (response) {
			if (response.status === 200) {
                return new Promise(function (resolve, reject) {
                	setTimeout(function () {
						resolve(response);
                    }, 2000);
                });
			} else return Promise.reject(new Error(response.statusText));
        })
		.then(function (response) {
			console.log(response);
        })
		.catch(function (error) {
			console.log(error)
        });

	let forPost = JSON.stringify({testPOST: "1"});
	window.fetch('php/server.php', {method: 'POST', body: forPost})
		.then(function (response) {
			console.log(response);
		});