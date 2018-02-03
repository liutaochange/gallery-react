require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

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
  Constant (){
    return {
      center:{
        left: 0,
        top:0
      },
      hPosRange:{
        leftSecX:[0,0],
        rightSecX:[0,0],
        y:[0,0]
      },
      vPosRange:{
        x:[0,0],
        topY:[0,0]
      }
    }
  }
  componentDidMount() {
    //获取舞台的大小
    var stageEle = ReactDOM.findDOMNode(this.refs.stage);
    var stageW = stageEle.scrollWidth;
    var stageH = stageEle.scrollHeight;
    var halfStageW = Math.round(stageW/2);
    var halfStageH = Math.round(stageH/2);

    //获取图片的大小

    var imgEle = ReactDOM.findDOMNode(this.refs.imgfig0);
    var imgW = imgEle.scrollWidth;
    var imgH = imgEle.scrollHeight;
    var halfImgW = Math.round(imgW/2);
    var halfImgH = Math.round(imgH/2);

    //计算区域 中心点
    this.Constant.center = {
      left: halfStageW-halfImgW,
      top: halfStageH-halfImgH
    }

    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW*3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW - halfImgW*3;
  }
  render() {
    var controllerUnits = [],ImgFigures = [];
    imgData.forEach((element,index) => {
      ImgFigures.push(<ImgFigure data={element} ref={'imgfig'+index} key={index}/>);
    });
    return (
     <section className="stage" ref='stage'>
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
