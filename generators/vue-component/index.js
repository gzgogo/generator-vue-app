'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var inquirer = require('inquirer');
var utils = require("../utils");

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.componentPath = 'src/javascripts/components/';
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the amazing ' + chalk.red('generator-vue-component') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'What\'s the name of the new component?',
        default: 'my-component'
      },
      // {
      //   type: 'list',
      //   name: 'componentPath',
      //   message: 'Choose the path to create the component:',
      //   choices: [
      //     { name: 'current directory: "."', value: '.' },
      //     { name: 'component directory: "src/javascripts/components/"', value: 'src/javascripts/components/' }
      //   ],
      //   store: true,
      //   default: ''
      // },
      {
        type: 'list',
        name: 'stylesheetExtension',
        message: 'Choose the css pre-processor you need:',
        choices: [
          { name: 'css', value: 'css' },
          { name: 'less', value: 'less' },
          { name: 'sass', value: 'sass' },
          { name: 'stylus', value: 'styl' }
        ],
        store: true,
        default: 'css'
      }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    var componentName = this.props.componentName;
    var jsName = componentName + '.' + 'vue';
    var stylesheetName = componentName + '.' + this.props.stylesheetExtension;
    var jsFullPath = this.destinationPath(this.componentPath + "/" + componentName + '/' + jsName);
    var stylesheetFullPath = this.destinationPath(this.componentPath + "/" + componentName + '/' + stylesheetName);

    utils.debug(this, jsFullPath);
    utils.debug(this, stylesheetFullPath);

    this.fs.copyTpl(
      this.templatePath('component.vue'),
      this.destinationPath(jsFullPath),
      {
        componentName: componentName,
        stylesheetExtension: this.props.stylesheetExtension
      }
    );

    if (!!this.props.stylesheetExtension) {
      this.fs.copyTpl(
        this.templatePath('component.stylesheet'),
        this.destinationPath(stylesheetFullPath),
        {
          componentName: componentName
        }
      );
    }
  }
});
