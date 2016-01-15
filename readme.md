# vdom crud li

Editable list item for virtual doms.

[demo](http://hallowed-letters.surge.sh/vdom-crud-li)


## install

    $ npm install vdom-crud-li


## example

```js
var vdom = require('virtual-dom');
var h = vdom.h;
var Item = require('../CrudListItem.js');

var data = [
  {name: 'item 1'},
  {name: 'item 2'}
];

var state = Item({
  value: data[0].name,
  textNodeFn: function(val) {
    return h('a', { href: '/' }, [val]);
  },
  deleteFn: console.log.bind(console, 'delete item 1'),
  saveFn: function(value, done) {
    console.log('save: ' + value);
    done();
  }
});

var loop = require('main-loop')( state(), Item.render.bind(null, h), vdom );
state(loop.update);
document.getElementById('content').appendChild(loop.target);
```
