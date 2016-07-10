var path = require('path');
var fs = require('fs');
var extend = require('deep-extend');
var _ = require('lodash');

module.exports = {
  debug: debug
}

function debug(generator, msg) {
  return;
  if (generator && msg && msg.length > 0) {
    generator.log(" >debug: " + msg);
  }
}

function writeDependencies (generator, deps, devDeps) {
  extendPackageJSON(generator, {
    dependencies: deps,
    devDependencies: devDeps
  })
}

function extendPackageJSON (generator, others) {
  var pkg = readPackageJSON(generator)

  extend(pkg, others)

  writePackageJSON(generator, pkg)
}

function readPackageJSON (generator) {
  var pkgFile = generator.destinationPath('package.json');
  return generator.fs.readJSON(pkgFile) || { }
}

function writePackageJSON (generator, pkg) {
  var pkgFile = generator.destinationPath('package.json')
  generator.fs.writeJSON(pkgFile, pkg)
}

function recursive (generator, sub, cb, filter) {
  var base = generator.templatePath()
  var pwd = path.join(base, sub)
  var files = fs.readdirSync(pwd)

  files.forEach(function (file) {
    var stat = fs.statSync(path.resolve(pwd, file))
    var p = path.join(sub, file)
    if (filter(p, stat)) {
      if (stat.isDirectory()) recursive(generator, p, cb, filter)
      if (stat.isFile()) cb(p)
    }
  })
}
