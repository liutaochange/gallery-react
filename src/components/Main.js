require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//获取图片相关的数据
var imgData = require('../data/imgdata.json');
imgData.forEach(element => {
  element.singleUrl = require('../images/'+element.file_name)
});

//img模块
class ImgFigure extends React.Component{
  render(){
    return(
      <figure className="img-wamp">
        <img src={this.props.data.singleUrl} alt={this.props.data.title} className="img-item"/>
        <figcaption>
          <h3 className="img-title">{this.props.data.title}</h3>
        </figcaption>
      </figure>
    )
  }
}

//页面整体结构
class AppComponent extends React.Component {
  render() {
    var controllerUnits = [],ImgFigures = [];
    imgData.forEach(element => {
      ImgFigures.push(<ImgFigure data={element}/>);
    });
    return (
     <section className="stage">
      <section className="img-sec">
        {ImgFigures}
      </section>
      <nav className="controller-mav">
        {controllerUnits}
      </nav>
     </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
