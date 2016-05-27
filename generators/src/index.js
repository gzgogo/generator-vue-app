'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var utils = require('../utils.js');

module.exports = generators.Base.extend({

  initializing: function () {
    utils.debug(this, "src:initializing");

    this.projectName = this.options.projectName || 'my-project';
    this.cssPreProcessor = this.options.cssPreProcessor || "none";
  },

  prompting: function () {
    utils.debug(this, "src:prompting");

    var prompts = [];
    if (_.isUndefined(this.options.projectName)) {
      prompts.push({
        type: 'input',
        name: 'projectName',
        message: 'What\'s the name of your project?',
        default: this.projectName
      });
    }

    if (_.isUndefined(this.options.cssPreProcessor)) {
      prompts.push(      {
        type: 'list',
        name: 'cssPreProcessor',
        message: 'Which CSS pre-processor do you need?',
        choices: [
          { name: 'none', value: 'none' },
          { name: 'less', value: 'less' },
          { name: 'sass', value: 'sass' },
          { name: 'stylus', value: 'stylus' }
        ],
        default: this.cssPreProcessor,
        store: true
      });
    }

    if (prompts.length > 0) {
      var done = this.async();

      this.prompt(prompts, function (props) {
        this.projectName = props.projectName;
        this.cssPreProcessor = props.cssPreProcessor;
        done();
      }.bind(this));
    }
  },

  writing: function () {
    this._createSubFolders();

    this.fs.copy(
      this.templatePath('javascripts/main.js'),
      this.destinationPath('src/javascripts/' + 'main.js')
    );
    utils.debug(this, "src:copy main.js");

    //copy HelloReact component
    this.fs.copy(
      this.templatePath('javascripts/components/hello-vue/hello-vue.vue'),
      this.destinationPath('src/javascripts/components/hello-vue/' + 'hello-vue.vue')
    );
    this.fs.copy(
      this.templatePath('javascripts/components/hello-vue/hello-vue.styl'),
      this.destinationPath('src/javascripts/components/hello-vue/' + 'hello-vue.styl')
    );
    utils.debug(this, "src:copy hello-vue component");

    //copy stylesheets
    this.fs.copy(
      this.templatePath('stylesheets/common-mixin.styl'),
      this.destinationPath('src/stylesheets/' + 'common-mixin.styl')
    );
    this.fs.copy(
      this.templatePath('stylesheets/common-style.styl'),
      this.destinationPath('src/stylesheets/' + 'common-style.styl')
    );
    this.fs.copy(
      this.templatePath('stylesheets/flex.styl'),
      this.destinationPath('src/stylesheets/' + 'flex.styl')
    );
    utils.debug(this, "src:copy stylesheets");

    //copy index.html
    this.fs.copy(
      this.templatePath('index.html'),
      this.destinationPath('src/' + 'index.html')
    );
    utils.debug(this, "src:copy index.html");
  },

  install: function () {
  },

  _createSubFolders: function () {
    utils.debug(this, "src:_createSubFolders");

    mkdirp.sync('src/fonts');
    this._logFile("src/fonts");

    mkdirp.sync('src/images');
    this._logFile("src/images");

    mkdirp.sync('src/javascripts/constants');
    this._logFile("src/javascripts/constants");

    mkdirp.sync('src/javascripts/libs');
    this._logFile("src/javascripts/libs");

    mkdirp.sync('src/javascripts/utils');
    this._logFile("src/javascripts/utils");

    // //create css folders
    // var cssFolder = 'src/' + 'stylesheets';
    // mkdirp.sync(cssFolder);
    // this._logFile(cssFolder);

    // mkdirp.sync(cssFolder + '/utils');
    // this._logFile(cssFolder + '/utils');
  },

  _logFile: function (fileName) {
    this.log(chalk.green("   create ") + fileName);
  }
});
