"use strict";

var nodalion = require('./nodalion');
var ns = nodalion.namespace('/nodalion', ['void']);
var child_process = require('child_process');
var assert = require('assert');
var Term = require('./cedParser').Term;

exports.toList = function(array) {
    var list = new Term('[]', []);
    for(let i = array.length - 1; i >= 0; i--) {
        list = new Term('.', [array[i], list]);
    }
    return list;
}

ns._register('exec', list => cb => { 
    assert.equal(list.name, '.');
    child_process.execFile(list.args[0], list.args[1], (err, stdout, stderr) => {
        if(err) {
            return cb(err);
        }
        cb(undefined, exports.toList(stdout.split('\n')));
    })
});
