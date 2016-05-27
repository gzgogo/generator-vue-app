'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var extend = require('deep-extend');
var path = require('path');
var utils = require('../utils.js');

module.exports = generators.Base.extend({

  initializing: function () {
    var folderName = path.basename(this.destinationRoot());
    this.projectName = folderName || "my-project";
    this.version = "0.0.1";
    this.description = "";
    this.cssPreProcessor = "none";

    utils.debug(this, "app:initializing");
  },

  prompting: function () {
    utils.debug(this, "app:prompting");

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the amazing ' + chalk.red('generator-vue-app') + ' generator!'
    ));

    var done = this.async();

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What\'s the name of your project?',
        default: this.projectName
      },
      {
        type: 'input',
        name: 'version',
        message: 'What\'s the version of your project?',
        default: this.version
      },
      {
        type: 'input',
        name: 'description',
        message: 'What\'s the description of your project?',
        default: this.decription
      },
      {
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
      }
    ];

    this.prompt(prompts, function (props) {

      this.projectName = props.projectName;
      this.version = props.version;
      this.description = props.description;
      this.cssPreProcessor = props.cssPreProcessor;
      done();
    }.bind(this));
  },

  default: function () {
    utils.debug(this, "app:default");

    this.composeWith('vue-app:src', {
      options: {
        projectName: this.projectName,
        cssPreProcessor: this.cssPreProcessor
      }
    });
  },

  writing: function () {
    utils.debug(this, "app:writing");

    utils.debug(this, "app:templatePath " + this.templatePath('webpack.dev.config.js'));
    utils.debug(this, "app:destinationPath " + this.destinationPath('webpack.dev.config.js'));

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('webpack.dev.config.js'),
      this.destinationPath('webpack.dev.config.js'),
      {
        projectName: this.projectName
      }
    );

    this.fs.copyTpl(
      this.templatePath('webpack.prod.config.js'),
      this.destinationPath('webpack.prod.config.js'),
      {
        projectName: this.projectName
      }
    );

    this._copyPackageJson();
  },

  install: function () {
    utils.debug(this, "app:install");
    // this.npmInstall([ 'react','react-redux' ], { 'saveDev': true });
    // this._addCssDependencies();
  },

  // conflicts: function () {
  //   // this.log("conflicts");
  //   this._addCssDependencies();
  // },

  end: function () {
    utils.debug(this, "app:end");
  },

  _copyPackageJson: function () {
    var srcPkgFile = this.templatePath('package.json');
    var dstPkgFile = this.destinationPath('package.json');

    var pkg = this.fs.readJSON(srcPkgFile);
    pkg.name = this.projectName;
    pkg.version = this.version;
    pkg.description = this.description;

    // utils.debug(this, pkg);
    this._addCssDependencies(pkg);
    // this._addES6Dependencies(pkg);

    if (pkg) {
      this.fs.writeJSON(dstPkgFile, pkg);
    }
  },

  _addCssDependencies: function (pkg) {
    utils.debug(this, "_addCssDependencies");

    var cssDependencies = null;
    switch (this.cssPreProcessor) {
      case "less":
        cssDependencies = {
          "less": "^2.6.1",
          "less-loader": "^2.2.2",
        }
        break;
      case "sass":
        cssDependencies = {
          "node-sass": "^3.4.2",
          "sass-loader": "^3.1.2",
        }
        break;
      case "stylus":
        cssDependencies = {
          "stylus": "^0.54.5",
          "stylus-loader": "^2.1.0"
        }
        break;
      default:
        break;
    }

    if (cssDependencies) {
      var addedDependencies = {
        devDependencies: cssDependencies
      };
      extend(pkg, addedDependencies);
    }
  },

  _addES6Dependencies: function (pkg) {
    utils.debug(this, "_addES6Dependencies");

    if (this.needES6) {
      var addedDependencies = {
        devDependencies: {
          "babel-core": "^6.7.6",
          "babel-loader": "^6.2.4",
          "babel-preset-es2015": "^6.6.0",
          "babel-preset-react": "^6.5.0",
          "babel-preset-react-hmre": "^1.1.1"
        }
      };
      extend(pkg, addedDependencies);
    }
  },

  _logFile: function (fileName) {
    this.log(chalk.green("  create ") + fileName);
  }
});
