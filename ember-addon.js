'use strict';

const path = require('path');

module.exports = {
  name: '@validations/core',

  setupPreprocessorRegistry(type, registry) {
    if (type === 'self') {
      this.treePaths.addon = path.join(__dirname, 'dist/es2015/src/');

      registry.add('js', {
        name: 'babel-with-app-settings',
        ext: 'js',
        toTree: tree => this.project.findAddonByName('ember-cli-babel').transpileTree(tree)
      });
    }
  }
}
