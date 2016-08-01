"use strict";

var nodalion = require('./nodalion');
var ns = nodalion.namespace('/nodalion', ['void']);
var child_process = require('child_process');
var assert = require('assert');

ns._register('exec', list => cb => { 
    assert.equal(list.name, '.');
    child_process.execFile(list.args[0], list.args[1], (err, stdout, stderr) => {
        if(err) {
            return cb(err);
        }
        cb(undefined, stdout.split('\n'));
    })
});
