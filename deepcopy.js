var company = {
    'name': 'pwc',
    'departments': [
        {'name': 'SAP'},
        {'name': 'Oracle'}
    ],
    'location': 'PuDong Chatime Plaza Buiding #3',
    'CEO': {
        'name': 'Shawni',
        'gendar': 'femail',
        'age': 38,
        'birthday': (new Date()),
        'mantra': /fuck/gim,
        'work': (function(){console.log('saying...');})
    }
};

var isObject = function(value) {return Object.prototype.toString.call(value) == '[object Object]';}
// console.log(isObject({}));
// console.log(isObject(new Date()));
var isNumber = function(value) {return Object.prototype.toString.call(value) == '[object Number]';}
// console.log(isNumber(12));
// console.log(isNumber('35'));
var isDate = function(value) {return Object.prototype.toString.call(value) == '[object Date]';}
// console.log(isDate(new Date()));
// console.log(isDate(123123));
var isRegExp = function(value) {return Object.prototype.toString.call(value) == '[object RegExp]';}
// console.log(isRegExp(/abc/g));
// console.log(isRegExp('/abc/g'));
var isString = function(value) {return Object.prototype.toString.call(value) == '[object String]';}
// console.log(isString('wat'));
// console.log(isString(12));
var isFunction = function(value) {return Object.prototype.toString.call(value) == '[object Function]';}
// console.log(isFunction((function() {})));
// console.log(isFunction(undefined));

function deepcopy(original) {
    var thecopy;

    if( typeof original == 'object') {
        // if( original instanceof  Array) {
        if( isArray(original) ) {
            thecopy = [];
            for (var i = 0; i <= original.length - 1; i++) {
                if( typeof original[i] !== 'object'  ) {
                    thecopy.push(orignal[i]);
                }
                else {
                    thecopy.push(deepcopy(original[i]));
                }
            };
        }
        // else if( original instanceof Date ) {
        else if( isDate(original) ) {
            thecopy = new Date(original.valueOf());
        }
        // else if( original instanceof RegExp ) {
        else if( isRegExp(original) ) {
            var flags = (original.global ? 'g' : '') + (original.ignoreCase ? 'i' : '') + (original.multiline ? 'm' : '');
            var value = original.valueOf();
            // 似乎并不需要加上flags也能成功复制
            thecopy = new RegExp(original.valueOf());
        }
        // else if( original instanceof Function ) {
        else if( isFunction(original) ) {
            // 并不知道怎么样复制方法
        }
        else {
            thecopy = {};
            for(var key in original) {
                if( typeof original[key] !== 'object' ) {
                    thecopy[key] = original[key];
                }
                else {
                    thecopy[key] = deepcopy(original[key]);
                }
            }
        }
    }
    else {
        thecopy = original;
    }
    return thecopy;
}

// var copy = deepcopy(company);
// console.log(copy);
// console.log(company.CEO.mantra === copy.CEO.mantra);