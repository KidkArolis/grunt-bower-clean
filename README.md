# grunt-bower-clean

> Remove files (e.g. docs, tests, etc.) from installed bower components

## Getting Started

Install the plugin:

```shell
npm install grunt-bower-clean --save-dev
```

Once the plugin has been installed enable it in your Gruntfile:

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
grunt bower_clean --dry-run
```

## Changelog

### 0.2.1

* fix whitelisting

### 0.2.0

* don't remove .jshintrc files - they're usually useful
