### gallery-react

one photo gallery project based on react.

![](https://s1.ax2x.com/2018/02/04/h7SLn.png)

一个React构建的图片画廊应用,在线访问：[https://liutaochange.github.io/gallery-react](https://liutaochange.github.io/gallery-react)

### 项目说明

- 本项目是参考视频教程编写的一个入门项目，教程地址 [React实战--打造画廊应用](http://www.imooc.com/learn/507)
- 教程讲师的Github地址 [materliu](https://github.com/materliu/)
- 项目构建的脚手架使用的是 [generator-react-webpack](https://github.com/react-webpack-generators/generator-react-webpack)
- 视频教程中使用的是ES5语法，本项目使用ES6语法，所以会有不同


下载项目到本地 

~~~
git clone https://github.com/liutaochange/gallery-react.git
~~~

安装项目依赖

~~~
npm install
~~~

开发环境运行

~~~
npm run start
~~~

将项目打包到dist目录

~~~
npm run serve:dist
~~~


更多命令请参考 **package.json** 文件, 从头构建项目可以参考视频教程

### 目录说明
```shell
.
├── /cfg/                       # webpack配置文件存放目录
│   ├── base.js                 # 基础配置
│   ├── default.js              # 默认配置
│   ├── dev.js                  # 开发环境配置
|   ├── dist.js                 # 生成环境配置
│   └── test.js                 # 测试环境配置
├── /dist/                      # 存放最终打包输出的用于生产环境的项目文件
├── /node_modules/              # node模块存放的目录
├── /src/                       # 存放开发环境项目源码
│   ├── /actions/               # flux actions目录（没用到）
│   ├── /components/            # 组件目录
│   ├── /config/                # 配置目录（没用到）
│   ├── /sources/               # flux datasources目录（没用到）
│   ├── /stores/                # flux stores(没用到)
│   ├── /styles/                # 样式文件目录，内有一个App.scss基础scss文件和fonts目录下的字体文件
│   ├── index.html              # 项目入口文件
│   └── index.js                # js入口文件
├── /test/                      # 单元测试和集成测试目录
│── .babelrc                    # Babel 配置文件
│── .eslintrc                   # ESLint代码风格检测配置文件
│── .gitignore                  # 配置不需要加入Git版本管理的文件
│── .yo-rc.json                 # yeoman的配置文件
│── karma.conf.js               # karma测试框架的配置
│── LICENSE                     # 软件使用许可
│── package.json                # npm的依赖配置项
│── README.md                   # 项目说明文件
│── server.js                   # 项目运行的js文件，命令可查看package.json中的script
└── webpack.config.js           # webpack配置文件，不同环境的配置项在cfg目录下
```

### 部分扇区示意图
```
                          |------上扇区线-----|
                          |         |         |
         |—————舞台线—————|——-——————|—————————|————————————————————|
         |                |<--------|-------->|                    |
         |                |         |         |                    |
         |                |         |         |                    |
         |----------------|----  ___|____ ----|--------------------|
         |                      |        |                         |
         |                      | 中心图片|                         |
         |                      |________|                         |
         |                          |                              |
         |                          |                              |
         |                          |                              |
         |                          |                              |
         |——————————————————————————|—————舞台线———————————————————|
                                    |
                                   中轴线
```

### ES5和ES6写法的不同点
创建组件
```shell
# ES5
Var AppComponent = React.createClass;

# ES6
class AppComponent extends React.Component{ }
```
定义组件初始化状态
```shell
# ES5
getInitialState: function(){
  return {
    name: 'ck'
  };
}

# ES6
constructor(props) {
  super(props);
  this.state = {
    name: 'ck'
  }
}
```
箭头函数
```shell
# ES5
function getRandom(min,max){
  return Math.ceil(Math.random() * (max - min) + min);
}

# ES6
let getRandom = (min,max) =>  Math.floor(Math.random() * (max - min) + min);
```


### Git命令说明
```shell
# 查看更改的文件
git satus

# 添加所有更改的文件进入本地暂存区
git add -A

# 提交暂存区到仓库区
git commit -m " message "

# 将本地仓库更新到远程仓库
git push

# 强制删除本地分支
git branch -D gh-pages

# 使用git的subtree将已有项目的某个目录分离成独立项目
# 并推送到分支 gh-pages
# prefix指定本地推送的目录
git subtree push --prefix=dist origin gh-pages
```
