"use strict";

let Ajax = (function(){
	const _data = {
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
	    },
	    default: {
	        method: "POST",
	        url: "php/server.php",
	        params: "{\"default\":\"1\"}"
	    }
    };

	return {
		sendRequest: function(method = _data.default.method, url = _data.default.url, params = _data.default.params) {
			return new Promise(function(resolve, reject){
				let request = new _data.getXHR();

				if (request) {
					request.open(method, url, true);
					request.setRequestHeader("Content-type", "application/json; charset=UTF-8;");
					
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
				} else reject("Browser not support XHR!");
			});
		}
	};
})();