# vdom crud li

Editable list item


## install

    $ npm install vdom-crud-li


## example

```js
var vdom = require('virtual-dom');
var h = vdom.h;
var Item = require('../CrudListItem.js');

var state = Item({

});

var loop = require('main-loop')( state(), Item.render.bind(null, h), vdom );
state(loop.update);
document.getElementById('content').appendChild(loop.target);
```
