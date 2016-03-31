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

Object.prototype.clone = function() {
    var copy = {};
    for(var key in this) {
        if(this.hasOwnProperty(key)) {
            if(this[key] != null && this[key] != undefined )  {
                copy[key] =  this[key].clone();
            }
            else {
                copy[key] =  this[key];
            }
        }
    }
    return copy;
}
Array.prototype.clone = function() {
    var copy = [];
    for (var i = 0; i < this.length; i++) {
        copy.push(this[i].clone());
    };
    return copy;
}
RegExp.prototype.clone = function() {
    return (new  RegExp(this.valueOf()));
}
Date.prototype.clone = function() {
    return (new Date(this.valueOf()));
}

String.prototype.clone = function() {
    return this.valueOf();
}
Number.prototype.clone = function() {
    return this.valueOf();
}
Boolean.prototype.clone = function() {
    return this.valueOf();
}

Function.prototype.clone = function() {
    return '123'
}

var copy = company.clone();
console.log(copy === company);
console.log(company);
console.log(copy);