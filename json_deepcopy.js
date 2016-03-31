var pwc = {
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

var thenew = JSON.parse(JSON.stringify(pwc));
console.log(thenew)

/*
    直接使用json来转化的问题是
        日期会被转换为字符串
        正则表达式会变一个空字符串
        方法在在JSON.stringify中就丢失
    因此除非确定只包含简单的数据类型、Array、Object，否则无法满足需求。
*/