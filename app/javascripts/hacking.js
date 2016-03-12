(function(window) {
    'use strict';

    var xmlhttp;
    var method_get = 'GET';
    var method_post = 'POST';

    window.hc = {};
    window.hc.ajax = function(type, url) {
        var callback = ( arguments.length > 2 && typeof arguments[2] == 'function') ? arguments[2] : undefined;

        if( type && url ) {
            if( !xmlhttp )
                if( window.XMLHttpRequest )
                    xmlhttp = new window.XMLHttpRequest();
                else
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

            if( type.toLowerCase() === method_get.toLowerCase()) {
                xmlhttp.onreadystatechange = function() {
                    if( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
                        if( callback )
                            callback.call(window, JSON.parse(xmlhttp.responseText));
                    }
                }
                xmlhttp.open(method_get, url, true);
                xmlhttp.send();
            }
        }
        else {
            throw new Error('Error: wrong parameters, need as least provide method type and url');
        }
    }

})(window);