describe('Clone Helper', function() {
    var cloneHelper;
    var object = {
        'name': 'kimi',
        'age': 26,
        'family': {
            'father': {'name': 'rick'}
            'mother': {'name': 'yolanda'},
        }
        'roles': ['project manger', 'lovely friend'],
        'birthday': (new Date()),
        'sing': function(){console.log('kimi sing: you are my sunshine~')}
    };

    beforeEach(function() {
        cloneHelper = new CloneHelper();
    });

    it('should be equal with original', function() {
        var cloned = cloneHelper.clone(object);
        expect(object).toEqual(cloned);
    })
});