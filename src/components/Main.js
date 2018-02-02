require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//获取图片相关的数据
var imgData = require('../data/imgdata.json');
var imgdatas = (function (imgDataarr){
  imgDataarr.forEach(element => {
    element.singleUrl = require('../images/'+element.file_name)
  });
  return imgDataarr;
})(imgData)

//

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">hello react</div>
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
