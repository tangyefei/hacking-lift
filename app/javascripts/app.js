(function(window) {
    'use strict';

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

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
                        html += '<li><ul>';
                        for (var j = children.length - 1; j >= 0; j--) {
                            html += ('<li id=' + children[j]['name'] + '>' + children[j]['name'] + '</li>');
                        }
                        html += '</ul></li>';
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
                        child.className += (data[key][i] ? (parseInt(data[key][i]) >=4 ? 'yes' : 'soso') : '');
                        dom.appendChild(child);
                    };
            }
        }
    }

    function drawTodos(data) {
        var colorHash = {};
        var html = '<ul>'

        for (var i = 0; i < data.length; i++) {
            var kv = data[i].split('：');
            if( !colorHash[kv[0]]) {
                colorHash[kv[0]] = getRandomColor();
                console.log(kv[0]);
            }
            html += '<li><span style="color:' + colorHash[kv[0]]+ '">' + data[i] + '</span></li>'
        };
        html += '</ul>';
        document.getElementById('todos-zone').innerHTML = html;
    }

    hc.ajax('get', 'app/data/skill-tree.json', function(res1) {
        hc.ajax('get', 'app/data/grow-records.json', function(res2) {
            var records = formatData(res1, res2);
            drawStructure(res1);
            drawRecords(records);
        });
    });

    // hc.ajax('get', 'app/data/todos.json', function(res) {
    var res = [
        "好奇心：豆瓣的图书的input的text-indent生效滞后并被观察到了, 如何解决？",
        "好奇心：如何能是播放器离开窗口以后就就自动暂停的检测？",
        "大项拆分：借阅《高性能的JavaScript》",
        "CSS：如何实现（flex）一个左边100px，右边占据所有剩余的布局？",
        "JavaScript：如何实现对象的深复制？",
        "JavaScript：如何模拟实现一个jQuery的on方法？",
        "JavaScript：如何模拟实现promise的then方法？",
        "数据库：关系型数据库和非关系型数据库的有什么区别？",
        "网络：如何让家里的网络速度能够绕过大中国的防火墙？",
        "JavaScript：如何解决JSON.parse中文报错的问题？"
    ];
    drawTodos(res);
    // });

})(window);