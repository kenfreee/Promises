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
			} else throw new Error('Error!'); //return Promise.reject(new Error(response.statusText));
        })
		.then(function (response) {
			console.log(response);
			return Promise.resolve(response);
        })
        .then(function (response) {
            console.log('Status: ' + response.status);
            console.log('StatusText: ' + response.statusText);
            console.log('Type: ' + response.type);
            console.log('URL: ' + response.url);
            console.log('Content-Type: ' +response.headers.get('Content-Type'));
            console.log(response.headers.get('Server'));

            response.text().then(function (text) {
				console.log(text);
            });
        })
		.catch(function (error) {
			console.log(error)
        });

	let forPost = JSON.stringify({testPOST: "1"});
	window.fetch('php/server.php', {method: 'POST', body: forPost})
		.then(function (response) {
			console.log(response);
		});