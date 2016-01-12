var state = require('@nichoth/state');
var extend = require('xtend');
var observ = require('observ');
var delButton = require('vdom-buttons/lib/delete');
var editButton = require('vdom-buttons/lib/edit');
var saveButton = require('vdom-buttons/lib/check');
var Input = require('vdom-input');
var noop = function(){};

module.exports = CrudListItem;

function CrudListItem(opts) {
  opts = opts || {};
  opts.deleteFn = opts.deleteFn || noop;
  opts.saveFn = opts.saveFn || function(val, done) {
    done();
  };
  opts.textNodeFn = opts.textNodeFn || function(val) { return val; };

  var defaultStyle = {
    width: '1em',
    height: '1em',
    position: 'relative',
    top: '2px',
    marginLeft: '1em'
  };

  var s = state({
    value: observ(opts.value || ''),
    input: Input({ value: opts.value }),
    textNodeFn: observ(opts.textNodeFn),
    isEditing: observ(false),
    style: extend(defaultStyle, opts.style),
    handles: {
      onDelete: delFn,
      onEdit: editFn,
      onSave: saveFn
    }
  });

  function delFn(isEditing) {
    if (isEditing) {
      s.isEditing.set(false);
      Input.set(s.input, s.value());
      return;
    }
    opts.deleteFn();
  }

  function editFn() {
    if ( !s.isEditing() ) s.isEditing.set(true);
  }

  function saveFn(value) {
    opts.saveFn(value, done);

    function done(err) {
      if (err) { throw err; }
      if ( s.isEditing() ) s.isEditing.set(false);
      s.value.set(value);
    }
  }

  return s;
}

CrudListItem.render = function(h, state) {

  var editB = editButton(h, {
    style: extend(state.style, {
      opacity: '0.6'
    }),
    onClick: function(ev) {
      ev.preventDefault();
      state.handles.onEdit();
    }
  });

  var saveB = saveButton(h, {
    style: state.style,
    onClick: function(ev) {
      ev.preventDefault();
      state.handles.onSave(Input.value(state.input));
    }
  });

  var delB = delButton(h, {
    style: state.style,
    onClick: function(ev) {
      ev.preventDefault();
      state.handles.onDelete(state.isEditing);
    }
  });

  return h('div.vdom-crud-li', [
    state.isEditing ? Input.render(state.input) : state.textNodeFn(state.value),
    delB,
    state.isEditing ? saveB : editB
  ]);
};
