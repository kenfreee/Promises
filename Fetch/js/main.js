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
    //let content = "Hello World";
    // myHeaders.append("Content-Type", "application/json; charset=UTF-8;");
    // myHeaders.append("Content-Length", content.length.toString());
    // myHeaders.append("X-Custom-Header", "ProcessThisImmediately");

    let myHeaders = new Headers({"Content-Type": "application/json; charset=UTF-8;"});

    let myInit = {
        method: 'POST',
        body: forPost,
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    let myRequest = new Request('php/server.php', myInit);

	window.fetch(myRequest, myInit)
		.then(function (response) {
			console.log(response);
		});

    function status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    function json(response) {
        return response.json();
    }

    let forPost2 = JSON.stringify({testPOST: "2"});
    window.fetch('php/server.php', {method: 'POST', body: forPost2})
        .then(status)
        .then(json)
        .then(function(data) {
            console.log('Request succeeded with JSON response', data);
        }).catch(function(error) {
        console.log('Request failed', error);
    });