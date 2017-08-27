"use strict";

let Ajax = (function(){
	let data = {
		method: "",
		url: "",
		params: ""
	};

	const _data = {
		default: {
	        method: "POST",
	        url: "php/server.php",
	        params: "{\"testPOST\":\"1\"}"
	    },
	    getXHR: function () {
	        let requestObj;

	        try {
	            requestObj = new XMLHttpRequest();
	        }
	        catch (e1) {
	            try {
	                requestObj = new ActiveXObject("Msxml2.XMLHTTP");
	            }
	            catch (e2) {
	                try {
	                    requestObj = new ActiveXObject("Microsoft.XMLHTTP");
	                }
	                catch (e3) {
	                    requestObj = false;
	                }
	            }
	        }

	        return requestObj;
	    }	    
    };

	return {
		method: function(method) {
			data.method = method;
			return this;
		},
		url: function(url) {
			data.url = url;
			return this;
		},
		params: function(params) {
			data.params = params;
			return this;
		},
		send: function() {
			return new Promise(function(resolve, reject){
				let request = new _data.getXHR(),
					method = data.method,
					url = data.url,
					params = data.params;				
				
				method = (method) ? method : _data.default.method;
				url	= (url) ? url : _data.default.url;
				params = (params) ? params : _data.default.params;

				if (request) {
					switch (method) {
						case "POST":
							request.open(method, url, true);
							request.setRequestHeader("Content-type", "application/json; charset=UTF-8;");
							break;
						case "GET":
							request.open(method, `${url}?${params}`, true);
							request.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8;");
							params = null;
					}
					
					request.onerror = function() {
						reject("Network error!");
					};

					request.onload = function() {
                        if (this.status === 200) {
                            resolve(this.response);
                        } else {
                            reject(this.statusText);
                        }
                    };
                    request.send(params);

                    data.method = "";
                    data.url = "";
                    data.params = "";
				} else reject("Browser not support XHR!");
			});
		}
	};
})();