"use strict";

var util = require('util');
var rimraf = require('rimraf');
var IgnoreReader = require('fstream-ignore');
var Q = require('q');
var _ = require('lodash');

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

// don't touch .bower.json and .jshintrc
var whitelist = [".bower.json", ".jshintrc"];
function whitelisted(path) {
  return !!_.find(whitelist, function (w) {
    return endsWith(path, "/" + w);
  });
}

// Special reader class that only emits entries
// for files that were ignored, instead of the opposite
var IgnoreMatcher = function () {
  return IgnoreReader.apply(this, arguments);
};

util.inherits(IgnoreMatcher, IgnoreReader);

IgnoreMatcher.prototype.applyIgnores = function () {
  return !IgnoreReader.prototype.applyIgnores.apply(this, arguments);
};

function removeIgnores(dir, ignore, options) {
    var reader;
    var deferred = Q.defer();
    var files = [];
    options = options || {};

    reader = new IgnoreMatcher({
      path: dir,
      type: 'Directory'
    });

    reader.addIgnoreRules(ignore);

    reader
    .on('entry', function (entry) {
      if (!whitelisted(entry.path)) {
        files.push(entry.path);
      }
    })
    .on('error', deferred.reject)
    .on('end', function () {
      var promises = [];
      files.forEach(function (file) {
        if (options.dryRun) {
          console.log("rm -rf", file);
        } else {
          promises.push(Q.nfcall(rimraf, file));
        }
      });
      return Q.all(promises)
      .then(deferred.resolve, deferred.reject);
    });

    return deferred.promise;
}

module.exports = removeIgnores;
