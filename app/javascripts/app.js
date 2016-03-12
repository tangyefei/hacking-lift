(function(window) {
    'use strict';

    function flatten(data) {
        var result = (arguments.length == 2 && arguments[1] instanceof Object)  ? arguments[1] : {};
        for(var key in data) {
            if( !data.hasOwnProperty('children') ) {
                result[data['name']] = [];
            }
            else if(  data['children'] instanceof Array && data['children'].length ) {
                for(var i = 0; i < data['children'].length; i++ ) {
                    flatten(data['children'][i], result);
                }
            }
        }
        return result;
    }

    function formatData(skillJson, recordJson) {

        var flat = flatten(skillJson);
        console.log('flat:');
        console.log(flat);
        for(var key in recordJson) {
            var index = parseInt(key.slice(6, 8)) - 1; // index equals day
            var splits = recordJson[key].split(';');
            for (var i = splits.length - 1; i >= 0; i--) {
                var kv = splits[i].split(':');
                var k = kv[0], v = kv[1]; // v means the tomates add today
                console.log(k + ':' + v);
                if( flat[k] && flat[k] instanceof Array) {
                    flat[k][index] = flat[k][index] || 0;
                    flat[k][index] += parseInt(v);
                }
            };
        }

        var recorded = flat;
        return recorded;
        // return {};
    }

    function drawStructure(data) {
        var html = '';
        if(data.children && data.children instanceof Array) {
            html += '<ul>';
            for (var i = data['children'].length - 1; i >= 0; i--) {
                var name = data['children'][i]['name'];
                var children = data['children'][i]['children'];
                html += ('<li>' + name + '</li>');

                if(children && children instanceof Array) {
                        html += '<ul>';
                        for (var j = children.length - 1; j >= 0; j--) {
                            html += ('<li id=' + children[j]['name'] + '>' + children[j]['name'] + '</li>');
                        }
                    html += '</ul>';
                }
            };
        }
        html += '</ul>';
        document.getElementById('hacking-zone').innerHTML = html;
    }

    function drawRecords(data) {
        for(var key in data) {
            var dom = document.getElementById(key);
            var child, days = 31;
            if( dom && data[key] instanceof Array) {

                    for (var i = days - 1; i >= 0; i --) {
                        child = document.createElement('span');
                        child.className += (data[key][i] ? 'yes' : '');
                        dom.appendChild(child);
                    };
            }
        }
    }

    hc.ajax('get', 'app/data/skill-tree.json', function(res1) {
        hc.ajax('get', 'app/data/grow-records.json', function(res2) {
            var records = formatData(res1, res2);
            drawStructure(res1);
            drawRecords(records);
        });
    });

})(window);