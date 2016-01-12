var vdom = require('virtual-dom');
var h = vdom.h;
var Item = require('../CrudListItem.js');


var TextNode = require('../TextNode.js');
var Input = require('../Input.js');
var item = Item({
  textNode: TextNode({ value: 'item 1' }),
  input: Input({ value: 'item 1' })
});


var state = Item({
  value: 'item 1'
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
