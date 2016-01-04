"use strict";

module.exports = require('./js/nodalion.js');
module.exports.__dirname = __dirname;
module.exports.decodeTerm = require('./js/serializeTerm.js').decodeTerm;
module.exports.encodeTerm = require('./js/serializeTerm.js').encodeTerm;
