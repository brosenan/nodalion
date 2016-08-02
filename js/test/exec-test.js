"use strict";

var assert = require("assert");
var $S = require('suspend'), $R = $S.resume, $T = function(gen) { return function(done) { $S.run(gen, done); } };

var nodalion = require('../nodalion');
var ns = nodalion.namespace('/nodalion', ['exec', 'testCalculate']);
var exec = require('../exec');

var doTask = function(term, cb) {
    term.meaning()(undefined, cb);
};

describe("exec", function() {
    it('should execute the given command', $T(function*() {
        var lines = yield doTask(ns.exec(exec.toList(['ls', '-1']), '.'), $R());
        lines = lines.meaning();
        assert(Array.isArray(lines), "exec must return an array");
        assert(lines.indexOf('package.json') != -1, 'result should contain package.json');
    }));
    it('should execute the command in the given path', $T(function*() {
        var lines = yield doTask(ns.exec(exec.toList(['ls', '-1']), 'js/test'), $R());
        lines = lines.meaning();
        assert(Array.isArray(lines), "exec must return an array");
        assert(lines.indexOf('exec-test.js') != -1, 'result should contain exec-test.js');
    }))
    describe('integration', () => {
        var n;
        before(() => {
            n = new nodalion(nodalion.__dirname + '/nodalion.cedimg', '/tmp/exec-ced.log');
        })
        it('should run from Cedalion', $T(function *() {
            var X = {var:'X'};
            var res = yield n.findAll(X, ns.testCalculate('1+2', X), $R());
            assert.deepEqual(res, [3]);
        }));
    })
});
