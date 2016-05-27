# generator-vue-app
the scaffold of the vue web app

## 使用方法

### 1. 安装脚手架工具
```
npm install -g yo
```

### 2. 安装生成器
```
npm install -g generator-vue-app
```

>使用-g进行全局安装，在以后每次新建项目时不需再次安装，可直接创建项目。

### 3. 创建项目
```
yo vue-app
```

### 4. 目录结构
按上述步骤操作后，会得到如下目录结构：
```
├───package.json                  //包描述文件，包含基本模块的依赖
├───webpack.dev.config.js         //用于开发环境的webpack配置文件
├───webpack.prod.config.js        //用于生产环境的webpack配置文件
├───.gitignore                    //上传到github或gitlab时忽略不必要的文件
├───src/                          //源码的根目录
│   └───fonts/                    //放置自定义字体
│   └───images/                   //放置图片资源
│   └───javascripts/              //存放脚本的根目录
│     └───components/             //放置组件
│     └───constants/              //放置常量
│     └───libs/                   //放置第三方库
│     └───utils/                  //放置项目中的公共代码
│     └───main.js                 //入口脚本文件，对于简单的项目，一般用于绘制根组件
│   └───stylesheets/              //放置样式文件
```

### 5. 安装依赖
在项目根目录下执行：
```
npm install
```

### 6. 进入开发阶段（实时刷新）
```
npm run dev
```
在浏览器上打开地址`localhost:8080`（端口可以修改），即可在页面上看到Hello Vue，同时进入开发阶段，修改文件并保存后页面会实时刷新。

>1. hello-vue组件只用做demo演示，实际开发时需要通过删除hello-vue目录删除该hello-vue组件。

>2. 有时运行该命令时会报如下错误：`Error: listen EADDRINUSE 127.0.0.1:8080`，遇到这种情况需要按照下面方法修改端口：
>修改`package.jso`文件内`scripts`字段的`dev`命令，找到`--port`，将其后面的`8080`改为其他端口，如`3000`。

### 7. 编译打包
```
npm run buld
```
编译后会生成dst目录，测试或发布时使用该目录即可。

### 8. 创建组件
在项目根目录下执行：
```
yo vue-app:vue-component
```
该命令会根据向导在src/javascripts/components/目录下创建相应组件。

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [gongzhen]()


[npm-image]: https://badge.fury.io/js/generator-vue-app.svg
[npm-url]: https://npmjs.org/package/generator-vue-app
[travis-image]: https://travis-ci.org/gzgogo/generator-vue-app.svg?branch=master
[travis-url]: https://travis-ci.org/gzgogo/generator-vue-app
[daviddm-image]: https://david-dm.org/gzgogo/generator-vue-app.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/gzgogo/generator-vue-app
[coveralls-image]: https://coveralls.io/repos/gzgogo/generator-vue-app/badge.svg
[coveralls-url]: https://coveralls.io/r/gzgogo/generator-vue-app
