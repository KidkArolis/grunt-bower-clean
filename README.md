# grunt-bower-clean

> Remove files (e.g. docs, tests, etc.) from installed bower components

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bower-clean --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bower-clean');
```

## Usage

In your `bower.json` file configure `dependenciesIgnore` like so:

```js
{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "backbone": "0.9.2",
    "when": "~2.1.1"
  },
  "dependenciesIgnore": {
    "backbone": ["**/!(backbone.js)"],
    "when": ["docs", "test", "*.!(js)", ".*"]
  }
}
```

Then after

```js
bower install
```

running

```js
grunt bower_clean
```

will remove all files from `bower_components/backbone` except for `backbone.js` and `.bower.json` and from `bower_components/when`, `docs` and `test` directories will be removed as well as all non JS and dot files (except for `.bower.json`). This works exactly like bower's own ignore option (see https://github.com/bower/bower#defining-a-package for more info).

Use `--dry-run` option to see the list of files that will be removed.

```js
grun bower_clean --dry-run
```