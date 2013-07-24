/*
 * grunt-bower-clean
 * https://github.com/KidkArolis/grunt-bower-clean
 *
 * Copyright (c) 2013 Karolis Narkevicius
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');
var path = require('path');
var Q = require('q');
var bower = require('bower');
var basePath = process.cwd();
// var removeIgnores = require('bower/lib/util/removeIgnores');
var removeIgnores = require('../lib/removeIgnores');

function extractComponentDirs(list) {
  var dirs = {};
  function d(l) {
    _.each(l.dependencies, function (info, component) {
      if (info.canonicalDir) {
        dirs[component] = info.canonicalDir;
      }
      d(info);
    });
  }
  d(list);
  return dirs;
}

module.exports = function(grunt) {

  grunt.registerTask('bower_clean', 'Your task description goes here.', function () {
    var done = this.async();

    var dryRun = !!grunt.option('dry-run');

    var cfg = require(path.join(basePath, 'bower.json')).dependenciesIgnore;

    // no configuration is provided for the ignore
    if (!cfg || _.isEmpty(cfg)) {
      return done();
    }


    bower.commands
      .list({}, {offline: true})
      .on('error', function (err) {
        grunt.log.error(err.message);
      })
      .on('end', function (list) {
        var dirs = extractComponentDirs(list);
        var removals = [];
        _.each(dirs, function(dir, component) {
          // check if we have ignore configuration for this component
          var ignore = cfg[component];
          if (ignore) {
            removals.push(removeIgnores(dir, ignore, {
              dryRun: dryRun
            }));
          }
        });
        Q.all(removals).then(function (files) {
          done();
        }, function (err) {
          grunt.log.error(err.message);
        });
      });
  });

};
