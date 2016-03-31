/*
underscore.js  _.clone

    有实现一层的浅复制
    可以通过一些小技巧（结合map和clone）实现深入到二层复制

jQuery $.extend

    实现了深复制，但是对于类似于 int16array这样新的数据结构是不能很好完成深复制的

loadsh $.clone $.cloneDeep

    实现了深复制，运用了很多ES6中的新方法，并支持新标准中的数据结构


除了loadash意外，几乎都不支持Date RegExp的复制。包括loadash在内，都不支持函数的复制。

总体阅读和学习下来，注意到有一些知识点和方法是自己需要加强学习的：


https://github.com/jashkenas/underscore/blob/e4743ab712b8ab42ad4ccb48b155034d02394e4d/underscore.js#L1068
https://github.com/jquery/jquery/blob/1472290917f17af05e98007136096784f9051fab/src/core.js#L121
https://github.com/cherryjs/cherry.js/blob/master/cherry.js
https://www.zhihu.com/question/26924011
http://www.csdn.net/article/2012-10-11/2810645-Thoughts-on-TypeScript

- underscore.js 判定Object这种数据结构，用到 typeof variable  == 'somevalue'，判定Array用到 Object.prototype.toString.call(variable)  == '[object somevale]'
- jQuery更多的使用的是 Object.prototype.toString.call(variable)，并且构建了所有数据类型的可能输出作为匹配
- lodash 和 博客作者更多的运用了新标准中的方法比如（Object.keys），有空可以去阅读
- 作者的代码中是直接在原型对象上加了一些方法，做法不被推荐；但作者做了一些 $equal $in 等日常操作方法的实现，可以一读

typeof
instanceof
Object.prototype.toString.call
*/